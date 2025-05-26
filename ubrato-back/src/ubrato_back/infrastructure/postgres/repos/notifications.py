from fastapi import Depends
from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession

from ubrato_back.infrastructure.postgres.main import get_db_connection
from ubrato_back.infrastructure.postgres.models import Notification
from ubrato_back.schemas import schema_models


class NotificationRepository:
    db: AsyncSession

    def __init__(self, db: AsyncSession = Depends(get_db_connection)) -> None:
        self.db = db

    async def add_notice(
        self,
        user_id: str,
        header: str | None,
        msg: str | None,
        href: str | None,
        href_text: str | None,
        href_color: int | None,
    ) -> None:
        self.db.add(
            Notification(
                user_id=user_id,
                header=header,
                msg=msg,
                href=href,
                href_text=href_text,
                href_color=href_color,
            )
        )

        await self.db.commit()

    async def get_user_notice(self, user_id: str) -> list[schema_models.Notification]:
        query = await self.db.execute(select(Notification).where(Notification.user_id == user_id))

        notifications: list[schema_models.Notification] = []
        for notice in query.scalars():
            notifications.append(schema_models.Notification(**notice.__dict__))

        return notifications

    async def mark_read(self, ids: list[int], user_id: str) -> None:
        query = await self.db.execute(
            select(Notification).where(and_(Notification.user_id == user_id, Notification.id.in_(ids)))
        )

        for notice in query.scalars():
            notice.read = True

        await self.db.commit()
