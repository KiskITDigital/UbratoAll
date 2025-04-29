package http

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"strconv"

	api "git.ubrato.ru/ubrato/admin/api/gen/v1"
	"git.ubrato.ru/ubrato/admin/internal/config"
	"git.ubrato.ru/ubrato/admin/internal/swaggerui"
	"git.ubrato.ru/ubrato/admin/internal/transport/http/mux"
)

const PathPrefixV1 = "/v1"

type Server struct {
	srv    *http.Server
	logger *slog.Logger
}

func NewServer(s *config.Config, handler *Handler, logger *slog.Logger) (*Server, error) {
	apiServer, err := api.NewServer(
		handler,
		api.WithPathPrefix(PathPrefixV1),
		api.WithErrorHandler(ErrorHandler),
	)
	if err != nil {
		return nil, fmt.Errorf("init http server: %w", err)
	}

	mux := mux.NewMux(&s.HTTP)
	mux.Mount(PathPrefixV1, apiServer)

	swaggerui.RegisterSwaggerUIHandlers(logger, mux, s.SwaggerUI)

	server := &Server{
		srv: &http.Server{
			Addr:    net.JoinHostPort(s.HTTP.Address, strconv.Itoa(s.HTTP.Port)),
			Handler: mux,
		},
		logger: logger,
	}

	return server, nil
}

func (s *Server) Start() error {
	s.logger.Info("starting http server", "addr", s.srv.Addr)
	err := s.srv.ListenAndServe()
	if err != nil && !errors.Is(err, http.ErrServerClosed) {
		return err
	}

	return nil
}

func (s *Server) Stop() error {
	s.logger.Info("shutting down http server")
	return s.srv.Shutdown(context.Background())
}
