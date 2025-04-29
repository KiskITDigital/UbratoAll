package handler

import (
	"context"
	"errors"
	"net/http"
	"time"

	api "git.ubrato.ru/ubrato/admin/api/gen/v1"
	handlererrors "git.ubrato.ru/ubrato/admin/internal/transport/http/errors"
	"git.ubrato.ru/ubrato/admin/models"
)

var (
	errGetAuthData = errors.New("get authentication data")
)

type SessionProvider interface {
	CreateUserSession(ctx context.Context, user models.UserLogin) (models.Token, models.Session, error)
	UpdateUserSession(ctx context.Context, refreshToken string) (models.Token, models.Session, error)
	DeleteUserSession(ctx context.Context, refreshToken string) error
}

type Handler struct {
	provider SessionProvider
}

func NewHandler(provider SessionProvider) *Handler {
	return &Handler{
		provider: provider,
	}
}

func (h *Handler) CreateSession(ctx context.Context, req api.OptUserLogin) (*api.CreateSessionCreatedHeaders, error) {
	// POST /v1/sessions
	request, ok := req.Get()
	if !ok {
		return nil, handlererrors.NewHandlerError(
			http.StatusBadRequest,
			handlererrors.ErrInvalidInput,
			"cannot create session",
			errGetAuthData.Error())
	}

	ul := models.UserLogin{
		Login:    request.Login,
		Password: request.Password,
	}

	tokens, session, err := h.provider.CreateUserSession(ctx, ul)
	if err != nil {
		if errors.Is(err, models.ErrUserNameOrPasswordIncorrect) {
			return nil, handlererrors.NewHandlerError(
				http.StatusUnauthorized,
				handlererrors.ErrInvalidInput,
				"cannot create session",
				err.Error())
		}

		return nil, handlererrors.NewHandlerError(
			http.StatusInternalServerError,
			handlererrors.ErrAppCode,
			"cannot create session",
			err.Error())
	}

	cookie := http.Cookie{
		Name:     "admin_refresh_token",
		Value:    tokens.RefreshToken,
		Path:     "/",
		MaxAge:   int(session.RefreshTokenExpiredAt - time.Now().Unix()),
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}

	return &api.CreateSessionCreatedHeaders{
		SetCookie: api.NewOptString(cookie.String()),
		Response: api.CreateSessionCreated{
			Data: api.NewOptCreateSessionCreatedData(api.CreateSessionCreatedData{
				Tokens: api.NewOptTokens(api.Tokens{
					AccessToken:  tokens.AccessToken,
					RefreshToken: tokens.RefreshToken,
				}),
				Session: api.NewOptSession(api.Session{
					ID:     session.ID,
					UserID: int(session.UserID),
					IP: api.OptString{
						Value: session.IP.String,
						Set:   session.IP.Valid,
					},
					CreatedAt:             session.CreatedAt,
					RefreshTokenExpiredAt: api.NewOptInt64(session.RefreshTokenExpiredAt),
				}),
			}),
		},
	}, nil
}

func (h *Handler) UpdateSession(ctx context.Context, params api.UpdateSessionParams) (*api.UpdateSessionCreatedHeaders, error) {
	// PUT /v1/sessions
	tokens, session, err := h.provider.UpdateUserSession(ctx, params.AdminRefreshToken)
	if err != nil {
		if errors.Is(err, models.ErrNotFound) {
			return nil, handlererrors.NewHandlerError(
				http.StatusNotFound,
				handlererrors.ErrInvalidInput,
				"cannot update session",
				err.Error())
		}

		if errors.Is(err, models.ErrNotFound) {
			return nil, handlererrors.NewHandlerError(
				http.StatusForbidden,
				handlererrors.ErrInvalidInput,
				"cannot update session",
				err.Error())
		}

		return nil, handlererrors.NewHandlerError(
			http.StatusInternalServerError,
			handlererrors.ErrAppCode,
			"cannot update session",
			err.Error())
	}

	cookie := http.Cookie{
		Name:     "admin_refresh_token",
		Value:    tokens.RefreshToken,
		Path:     "/",
		MaxAge:   int(session.RefreshTokenExpiredAt - time.Now().Unix()),
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}

	return &api.UpdateSessionCreatedHeaders{
		SetCookie: api.NewOptString(cookie.String()),
		Response: api.UpdateSessionCreated{
			Data: api.NewOptUpdateSessionCreatedData(api.UpdateSessionCreatedData{
				Tokens: api.NewOptTokens(api.Tokens{
					AccessToken:  tokens.AccessToken,
					RefreshToken: tokens.RefreshToken,
				}),
				Session: api.NewOptSession(api.Session{
					ID:     session.ID,
					UserID: int(session.UserID),
					IP: api.OptString{
						Value: session.IP.String,
						Set:   session.IP.Valid,
					},
					CreatedAt:             session.CreatedAt,
					RefreshTokenExpiredAt: api.NewOptInt64(session.RefreshTokenExpiredAt),
				}),
			}),
		},
	}, nil
}

func (h *Handler) DeleteSession(ctx context.Context, params api.DeleteSessionParams) error {
	err := h.provider.DeleteUserSession(ctx, params.AdminRefreshToken)
	if err != nil {
		return handlererrors.NewHandlerError(
			http.StatusInternalServerError,
			handlererrors.ErrAppCode,
			"cannot update session",
			err.Error())
	}

	return nil
}
