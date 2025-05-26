from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ubrato_back.infrastructure.postgres.repos import get_db_connection


class BaseReader:
    def __init__(self, session: AsyncSession = Depends(get_db_connection)) -> None:
        self._session = session
