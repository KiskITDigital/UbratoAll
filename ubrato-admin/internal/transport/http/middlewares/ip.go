package middlewares

import (
	"context"
	"net"
	"net/http"

	"git.ubrato.ru/ubrato/admin/models"
)

func WithIP(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip, _, _ := net.SplitHostPort(r.RemoteAddr)

		ctx := context.WithValue(r.Context(), models.CtxIP{}, ip)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
