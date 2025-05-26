from sqlalchemy import select, sql

from ubrato_back.infrastructure.postgres.models import Organization
from ubrato_back.infrastructure.postgres.readers.base import BaseReader


class OrganizationReader(BaseReader):
    async def check_organization_with_inn_exists(self, inn: str) -> bool:
        query = select(sql.true()).where(Organization.inn == inn)
        is_organization_exists: bool = await self._session.scalar(query) or False
        return is_organization_exists
