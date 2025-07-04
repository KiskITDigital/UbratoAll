import datetime
import secrets

from fastapi import Depends, status

from ubrato_back.config import Config, get_config
from ubrato_back.infrastructure.postgres.models import Session
from ubrato_back.infrastructure.postgres.repos import SessionRepository, UserRepository
from ubrato_back.schemas import schema_models
from ubrato_back.services.exceptions import ServiceException


class SessionService:
    session_repository: SessionRepository
    user_repository: UserRepository
    time_live: int

    def __init__(
        self,
        config: Config = Depends(get_config),
        user_repository: UserRepository = Depends(),
        session_repository: SessionRepository = Depends(),
    ) -> None:
        self.time_live = int(config.session.time_live)
        self.session_repository = session_repository
        self.user_repository = user_repository
        self.localization = get_config().localization.config

    async def create_session(self, user_id: str) -> str:
        session_id = secrets.token_hex(32 // 2)
        expires_at = datetime.datetime.now() + datetime.timedelta(hours=self.time_live)
        await self.session_repository.create(session=Session(id=session_id, user_id=user_id, expires_at=expires_at))
        return session_id

    async def get_user_session_by_id(self, session_id: str) -> schema_models.User:
        session = await self.session_repository.get_by_id(session_id=session_id)

        if session.expires_at.timestamp() < datetime.datetime.now().timestamp():
            raise ServiceException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=self.localization["errors"]["session_expired"],
            )

        user = await self.user_repository.get_by_id(user_id=session.user_id)

        return user
