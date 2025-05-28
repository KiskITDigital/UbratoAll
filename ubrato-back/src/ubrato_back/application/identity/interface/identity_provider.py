import abc
from typing import Protocol

from ubrato_back.application.identity.dto import Identity


class IdentityProvider(Protocol):
    @abc.abstractmethod
    async def get_identity(self) -> Identity:
        raise NotImplementedError
