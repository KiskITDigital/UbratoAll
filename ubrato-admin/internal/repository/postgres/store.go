package postgres

import (
	"context"
	"fmt"
	"log/slog"

	"git.ubrato.ru/ubrato/admin/internal/config"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Repo struct {
	*pgxpool.Pool
}

func NewRepository(logger *slog.Logger, s *config.RepoSettings) (*Repo, error) {
	pool, err := pgxpool.New(context.Background(), s.URL())
	if err != nil {
		return nil, fmt.Errorf("connect to repository: %w", err)
	}

	slog.Debug("connect to repository successful")

	err = Migrate(logger, s)
	if err != nil {
		return nil, fmt.Errorf("migrate database: %w", err)
	}

	return &Repo{
		Pool: pool,
	}, nil
}
