package config

import (
	"git.ubrato.ru/ubrato/dispatch-service/internal/infrastructure/email"
	"git.ubrato.ru/ubrato/dispatch-service/internal/infrastructure/emailtemplater"
	"git.ubrato.ru/ubrato/dispatch-service/internal/infrastructure/jetstream"
	"git.ubrato.ru/ubrato/dispatch-service/internal/infrastructure/log"
	"github.com/caarlos0/env/v10"
)

type Config struct {
	Nats           jetstream.Config      `envPrefix:"NATS_"`
	Email          email.Config          `envPrefix:"EMAIL_"`
	Log            log.Config            `envPrefix:"LOG_"`
	EmailTemplater emailtemplater.Config `envPrefix:"EMAIL_TEMPLATER_"`
}

func Load() (Config, error) {
	var cfg Config
	if err := env.Parse(&cfg); err != nil {
		return Config{}, err
	}
	return cfg, nil
}
