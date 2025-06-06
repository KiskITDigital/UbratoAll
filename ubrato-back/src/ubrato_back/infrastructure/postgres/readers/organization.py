from sqlalchemy import select, sql

from ubrato_back.infrastructure.postgres.models import Organization
from ubrato_back.infrastructure.postgres.models.user import User
from ubrato_back.infrastructure.postgres.readers.base import BaseReader


class OrganizationReader(BaseReader):
    async def check_organization_with_inn_exists(self, inn: str) -> bool:
        query = (
            select(sql.true())
            .select_from(Organization)
            .join(Organization.user)
            .where(Organization.inn == inn, User.deleted_at.is_(None))
        )
        is_organization_exists: bool = await self._session.scalar(query) or False
        return is_organization_exists
