from ubrato_back.config import Config, get_config
from typesense.client import Client


config: Config = get_config()

client = Client(
    {
        "api_key": config.Database.Typesense.API_KEY,
        "nodes": [
            {
                "host": config.Database.Typesense.HOST,
                "port": config.Database.Typesense.PORT,
                "protocol": config.Database.Typesense.PROTOCOL,
            },
        ],
        "connection_timeout_seconds": 10,
    }
)


def get_db_connection() -> Client:
    return client
