package storage

import (
	"context"
	"errors"
	"fmt"

	"git.ubrato.ru/ubrato/admin/internal/repository/postgres"
	"git.ubrato.ru/ubrato/admin/models"
	"github.com/jackc/pgx/v5"
)

type Store struct {
	repo *postgres.Repo
}

func NewStore(r *postgres.Repo) *Store {
	return &Store{repo: r}
}

func (s *Store) GetUserByLogin(ctx context.Context, login models.UserLogin) (models.User, error) {
	query := `
	SELECT
		id,
		login,
		password
	FROM admin.users
	WHERE login=$1;
	`

	rows, err := s.repo.Query(ctx, query, login.Login)
	if err != nil {
		return models.User{}, fmt.Errorf("get user from repo: %w", err)
	}
	defer rows.Close()

	user, err := pgx.CollectOneRow(rows, pgx.RowToStructByNameLax[models.User])
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return models.User{}, models.ErrNotFound
		}

		return models.User{}, fmt.Errorf("collect user row: %w", err)
	}

	return user, nil
}

func (s *Store) GetUserByID(ctx context.Context, id int) (models.User, error) {
	query := `
	SELECT
		id,
		login,
		password
	FROM admin.users
	WHERE id=$1;
	`

	rows, err := s.repo.Query(ctx, query, id)
	if err != nil {
		return models.User{}, fmt.Errorf("get user from repo: %w", err)
	}
	defer rows.Close()

	user, err := pgx.CollectOneRow(rows, pgx.RowToStructByNameLax[models.User])
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return models.User{}, models.ErrNotFound
		}

		return models.User{}, fmt.Errorf("collect user row: %w", err)
	}

	return user, nil
}

func (s *Store) CreateSession(ctx context.Context, session models.Session) (models.Session, error) {
	query := `
	INSERT INTO admin.sessions (
			user_id,
			ip_address,
			refresh_token,
			created_at,
			refresh_token_expired_at
	) VALUES (
	 		$1,
			$2,
			$3,
			$4,
			$5
	)
	RETURNING id;
	`

	var id int64

	err := s.repo.QueryRow(ctx,
		query,
		session.UserID,
		session.IP,
		session.RefreshToken,
		session.CreatedAt,
		session.RefreshTokenExpiredAt,
	).Scan(&id)
	if err != nil {
		return models.Session{}, fmt.Errorf("create session: %w", err)
	}

	session.ID = id

	return session, nil
}

func (s *Store) FindSessionByRefreshToken(ctx context.Context, refreshToken string) (models.Session, error) {
	query := `
	SELECT
		id,
		user_id,
		ip_address,
		refresh_token,
		created_at,
		refresh_token_expired_at
	FROM admin.sessions
	WHERE refresh_token=$1;
	`

	rows, err := s.repo.Query(ctx, query, refreshToken)
	if err != nil {
		return models.Session{}, fmt.Errorf("get session by refresh token: %w", err)
	}
	defer rows.Close()

	session, err := pgx.CollectOneRow(rows, pgx.RowToStructByNameLax[models.Session])
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return models.Session{}, models.ErrNotFound
		}

		return models.Session{}, fmt.Errorf("collect session row: %w", err)
	}

	return session, nil
}

func (s *Store) UpdateRefreshToken(ctx context.Context, refreshToken string,
	RefreshTokenExpiredAt int64,
	newRefreshToken string,
) (models.Session, error) {
	query := `
	UPDATE admin.sessions
	SET (refresh_token, refresh_token_expired_at) = ($1, $2)
	WHERE refresh_token=$3;
	`

	_, err := s.repo.Exec(ctx, query, newRefreshToken, RefreshTokenExpiredAt, refreshToken)
	if err != nil {
		return models.Session{}, fmt.Errorf("update session refresh token: %w", err)
	}

	return s.FindSessionByRefreshToken(ctx, newRefreshToken)
}

func (s *Store) DeleteSessionByRefreshToken(ctx context.Context, refreshToken string) error {
	query := `
	DELETE FROM admin.sessions
	WHERE refresh_token=$1;
	`

	_, err := s.repo.Exec(ctx, query, refreshToken)
	if err != nil {
		return fmt.Errorf("get session by refresh token: %w", err)
	}

	return nil
}
