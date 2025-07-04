from fastapi import Depends

from ubrato_back.infrastructure.postgres.repos import NotificationRepository
from ubrato_back.schemas import schema_models


class NoticeService:
    notification_repository: NotificationRepository

    def __init__(
        self,
        notification_repository: NotificationRepository = Depends(),
    ) -> None:
        self.notification_repository = notification_repository

    async def add_notice(
        self,
        user_id: str,
        header: str | None,
        msg: str | None,
        href: str | None,
        href_text: str | None,
        href_color: int | None,
    ) -> None:
        return await self.notification_repository.add_notice(
            user_id=user_id,
            header=header,
            msg=msg,
            href=href,
            href_text=href_text,
            href_color=href_color,
        )

    async def get_user_notice(self, user_id: str) -> schema_models.Notifications:
        notifications = await self.notification_repository.get_user_notice(user_id=user_id)

        total = sum(1 for i in notifications if not i.read)

        return schema_models.Notifications(
            total=total,
            notifications=notifications,
        )

    async def mark_read(self, ids: list[int], user_id: str) -> None:
        await self.notification_repository.mark_read(ids=ids, user_id=user_id)
