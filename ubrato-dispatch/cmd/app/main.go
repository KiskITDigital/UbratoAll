package main

import (
	"context"
	"os"
	"os/signal"
	"sync/atomic"
	"syscall"
	"time"

	"git.ubrato.ru/ubrato/dispatch-service/internal/config"
	"git.ubrato.ru/ubrato/dispatch-service/internal/infrastructure/email"
	"git.ubrato.ru/ubrato/dispatch-service/internal/infrastructure/emailtemplater"
	"git.ubrato.ru/ubrato/dispatch-service/internal/infrastructure/jetstream"
	"git.ubrato.ru/ubrato/dispatch-service/internal/infrastructure/log"
	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/broker"
	"git.ubrato.ru/ubrato/dispatch-service/internal/presentation/nats/handler"

	"golang.org/x/sync/errgroup"
)

var isShuttingDown atomic.Bool

func waitShuttingDown(mainCtx context.Context, liveCtx context.Context, stopMainCtx context.CancelFunc) error {
	<-liveCtx.Done()
	isShuttingDown.Store(true)
	duration := 25 * time.Second
	timer := time.NewTimer(duration)
	select {
	case <-mainCtx.Done():
		return nil
	case <-timer.C:
		stopMainCtx()
		return nil
	}
}

func main() {
	mainCtx, stopMainCtx := context.WithCancel(context.Background())
	defer stopMainCtx()
	liveCtx, stopLiveCtx := signal.NotifyContext(mainCtx, os.Interrupt, syscall.SIGTERM)
	defer stopLiveCtx()

	go waitShuttingDown(mainCtx, liveCtx, stopMainCtx)

	g, gCtx := errgroup.WithContext(liveCtx)

	config, err := config.Load()
	if err != nil {
		panic(err)
	}
	logger := log.Setup(config.Log)
	logger.Info("Starting ubrato-dispatch service")

	emailTemplater := emailtemplater.New(config.EmailTemplater)
	emailClient, err := email.NewClient(config.Email)
	if err != nil {
		logger.Error("Error email client creation", "error", err)
		os.Exit(1)
	}

	js, err := jetstream.New(config.Nats, logger)
	if err != nil {
		logger.Error("Error opening nats connection", "error", err)
		os.Exit(1)
	}
	if err := jetstream.CreateStreams(liveCtx, js); err != nil {
		logger.Error("Error init email client", "error", err)
		os.Exit(1)
	}

	handlersCollection := handler.NewCollection(gCtx, emailClient, emailTemplater)
	subscription, err := js.Subscribe(gCtx, broker.SendEmailStream, handlersCollection.MainHandler)

	if err != nil {
		logger.Error("Error subscribing to jetstream", "error", err)
		panic(err)
	}

	g.Go(func() error {
		defer subscription.Stop()

		<-gCtx.Done()
		logger.Info("Receivemd interrupt signal")
		return nil
	})

	if err := g.Wait(); err != nil {
		panic(err)
	}
}
