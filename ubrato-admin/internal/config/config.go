package config

import (
	"fmt"
	"time"

	"github.com/knadh/koanf/parsers/yaml"
	"github.com/knadh/koanf/providers/file"
	"github.com/knadh/koanf/v2"
)

type Config struct {
	HTTP      HTTPSettings    `koanf:"http"`
	Repo      RepoSettings    `koanf:"repo"`
	JWT       JWTSettings     `koanf:"jwt"`
	SwaggerUI SwaggerSettings `koanf:"swaggerui"`
	Debug     bool            `koanf:"debug"`
}

type HTTPSettings struct {
	Address string        `koanf:"address"`
	Port    int           `koanf:"port"`
	Timeout time.Duration `koanf:"timeout"`
}

type RepoSettings struct {
	Host        string `koanf:"host"`
	Port        int    `koanf:"port"`
	Database    string `koanf:"database"`
	User        string `koanf:"user"`
	Password    string `koanf:"password"`
	Automigrate bool   `koanf:"auto_migrate"`
}

func (s *RepoSettings) URL() string {
	return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		s.Host, s.Port, s.User, s.Password, s.Database)
}

type JWTSettings struct {
	Secret   string `koanf:"secret"`
	Lifetime struct {
		Access  time.Duration `koanf:"access"`
		Refresh time.Duration `koanf:"refresh"`
	} `koanf:"lifetime"`
}

type SwaggerSettings struct {
	SwaggerUIPath string `koanf:"swagger_ui_path"`
}

const ConfigFile = "config.yaml"

func ReadConfig() (*Config, error) {
	k := koanf.New(".")

	err := k.Load(file.Provider(ConfigFile), yaml.Parser())
	if err != nil {
		return nil, fmt.Errorf("load %s: %w", ConfigFile, err)
	}

	var s Config

	err = k.Unmarshal("", &s)
	if err != nil {
		return nil, fmt.Errorf("unmarshal configuration: %w", err)
	}

	return &s, nil
}
