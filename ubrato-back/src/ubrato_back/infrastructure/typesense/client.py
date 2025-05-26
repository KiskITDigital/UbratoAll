from typesense.client import Client

from ubrato_back.config import Config, get_config

config: Config = get_config()

client = Client(
    {
        "api_key": config.database.typesense.api_key,
        "nodes": [
            {
                "host": config.database.typesense.host,
                "port": config.database.typesense.port,
                "protocol": config.database.typesense.protocol,
            },
        ],
        "connection_timeout_seconds": 10,
    }
)


def get_db_connection() -> Client:
    return client
