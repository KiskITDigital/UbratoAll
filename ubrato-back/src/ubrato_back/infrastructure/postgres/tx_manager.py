from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ubrato_back.infrastructure.postgres.repos import get_db_connection


class TxManager:
    def __init__(self, session: AsyncSession = Depends(get_db_connection)) -> None:
        self._session = session

    async def commit(self) -> None:
        await self._session.commit()

    async def rollback(self) -> None:
        await self._session.rollback()
