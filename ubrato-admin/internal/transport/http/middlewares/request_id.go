package middlewares

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"net/http"
	"os"
	"strings"
	"sync"
	"sync/atomic"

	"git.ubrato.ru/ubrato/admin/models"
)

var prefix string
var reqid uint64

var once sync.Once

func getPrefix() string {
	once.Do(func() {
		hostname, err := os.Hostname()
		if hostname == "" || err != nil {
			hostname = "localhost"
		}

		var buf [12]byte
		var b64 string
		for len(b64) < 10 {
			rand.Read(buf[:])
			b64 = base64.StdEncoding.EncodeToString(buf[:])
			b64 = strings.NewReplacer("+", "", "/", "").Replace(b64)
		}

		prefix = fmt.Sprintf("%s/%s", hostname, b64[0:10])
	})

	return prefix
}

// TODO: check why chi middleware return nsil
func RequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		myid := atomic.AddUint64(&reqid, 1)

		requestID := fmt.Sprintf("%s-%06d", getPrefix(), myid)

		ctx := context.WithValue(r.Context(), models.CtxKeyRequestID{}, requestID)
		r = r.WithContext(ctx)

		w.Header().Set("X-Request-ID", requestID)

		next.ServeHTTP(w, r)
	})
}
