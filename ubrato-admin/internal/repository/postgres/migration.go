package postgres

import (
	"database/sql"
	"embed"
	"errors"
	"fmt"
	"log/slog"

	"git.ubrato.ru/ubrato/admin/internal/config"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	"github.com/golang-migrate/migrate/v4/source/iofs"
	_ "github.com/jackc/pgx/v5/stdlib"
)

//go:embed migrations/*
var migrations embed.FS

func Migrate(logger *slog.Logger, set *config.RepoSettings) error {
	if !set.Automigrate {
		logger.Debug("automigrate disabled, skip core SQL migrations")

		return nil
	}

	logger.Debug("prepare to apply core SQL migrations")

	source, err := iofs.New(migrations, "migrations")
	if err != nil {
		return fmt.Errorf("create new migrations source failed: %w", err)
	}

	db, err := sql.Open("pgx", set.URL())
	if err != nil {
		return fmt.Errorf("establish migration connection failed: %w", err)
	}

	defer func() { _ = db.Close() }()

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return fmt.Errorf("create postgres driver failed: %w", err)
	}

	m, err := migrate.NewWithInstance("iofs", source, "postgres", driver)
	if err != nil {
		return fmt.Errorf("create migration engine failed: %w", err)
	}

	err = m.Up()
	if err != nil {
		if !errors.Is(err, migrate.ErrNoChange) {
			return fmt.Errorf("apply migrations failed: %w", err)
		}

		logger.Info("core SQL schema is up-to-date, nothing to do")
	} else {
		logger.Info("applying core SQL migrations finished")
	}

	return nil
}
