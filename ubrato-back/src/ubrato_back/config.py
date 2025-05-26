import os
import tomllib
from dataclasses import dataclass
from functools import cache
from typing import Any


@dataclass(frozen=True)
class PostgresConfig:
    host: str
    port: str
    user: str
    password: str
    db_name: str
    ssl_mode: str

    @property
    def dsn(self) -> str:
        return f"postgresql+asyncpg://{self.user}:{self.password}@{self.host}:{self.port}/{self.db_name}?sslmode={self.ssl_mode}"


@dataclass(frozen=True)
class TypesenseConfig:
    api_key: str
    host: str
    port: int
    protocol: str


@dataclass(frozen=True)
class RedisConfig:
    host: str
    port: int
    db: int
    password: str


@dataclass(frozen=True)
class DatabaseConfig:
    postgres: PostgresConfig
    typesense: TypesenseConfig
    redis: RedisConfig


@dataclass(frozen=True)
class NatsConfig:
    host: str
    port: str

    @property
    def dsn(self) -> str:
        return f"nats://{self.host}:{self.port}"


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
class ApiConfig:
    host: str
    port: int


@dataclass(frozen=True)
class Config:
    database: DatabaseConfig
    broker: BrokerConfig
    jwt: JwtConfig
    session: SessionConfig
    role: RoleConfig
    dadata: DadataConfig
    localization: LocalizationConfig
    api: ApiConfig


def load_config() -> Config:
    with open("./localization.toml", "rb") as f:
        localization_config: dict[str, Any] = tomllib.load(f)

    return Config(
        database=DatabaseConfig(
            postgres=PostgresConfig(
                host=os.environ["POSTGRES_HOST"],
                port=os.environ["POSTGRES_PORT"],
                user=os.environ["POSTGRES_USER"],
                password=os.environ["POSTGRES_PASSWORD"],
                db_name=os.environ["POSTGRES_DATABASE"],
                ssl_mode=os.environ["POSTGRES_SSLMODE"],
            ),
            typesense=TypesenseConfig(
                api_key=os.getenv("TYPESENSE_API_KEY", "xyz"),
                host=os.getenv("TYPESENSE_HOST", "localhost"),
                port=int(os.getenv("TYPESENSE_PORT", "8108")),
                protocol=os.getenv("TYPESENSE_PROTOCOL", "http"),
            ),
            redis=RedisConfig(
                host=os.environ["REDIS_HOST"],
                port=int(os.environ["REDIS_PORT"]),
                db=0,
                password=os.environ["REDIS_PASSWORD"],
            ),
        ),
        broker=BrokerConfig(
            nats=NatsConfig(
                host=os.environ["NATS_HOST"],
                port=os.environ["NATS_PORT"],
            )
        ),
        jwt=JwtConfig(secret=os.environ["JWT_SECRET"], time_live=int(os.getenv("JWT_TTL", 20))),
        session=SessionConfig(time_live=int(os.getenv("SESSION_TTL", 336))),
        role=RoleConfig(),
        dadata=DadataConfig(api_key=os.environ["DADATA_TOKEN"]),
        localization=LocalizationConfig(config=localization_config),
        api=ApiConfig(
            host=os.environ["API_HOST"],
            port=int(os.environ["API_PORT"]),
        ),
    )


@cache
def get_config() -> Config:
    config = load_config()
    return config
