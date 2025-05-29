from sqlalchemy import select
from sqlalchemy.orm import joinedload

from ubrato_back.application.user.dto import UserMeWithOrg
from ubrato_back.infrastructure.postgres.converters.user import convert_db_row_to_user_me_with_org_dto
from ubrato_back.infrastructure.postgres.models import User
from ubrato_back.infrastructure.postgres.readers.base import BaseReader


class UserReader(BaseReader):
    async def get_me_with_organization(self, user_id: str) -> None | UserMeWithOrg:
        user_data: User | None = await self._session.scalar(
            select(User).options(joinedload(User.organization)).where(User.id == user_id, User.deleted_at.is_(None))
        )
        if user_data is None:
            return None
        return convert_db_row_to_user_me_with_org_dto(user_data)
