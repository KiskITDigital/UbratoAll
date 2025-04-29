package provider

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log/slog"
	"time"

	"git.ubrato.ru/ubrato/admin/internal/auth"
	"git.ubrato.ru/ubrato/admin/internal/crypto"
	"git.ubrato.ru/ubrato/admin/models"
	"github.com/google/uuid"
)

type authorizer interface {
	GenerateToken(payload auth.Payload) (string, error)
	GetRefreshTokenDurationLifetime() time.Duration
}

type store interface {
	CreateSession(ctx context.Context, session models.Session) (models.Session, error)
	GetUserByLogin(ctx context.Context, login models.UserLogin) (models.User, error)
	FindSessionByRefreshToken(ctx context.Context, refreshToken string) (models.Session, error)
	GetUserByID(ctx context.Context, id int) (models.User, error)
	UpdateRefreshToken(
		ctx context.Context,
		refreshToken string,
		RefreshTokenExpiredAt int64,
		newRefreshToken string,
	) (models.Session, error)
	DeleteSessionByRefreshToken(ctx context.Context, refreshToken string) error
}

type Provider struct {
	sessionsStore store
	authorizer    authorizer
}

func NewProvider(authorizer authorizer, sessionsStore store) *Provider {
	return &Provider{
		sessionsStore: sessionsStore,
		authorizer:    authorizer,
	}
}

func (p *Provider) CreateUserSession(ctx context.Context, userLogin models.UserLogin) (models.Token, models.Session, error) {
	user, err := p.sessionsStore.GetUserByLogin(ctx, userLogin)
	if err != nil {
		if errors.Is(err, models.ErrNotFound) {
			return models.Token{}, models.Session{}, models.ErrUserNameOrPasswordIncorrect
		}

		return models.Token{}, models.Session{}, fmt.Errorf("get user id: %w", err)
	}

	if err = crypto.CheckPassword(userLogin.Password, user.Password); err != nil {
		return models.Token{}, models.Session{}, fmt.Errorf("%w: %w", models.ErrUserNameOrPasswordIncorrect, err)
	}

	accessToken, err := p.authorizer.GenerateToken(auth.Payload{
		ID: user.ID,
	})
	if err != nil {
		return models.Token{}, models.Session{}, fmt.Errorf("generate jwt token: %w", err)
	}

	ip, ok := ctx.Value(models.CtxIP{}).(string)
	if !ok {
		slog.ErrorContext(ctx, "cannot get ip from context")
	}

	session := models.Session{
		UserID:                int64(user.ID),
		RefreshToken:          uuid.New().String(),
		IP:                    sql.NullString{String: ip, Valid: ok},
		CreatedAt:             time.Now().Unix(),
		RefreshTokenExpiredAt: time.Now().Add(p.authorizer.GetRefreshTokenDurationLifetime()).Unix(),
	}

	session, err = p.sessionsStore.CreateSession(ctx, session)
	if err != nil {
		return models.Token{}, models.Session{}, fmt.Errorf("create session: %w", err)
	}

	return models.Token{AccessToken: accessToken, RefreshToken: session.RefreshToken}, session, nil
}

func (p *Provider) UpdateUserSession(ctx context.Context, refreshToken string) (models.Token, models.Session, error) {
	session, err := p.sessionsStore.FindSessionByRefreshToken(ctx, refreshToken)
	if err != nil {
		return models.Token{}, models.Session{}, fmt.Errorf("find session by refresh token: %w", err)
	}

	if session.RefreshTokenExpiredAt < time.Now().Unix() {
		return models.Token{}, models.Session{}, models.ErrTokenIsExpired
	}

	user, err := p.sessionsStore.GetUserByID(ctx, int(session.UserID))
	if err != nil {
		return models.Token{}, models.Session{}, fmt.Errorf("getting session user: %w", err)
	}

	session, err = p.sessionsStore.UpdateRefreshToken(
		ctx,
		refreshToken,
		time.Now().Add(p.authorizer.GetRefreshTokenDurationLifetime()).Unix(),
		uuid.New().String(),
	)
	if err != nil {
		return models.Token{}, models.Session{}, fmt.Errorf("update session: %w", err)
	}

	accessToken, err := p.authorizer.GenerateToken(auth.Payload{
		ID: user.ID,
	})
	if err != nil {
		return models.Token{}, models.Session{}, fmt.Errorf("generate jwt token: %w", err)
	}

	return models.Token{AccessToken: accessToken, RefreshToken: session.RefreshToken}, session, nil
}

func (p *Provider) DeleteUserSession(ctx context.Context, refreshToken string) error {
	err := p.sessionsStore.DeleteSessionByRefreshToken(ctx, refreshToken)
	if err != nil {
		return fmt.Errorf("delete user session: %w", err)
	}

	return nil
}
