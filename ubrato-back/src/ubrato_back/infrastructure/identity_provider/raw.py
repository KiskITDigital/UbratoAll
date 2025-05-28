from ubrato_back.application.identity.dto import Identity
from ubrato_back.application.identity.interface.identity_provider import IdentityProvider


class RawIdentityProvider(IdentityProvider):
    def __init__(self, identity: Identity) -> None:
        self._identity = identity

    async def get_identity(self) -> Identity:
        return self._identity
