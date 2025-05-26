from redis import asyncio as aioredis

from ubrato_back.config import Config, get_config

config: Config = get_config()

redis: aioredis.Redis = aioredis.Redis(
    host=config.database.redis.host,
    port=config.database.redis.port,
    db=config.database.redis.db,
    password=config.database.redis.password,
)


def get_db_connection() -> aioredis.Redis:
    return redis
