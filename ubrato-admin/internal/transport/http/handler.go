package http

import (
	"context"
	"errors"
	"log/slog"
	"net/http"

	api "git.ubrato.ru/ubrato/admin/api/gen/v1"
	handlererrors "git.ubrato.ru/ubrato/admin/internal/transport/http/errors"
	sessionsHandler "git.ubrato.ru/ubrato/admin/plugins/sessions/handler"
	"github.com/go-faster/jx"
	"github.com/ogen-go/ogen/ogenerrors"
)

type Handler struct {
	Sessions
}

type Sessions interface {
	CreateSession(ctx context.Context, req api.OptUserLogin) (*api.CreateSessionCreatedHeaders, error)
	UpdateSession(ctx context.Context, params api.UpdateSessionParams) (*api.UpdateSessionCreatedHeaders, error)
	DeleteSession(ctx context.Context, params api.DeleteSessionParams) error
}

type HandlerParams struct {
	Sessions *sessionsHandler.Handler
}

func NewManagerHandler(params HandlerParams) *Handler {
	return &Handler{
		Sessions: params.Sessions,
	}
}

func ErrorHandler(ctx context.Context, w http.ResponseWriter, _ *http.Request, err error) {
	var (
		code    = http.StatusInternalServerError
		ogenErr ogenerrors.Error
		title   = ""
	)

	switch {
	case errors.As(err, &ogenErr):
		code = ogenErr.Code()
		title = ogenErr.OperationName()
		err = errors.Unwrap(err)
	}

	slog.DebugContext(ctx, "handle", "error", err)

	apiErr := newAPIError(string(handlererrors.ErrAppCode), title, err.Error())
	e := jx.GetEncoder()
	apiErr.Encode(e)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)

	_, err = e.WriteTo(w)
	if err != nil {
		slog.ErrorContext(ctx, "write response", "error", err)
	}
}

func (h *Handler) NewError(_ context.Context, err error) *api.ErrorsStatusCode {
	var he handlererrors.HandlerError
	if errors.As(err, &he) {
		return &api.ErrorsStatusCode{
			StatusCode: he.StatusCode(),
			Response:   newAPIError(he.Code(), he.Title(), he.Detail()),
		}
	}

	return &api.ErrorsStatusCode{
		StatusCode: http.StatusInternalServerError,
		Response: newAPIError(
			handlererrors.ErrAppCode.String(), "internal server error", err.Error()),
	}
}

func newAPIError(code string, title string, detail string) api.Errors {
	return api.Errors{
		Errors: []api.ErrorsErrorsItem{
			{
				Code:   code,
				Title:  title,
				Detail: detail,
			},
		},
	}
}
