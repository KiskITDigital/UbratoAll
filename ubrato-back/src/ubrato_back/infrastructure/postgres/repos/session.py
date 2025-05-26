from fastapi import Depends, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ubrato_back.config import get_config
from ubrato_back.infrastructure.postgres.main import get_db_connection
from ubrato_back.infrastructure.postgres.models import Session
from ubrato_back.infrastructure.postgres.repos.exceptions import RepositoryException


class SessionRepository:
    db: AsyncSession

    def __init__(self, db: AsyncSession = Depends(get_db_connection)) -> None:
        self.db = db
        self.localization = get_config().localization.config

    async def create(self, session: Session) -> None:
        self.db.add(session)
        await self.db.commit()

    async def get_by_id(self, session_id: str) -> Session:
        query = await self.db.execute(select(Session).where(Session.id == session_id))

        session = query.scalar()

        if session is None:
            raise RepositoryException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=self.localization["errors"]["session_not_found"],
                sql_msg="",
            )
        return session
