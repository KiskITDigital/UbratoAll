from datetime import datetime
from typing import Any

from fastapi import Depends, status
from sqlalchemy import and_, delete, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from ubrato_back.config import get_config
from ubrato_back.infrastructure.postgres.exceptions import RepositoryException
from ubrato_back.infrastructure.postgres.main import get_db_connection
from ubrato_back.infrastructure.postgres.models import (
    City,
    ObjectGroup,
    ObjectType,
    Organization,
    ServiceGroup,
    ServiceType,
    Tender,
    TenderObjectType,
    TenderOffer,
    TenderRespond,
    TenderServiceType,
    UserFavoriteTender,
)
from ubrato_back.schemas import schema_models


class TenderRepository:
    db: AsyncSession

    def __init__(self, db: AsyncSession = Depends(get_db_connection)) -> None:
        self.db = db

    async def create_tender(
        self,
        tender: Tender,
        service_type_ids: list[int],
        object_type_ids: list[int],
    ) -> Tender:
        self.db.add(tender)
        await self.db.flush()
        for id in service_type_ids:
            self.db.add(
                TenderServiceType(
                    tender_id=tender.id,
                    service_type_id=id,
                )
            )

        for id in object_type_ids:
            self.db.add(
                TenderObjectType(
                    tender_id=tender.id,
                    object_type_id=id,
                )
            )

        await self.db.commit()

        await self.db.refresh(tender)

        return tender

    async def update_tender(self, tender: dict[str, Any], tender_id: int) -> Tender:
        query = await self.db.execute(select(Tender).where(Tender.id == tender_id))

        tender_to_update = query.scalar()

        if tender_to_update is None:
            raise RepositoryException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=tender_id,
                sql_msg="",
            )

        for key, value in tender.items():
            setattr(tender_to_update, key, value)
            tender_to_update.verified = False

        await self.db.execute(
            delete(TenderServiceType).where(
                TenderServiceType.tender_id == tender_to_update.id,
            )
        )

        await self.db.execute(
            delete(TenderObjectType).where(
                TenderObjectType.tender_id == tender_to_update.id,
            )
        )

        await self.db.flush()

        for id in tender["services_types"]:
            self.db.add(
                TenderServiceType(
                    tender_id=tender_to_update.id,
                    service_type_id=id,
                )
            )

        for id in tender["objects_types"]:
            self.db.add(
                TenderObjectType(
                    tender_id=tender_to_update.id,
                    object_type_id=id,
                )
            )

        await self.db.commit()
        await self.db.refresh(tender_to_update)
        return tender_to_update

    async def get_page_tenders(
        self,
        page: int,
        page_size: int,
        object_group_id: int | None,
        object_type_id: int | None,
        service_type_ids: list[int] | None,
        service_group_ids: list[int] | None,
        floor_space_from: int | None,
        floor_space_to: int | None,
        price_from: int | None,
        price_to: int | None,
        verified: bool | None,
        user_id: str | None,
    ) -> list[schema_models.Tender]:
        reception_end_condition = Tender.reception_end > datetime.now()

        service_type_condition = (service_type_ids is None) or and_(
            *(
                Tender.services_types.any(service_type_id)  # type: ignore
                for service_type_id in service_type_ids
            )
        )

        service_group_condition = (service_group_ids is None) or and_(
            *(
                Tender.services_groups.any(service_group_id)  # type: ignore
                for service_group_id in service_group_ids
            )
        )

        floor_space_from_condition = (floor_space_from is None) or (Tender.floor_space >= floor_space_from)

        floor_space_to_condition = (floor_space_to is None) or (Tender.floor_space <= floor_space_to)

        price_from_condition = (price_from is None) or (Tender.price >= price_from)

        price_to_condition = (price_to is None) or (Tender.price <= price_to)

        verified_condition = (verified is None) or (Tender.verified == verified)

        user_id_condition = (user_id is None) or (Tender.user_id == user_id)

        query = await self.db.execute(
            select(Tender, City.name)
            .join(City, Tender.city_id == City.id)
            .where(
                and_(
                    reception_end_condition,
                    service_type_condition,  # type: ignore
                    service_group_condition,  # type: ignore
                    floor_space_from_condition,  # type: ignore
                    floor_space_to_condition,  # type: ignore
                    price_from_condition,  # type: ignore
                    price_to_condition,  # type: ignore
                    verified_condition,  # type: ignore
                    user_id_condition,  # type: ignore
                )
            )
            .order_by(Tender.created_at.desc())
            .limit(page_size)
            .offset((page - 1) * page_size)
        )
        tenders: list[schema_models.Tender] = []

        for found_tender in query.all():
            tender, city_name = found_tender._tuple()

            tender_model = await self.format_tender(
                tender=tender,
                city_name=city_name,
            )
            tenders.append(tender_model)

        return tenders

    async def get_tender_by_id(self, tender_id: int) -> schema_models.Tender:
        query = await self.db.execute(select(Tender, City.name).join(City).where(Tender.id == tender_id))

        found_tender = query.tuples().first()

        if found_tender is None:
            raise RepositoryException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=get_config().localization.config["errors"]["tenderid_not_found"].format(tender_id),
                sql_msg="",
            )

        tender, city_name = found_tender

        return await self.format_tender(
            tender=tender,
            city_name=city_name,
        )

    async def update_verified_status(self, tender_id: int, verified: bool) -> None:
        query = await self.db.execute(select(Tender).where(Tender.id == tender_id))

        tender = query.scalar()

        if tender is None:
            raise RepositoryException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=get_config().localization.config["errors"]["tenderid_not_found"].format(tender_id),
                sql_msg="",
            )

        tender.verified = verified
        await self.db.commit()

    async def get_count_active_tenders(self, object_type_id: int | None, service_type_ids: int | None) -> int:
        service_object_condition = object_type_id is None or TenderObjectType.object_type_id == object_type_id
        service_type_condition = service_type_ids is None or TenderServiceType.service_type_id == service_type_ids

        query = await self.db.execute(
            select(func.count(Tender.id))
            .join(TenderServiceType, Tender.id == TenderServiceType.tender_id)
            .join(TenderObjectType, Tender.id == TenderObjectType.tender_id)
            .where(
                and_(
                    service_type_condition,
                    service_object_condition,  # type: ignore
                    Tender.reception_end < datetime.now(),
                )
            )
        )
        result = query.scalar()
        if result:
            return result

        return 0

    async def get_object_group(self, object_type_id: int) -> int:
        query = await self.db.execute(
            select(ObjectGroup.id)
            .select_from(ObjectGroup)
            .join(ObjectType, ObjectGroup.id == ObjectType.id)
            .where(ObjectType.id == object_type_id)
        )

        result = query.scalar()
        if result:
            return result

        return 0

    async def get_services_groups(self, service_type_ids: list[int]) -> list[int]:
        query = await self.db.execute(
            select(ServiceGroup.id)
            .select_from(ServiceGroup)
            .join(ServiceType, ServiceGroup.id == ServiceType.id)
            .where(ServiceType.id.in_(service_type_ids))
        )

        result = query.scalars()
        groups: list[int] = []
        for v in result.all():
            groups.append(v)

        return groups

    async def format_tender(
        self,
        tender: Tender,
        city_name: str,
    ) -> schema_models.Tender:
        services_type_names: dict[int, list[str]] = {}

        query = await self.db.execute(
            select(ServiceType.name, ServiceType.service_group_id)
            .join(
                TenderServiceType,
                TenderServiceType.service_type_id == ServiceType.id,
            )
            .where(TenderServiceType.tender_id == tender.id)
        )

        for service in query.all():
            service_name, service_group_id = service._tuple()
            if service_group_id not in services_type_names:
                services_type_names[service_group_id] = []
            services_type_names[service_group_id].append(service_name)

        services_groups_names: dict[str, list[str]] = {}

        query = await self.db.execute(
            select(ServiceGroup.name, ServiceGroup.id)
            .select_from(ServiceType)
            .join(
                ServiceGroup,
                ServiceType.service_group_id == ServiceGroup.id,
            )
            .where(
                and_(
                    TenderServiceType.service_type_id == ServiceType.id,
                    TenderServiceType.tender_id == tender.id,
                )
            )
        )

        for service_group in query.all():
            service_group_name, service_group_id = service_group._tuple()
            if service_group_name not in services_groups_names:
                services_groups_names[service_group_name] = []
            services_groups_names[service_group_name] = services_type_names[service_group_id]

        object_type_names: list[str] = []

        query = await self.db.execute(
            select(ObjectType.name)
            .join(
                TenderObjectType,
                TenderObjectType.object_type_id == ObjectType.id,
            )
            .where(TenderObjectType.tender_id == tender.id)
        )

        for name in query.scalars():
            object_type_names.append(name)

        query = await self.db.execute(
            select(ObjectGroup.name)
            .select_from(ObjectType)
            .join(
                ObjectGroup,
                ObjectType.object_group_id == ObjectGroup.id,
            )
            .where(
                and_(
                    TenderObjectType.object_type_id == ObjectType.id,
                    TenderObjectType.tender_id == tender.id,
                )
            )
        )

        object_group_name = query.scalars().first()

        if object_group_name is None:
            raise RepositoryException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="",
                sql_msg="failed format tender",
            )

        catergories: list[schema_models.Category] = []

        for name in services_groups_names:
            catergories.append(schema_models.Category(name=name, services=services_groups_names[name]))

        return schema_models.Tender(
            id=tender.id,
            name=tender.name,
            price=tender.price,
            is_contract_price=tender.is_contract_price,
            is_nds_price=tender.is_nds_price,
            location=city_name,
            floor_space=tender.floor_space,
            description=tender.description,
            wishes=tender.wishes,
            specification=tender.specification,
            attachments=tender.attachments,
            categories=catergories,
            reception_start=tender.reception_start,
            reception_end=tender.reception_end,
            work_start=tender.work_start,
            work_end=tender.work_end,
            object_group=object_group_name,
            objects_types=object_type_names,
            user_id=tender.user_id,
            created_at=tender.created_at,
            verified=tender.verified,
        )

    async def respond_tender(self, tender_id: int, user_id: str, price: int | None) -> None:
        self.db.add(TenderRespond(tender_id=tender_id, user_id=user_id, price=price))
        await self.db.commit()

    async def is_responded(self, tender_id: int, user_id: str) -> bool:
        query = await self.db.execute(
            select(TenderRespond).where(
                and_(
                    TenderRespond.tender_id == tender_id,
                    TenderRespond.user_id == user_id,
                )
            )
        )

        return query.scalar() is not None

    async def is_has_offer(self, tender_id: int, org_id: str) -> bool:
        query = await self.db.execute(
            select(TenderOffer).where(
                and_(
                    TenderOffer.tender_id == tender_id,
                    TenderOffer.contractor_id == org_id,
                )
            )
        )

        return query.scalar() is not None

    async def get_user_responses(self, user_id: str) -> list[TenderRespond]:
        query = await self.db.execute(
            select(TenderRespond).where(
                TenderRespond.user_id == user_id,
            )
        )

        return [response for response in query.scalars().all()]

    async def make_offer(self, contractor_id: str, tender_id: int) -> None:
        self.db.add(TenderOffer(contractor_id=contractor_id, tender_id=tender_id))
        await self.db.commit()

    async def is_offer_exist(self, contractor_id: str, tender_id: int) -> bool:
        query = await self.db.execute(
            select(TenderOffer).where(
                and_(
                    TenderOffer.contractor_id == contractor_id,
                    TenderOffer.tender_id == tender_id,
                )
            )
        )

        return query.scalar() is not None

    async def is_tender_owner(self, user_id: str, tender_id: int) -> bool:
        query = await self.db.execute(select(Tender).where(Tender.id == tender_id))

        tender = query.scalar()

        if tender is None:
            raise RepositoryException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=get_config().localization.config["errors"]["tenderid_not_found"].format(tender_id),
                sql_msg="",
            )

        return tender.user_id == user_id

    async def is_favorite(self, tender_id: int, user_id: str) -> bool:
        query = await self.db.execute(
            select(UserFavoriteTender).where(
                and_(
                    UserFavoriteTender.user_id == user_id,
                    UserFavoriteTender.tender_id == tender_id,
                )
            )
        )

        return query.scalar() is not None

    async def add_to_favorite(self, tender_id: int, user_id: str) -> None:
        self.db.add(
            UserFavoriteTender(
                user_id=user_id,
                tender_id=tender_id,
            )
        )

        await self.db.commit()

    async def remove_from_favorite(self, tender_id: int, user_id: str) -> None:
        await self.db.execute(
            delete(UserFavoriteTender).where(
                and_(
                    UserFavoriteTender.user_id == user_id,
                    UserFavoriteTender.tender_id == tender_id,
                )
            )
        )

        await self.db.commit()

    async def get_user_favorites(self, user_id: str) -> list[schema_models.Tender]:
        query = await self.db.execute(
            select(Tender, City.name)
            .join(City, Tender.city_id == City.id)
            .join(UserFavoriteTender, Tender.id == UserFavoriteTender.tender_id)
            .where(
                and_(
                    UserFavoriteTender.user_id == user_id,
                )
            )
        )

        tenders: list[schema_models.Tender] = []

        for found_tender in query.all():
            tender, city_name = found_tender._tuple()

            tender_model = await self.format_tender(
                tender=tender,
                city_name=city_name,
            )
            tenders.append(tender_model)

        return tenders

    async def get_user_tenders(self, user_id: str) -> list[schema_models.Tender]:
        query = await self.db.execute(select(Tender, City.name).join(City).where(Tender.user_id == user_id))

        tenders: list[schema_models.Tender] = []

        for found_tender in query.all():
            tender, city_name = found_tender._tuple()

            tender_model = await self.format_tender(
                tender=tender,
                city_name=city_name,
            )
            tenders.append(tender_model)

        return tenders

    async def get_tender_responses(self, tender_id: int) -> list[schema_models.TenderResponse]:
        query = await self.db.execute(
            select(Organization, TenderRespond)
            .join(
                Organization,
                Organization.user_id == TenderRespond.user_id,
            )
            .where(TenderRespond.tender_id == tender_id)
        )

        tenders: list[schema_models.TenderResponse] = []

        for found_tender in query.all():
            org, response = found_tender._tuple()

            response_model = schema_models.TenderResponse(
                company_id=org.id,
                company_name=org.brand_name,
                company_avatar=org.avatar,
                price=response.price,
                response_at=response.respond_at,
            )

            tenders.append(response_model)

        return tenders
