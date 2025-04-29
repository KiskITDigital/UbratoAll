package mux

import (
	"net/http"
	"time"

	"git.ubrato.ru/ubrato/admin/internal/config"
	"git.ubrato.ru/ubrato/admin/internal/transport/http/middlewares"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

const (
	preflightMaxAge = time.Hour
)

func NewMux(s *config.HTTPSettings) *chi.Mux {
	mux := chi.NewMux()

	mux.Use(newCORShandler())
	mux.Use(middlewares.WithIP)
	mux.Use(middlewares.RequestID)
	mux.Use(middlewares.RequestIDToResponse)
	mux.Use(middleware.Recoverer)
	mux.Use(middlewares.Logger)
	mux.Use(middleware.Timeout(s.Timeout))

	return mux
}

func newCORShandler() func(http.Handler) http.Handler {
	return cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		MaxAge:           int(preflightMaxAge),
	})
}
