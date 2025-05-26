import os
import tomllib
from dataclasses import dataclass
from functools import cache
from typing import Any


@dataclass(frozen=True)
class PostgresConfig:
    dsn: str = os.getenv(
        "DB_DSN",
        "postgresql+asyncpg://postgres:12345@localhost:5432/postgres",
    )


@dataclass(frozen=True)
class TypesenseConfig:
    api_key: str = os.getenv("TYPESENSE_API_KEY", "xyz")
    host: str = os.getenv("TYPESENSE_HOST", "localhost")
    port: int = int(os.getenv("TYPESENSE_PORT", "8108"))
    protocol: str = os.getenv("TYPESENSE_PROTOCOL", "http")


@dataclass(frozen=True)
class RedisConfig:
    dsn: str = os.getenv("REDIS_HOST", "redis://localhost")
    password: str = os.getenv("REDIS_PASSWORD", "12345")


@dataclass(frozen=True)
class DatabaseConfig:
    postgres: PostgresConfig
    typesense: TypesenseConfig
    redis: RedisConfig


@dataclass(frozen=True)
class NatsConfig:
    dsn: str


@dataclass(frozen=True)
class BrokerConfig:
    nats: NatsConfig


@dataclass(frozen=True)
class JwtConfig:
    secret: str
    time_live: int


@dataclass(frozen=True)
class SessionConfig:
    time_live: int


@dataclass(frozen=True)
class RoleConfig:
    super_admin = 1 << 7
    admin = 1 << 6
    manager = 1 << 5

    guest = 1 << 0


@dataclass(frozen=True)
class DadataConfig:
    api_key: str


@dataclass(frozen=True)
class LocalizationConfig:
    config: dict[str, Any]


@dataclass(frozen=True)
class Config:
    database: DatabaseConfig
    broker: BrokerConfig
    jwt: JwtConfig
    session: SessionConfig
    role: RoleConfig
    dadata: DadataConfig
    localization: LocalizationConfig


def load_config() -> Config:
    with open("./localization.toml", "rb") as f:
        localization_config: dict[str, Any] = tomllib.load(f)

    return Config(
        database=DatabaseConfig(
            postgres=PostgresConfig(),
            typesense=TypesenseConfig(),
            redis=RedisConfig(),
        ),
        broker=BrokerConfig(nats=NatsConfig(dsn=os.environ["NATS_HOST"])),
        jwt=JwtConfig(secret=os.environ["JWT_SECRET"], time_live=int(os.getenv("JWT_TTL", 20))),
        session=SessionConfig(time_live=int(os.getenv("SESSION_TTL", 336))),
        role=RoleConfig(),
        dadata=DadataConfig(api_key=os.environ["DADATA_TOKEN"]),
        localization=LocalizationConfig(config=localization_config),
    )


@cache
def get_config() -> Config:
    config = load_config()
    return config
