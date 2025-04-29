package main

import (
	"fmt"
	"log/slog"
	"os"

	"git.ubrato.ru/ubrato/admin/internal/auth"
	"git.ubrato.ru/ubrato/admin/internal/config"
	"git.ubrato.ru/ubrato/admin/internal/repository/postgres"
	"git.ubrato.ru/ubrato/admin/internal/transport/http"
	"git.ubrato.ru/ubrato/admin/plugins/sessions"
)

func main() {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

	cfg, err := config.ReadConfig()
	if err != nil {
		logger.Error("Error parsing default config from env", "error", err)
		os.Exit(1)
	}

	if cfg.Debug {
		logger = slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
			Level: slog.LevelDebug,
		}))

		logger.Warn("Debug enabled")
	}

	if err := run(cfg, logger); err != nil {
		logger.Error("Error initializing service", "error", err)
		os.Exit(1)
	}

}

func run(cfg *config.Config, logger *slog.Logger) error {
	repo, err := postgres.NewRepository(logger, &cfg.Repo)
	if err != nil {
		return fmt.Errorf("init postgres pool: %w", err)
	}

	auth, err := auth.NewTokenAuthorizer(cfg.JWT)
	if err != nil {
		return fmt.Errorf("init authorizer: %w", err)
	}

	handler := http.NewManagerHandler(http.HandlerParams{
		Sessions: sessions.InitModule(auth, repo),
	})

	httpServer, err := http.NewServer(cfg, handler, logger)
	if err != nil {
		return fmt.Errorf("init http server: %w", err)
	}

	if err = httpServer.Start(); err != nil {
		return fmt.Errorf("start postgres server: %w", err)
	}

	return nil
}
