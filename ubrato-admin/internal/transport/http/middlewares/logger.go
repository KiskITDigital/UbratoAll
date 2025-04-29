package middlewares

import (
	"log/slog"
	"net/http"
	"time"

	"git.ubrato.ru/ubrato/admin/models"
	"github.com/go-chi/chi/middleware"
)

func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ww := middleware.NewWrapResponseWriter(w, r.ProtoMajor)

		slog.Debug("starting request processing",
			slog.String("method", r.Method),
			slog.String("request_uri", r.RequestURI),
			slog.String("remote_address", r.RemoteAddr),
			slog.String("user_agent", r.Header.Get("User-Agent")),
			slog.Any("request_id", r.Context().Value(models.CtxKeyRequestID{})),
		)

		t1 := time.Now()

		defer func() {
			t2 := time.Now()

			slog.Info("request processing completed",
				slog.String("method", r.Method),
				slog.String("request_uri", r.RequestURI),
				slog.String("remote_address", r.RemoteAddr),
				slog.String("user_agent", r.Header.Get("User-Agent")),
				slog.Int("status", ww.Status()),
				slog.Float64("duration_ms", float64(t2.Sub(t1).Nanoseconds())/float64(time.Millisecond)),
				slog.String("bytes_in", r.Header.Get("Content-Length")),
				slog.Int("bytes_out", ww.BytesWritten()),
				slog.Any("request_id", r.Context().Value(models.CtxKeyRequestID{})),
			)
		}()

		next.ServeHTTP(ww, r)
	})
}

func RequestIDToResponse(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		rawRequestID := ctx.Value(models.CtxKeyRequestID{})

		if requestID, ok := rawRequestID.(string); ok {
			w.Header().Set(middleware.RequestIDHeader, requestID)
		}

		next.ServeHTTP(w, r)
	})
}
