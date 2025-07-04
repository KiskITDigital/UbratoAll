from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ubrato_back.infrastructure.postgres.main import get_db_connection
from ubrato_back.infrastructure.postgres.models import (
    ObjectGroup,
    ObjectType,
    ServiceGroup,
    ServiceType,
)
from ubrato_back.schemas.schema_models import (
    ObjectGroupWithTypes,
    ObjectsGroupsWithTypes,
    ObjectTypeModel,
    ServiceGroupWithTypes,
    ServicesGroupsWithTypes,
    ServiceTypeModel,
)


class TagsRepository:
    db: AsyncSession

    def __init__(self, db: AsyncSession = Depends(get_db_connection)) -> None:
        self.db = db

    async def get_all_objects_with_types(
        self,
    ) -> ObjectsGroupsWithTypes:
        query = await self.db.execute(select(ObjectGroup))

        groups_data: list[ObjectGroupWithTypes] = []

        for group in query.scalars().all():
            query = await self.db.execute(select(ObjectType).where(ObjectType.object_group_id == group.id))

            types_in_group = query.scalars().all()

            types_list = [ObjectTypeModel(id=obj_type.id, name=obj_type.name) for obj_type in types_in_group]
            groups_data.append(ObjectGroupWithTypes(id=group.id, name=group.name, types=types_list))

        return ObjectsGroupsWithTypes(groups=groups_data)

    async def get_all_services_with_types(
        self,
    ) -> ServicesGroupsWithTypes:
        query = await self.db.execute(select(ServiceGroup))

        groups_data: list[ServiceGroupWithTypes] = []

        for group in query.scalars().all():
            query = await self.db.execute(select(ServiceType).where(ServiceType.service_group_id == group.id))

            types_in_group = query.scalars().all()

            types_list = [ServiceTypeModel(id=obj_type.id, name=obj_type.name) for obj_type in types_in_group]
            groups_data.append(ServiceGroupWithTypes(id=group.id, name=group.name, types=types_list))

        return ServicesGroupsWithTypes(groups=groups_data)
