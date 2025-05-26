from nats.aio.client import Client

from ubrato_back.config import Config, get_config

config: Config = get_config()


class NatsClient:
    def __init__(self):
        self.client = Client()

    async def connect(self) -> None:
        await self.client.connect(servers=[config.broker.nats.dsn])

    async def pub(
        self,
        subject: str,
        payload: bytes = b"",
        reply: str = "",
        headers: dict[str, str] | None = None,
    ) -> None:
        await self.client.publish(subject=subject, payload=payload, reply=reply, headers=headers)

    async def close(self) -> None:
        await self.client.close()


nats_conn = NatsClient()


def get_nats_connection() -> NatsClient:
    return nats_conn
