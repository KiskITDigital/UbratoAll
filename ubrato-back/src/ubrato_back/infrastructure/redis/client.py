from redis import asyncio as aioredis

from ubrato_back.config import Config, get_config

config: Config = get_config()

redis: aioredis.Redis = aioredis.from_url(config.database.redis.dsn, password=config.database.redis.password)


def get_db_connection() -> aioredis.Redis:
    return redis
