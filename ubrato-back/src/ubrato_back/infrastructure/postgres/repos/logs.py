from fastapi import Depends
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from ubrato_back.infrastructure.postgres.main import get_db_connection
from ubrato_back.infrastructure.postgres.models import Logs


class LogsRepository:
    db: AsyncSession

    def __init__(self, db: AsyncSession = Depends(get_db_connection)) -> None:
        self.db = db

    async def save(self, logs: Logs) -> None:
        try:
            self.db.add(logs)
            await self.db.commit()
        except SQLAlchemyError as err:
            print(err._message())
