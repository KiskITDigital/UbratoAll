package log

import (
	"log/slog"
	"os"
)

type Config struct {
	Level  string `env:"LEVEL,required"`
	Format string `env:"FORMAT,required"`
}

func Setup(config Config) *slog.Logger {
	var lvl slog.Level
	err := lvl.UnmarshalText([]byte(config.Level))
	if err != nil {
		panic(err)
	}

	options := &slog.HandlerOptions{
		Level:     lvl,
		AddSource: true,
	}
	var handler slog.Handler
	switch config.Format {
	case "json":
		handler = slog.NewJSONHandler(os.Stdout, options)
	case "plain":
		handler = slog.NewTextHandler(os.Stdout, options)
	default:
		handler = slog.NewTextHandler(os.Stdout, options)
	}

	logger := slog.New(handler)

	slog.SetDefault(logger)
	return logger
}
