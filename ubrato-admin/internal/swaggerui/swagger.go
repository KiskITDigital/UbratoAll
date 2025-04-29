package swaggerui

import (
	"log/slog"
	"net/http"

	"git.ubrato.ru/ubrato/admin/api"
	"git.ubrato.ru/ubrato/admin/internal/config"
	"github.com/go-chi/chi/v5"
)

func serveBytes(b []byte) http.HandlerFunc {
	return func(w http.ResponseWriter, _ *http.Request) {
		_, _ = w.Write(b)
	}
}

func RegisterSwaggerUIHandlers(logger *slog.Logger, mux *chi.Mux, settings config.SwaggerSettings) {
	if settings.SwaggerUIPath == "" {
		logger.Warn("mux: serve swagger ui: swagger_ui_path is empty; skip")

		return
	}

	if len(api.OpenapiSpec) == 0 || api.OpenapiRefs == nil {
		logger.Error("swagger specs and/or refs are not set")

		return
	}

	logger.Info("mux: serve swagger ui files", slog.String("path", settings.SwaggerUIPath))

	mux.Route("/swagger", func(r chi.Router) {
		r.Mount("/", http.StripPrefix("/swagger", http.FileServer(http.Dir(settings.SwaggerUIPath))))
		r.Mount("/spec", serveBytes(api.OpenapiSpec))
		r.Mount("/v1", http.StripPrefix("/swagger", http.FileServer(api.OpenapiRefs)))
	})
}
