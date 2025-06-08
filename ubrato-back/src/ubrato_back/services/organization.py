import datetime
import uuid
from typing import Any

from fastapi import Depends, status

from ubrato_back.config import get_config
from ubrato_back.infrastructure.dadata.client import DadataClient
from ubrato_back.infrastructure.postgres.models import (
    ContractorCV,
    ContractorLocation,
    ContractorObject,
    ContractorService,
    CustomerLocation,
    Organization,
)
from ubrato_back.infrastructure.postgres.repos import OrganizationRepository, ProfileRepository
from ubrato_back.infrastructure.typesense import ContractorIndex
from ubrato_back.infrastructure.typesense.schemas import TypesenseContractorService
from ubrato_back.schemas import schema_models
from ubrato_back.services.exceptions import ServiceException


class OrganizationService:
    org_repository: OrganizationRepository
    profile_repository: ProfileRepository
    contractor_index: ContractorIndex

    def __init__(
        self,
        org_repository: OrganizationRepository = Depends(),
        profile_repository: ProfileRepository = Depends(),
        contractor_index: ContractorIndex = Depends(),
    ) -> None:
        self.org_repository = org_repository
        self.profile_repository = profile_repository
        self.contractor_index = contractor_index
        self._dadata_client = DadataClient(get_config().dadata.api_key)

    async def get_organization_from_api(self, inn: str) -> Organization:
        result = await self._dadata_client.get_organization_by_inn(inn)

        if result is None:
            raise ServiceException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="INN NOT FOUND",
            )

        org_id = str(uuid.uuid4())
        org = Organization(
            id=org_id,
            inn=inn,
            brand_name=result.brand_name,
            full_name=result.full_name,
            short_name=result.short_name,
            okpo=result.okpo,
            ogrn=result.ogrn,
            kpp=result.kpp,
            tax_code=result.tax_code,
            address=result.address,
        )

        return org

    async def get_organization_by_id(self, org_id: str) -> Organization:
        org = await self.org_repository.get_organization_by_id(org_id=org_id)
        if org.update_at + datetime.timedelta(days=30) < datetime.datetime.now().astimezone():
            upd_org = await self.get_organization_from_api(org.inn)
            org = await self.org_repository.update_org(upd_org=upd_org)
        return org

    async def get_organization_by_user_id(self, user_id: str) -> schema_models.Organization:
        org = await self.org_repository.get_organization_by_user_id(user_id=user_id)

        return org

    async def get_customer_profile(self, org_id: str) -> schema_models.CustomerProfile:
        customer_info = await self.profile_repository.get_customer(org_id=org_id)
        customer_locations = await self.profile_repository.get_customer_location(org_id=org_id)

        return schema_models.CustomerProfile(
            description=customer_info.description,
            locations=customer_locations,
        )

    async def get_contractor_profile(self, org_id: str) -> schema_models.ContractorProfile:
        contractor_info = await self.profile_repository.get_contractor(org_id=org_id)
        contractor_locations = await self.profile_repository.get_contractor_location(org_id=org_id)

        contractor_pricing = await self.profile_repository.get_contractor_services_pricing(org_id=org_id)

        contractor_objects = await self.profile_repository.get_contractor_objects(org_id=org_id)

        contractor_cv = await self.profile_repository.get_contractor_cv(org_id=org_id)

        return schema_models.ContractorProfile(
            description=contractor_info.description,
            locations=contractor_locations,
            services=contractor_pricing,
            objects=contractor_objects,
            portfolio=contractor_cv,
        )

    async def update_customer_info(self, org_id: str, description: str) -> None:
        await self.profile_repository.update_customer_info(org_id=org_id, description=description)

    async def set_customer_locations(self, org_id: str, locations: list[CustomerLocation]) -> None:
        await self.profile_repository.set_customer_location(org_id=org_id, locations=locations)

    async def update_contractor_info(self, org_id: str, description: str) -> None:
        await self.profile_repository.update_contractor_info(org_id=org_id, description=description)

    async def set_contractor_locations(self, org_id: str, locations: list[ContractorLocation]) -> None:
        self.contractor_index.update_locations(contractor_id=org_id, locations=[id.city_id for id in locations])
        await self.profile_repository.set_contractor_locations(org_id=org_id, locations=locations)

    async def set_contractor_services(self, org_id: str, services: list[ContractorService]) -> None:
        self.contractor_index.update_services(
            contractor_id=org_id,
            services=[
                TypesenseContractorService(
                    contractor_id=org_id,
                    service_type_id=str(service.service_type_id),
                    price=service.price,
                )
                for service in services
            ],
        )

        await self.profile_repository.set_contractor_services(org_id=org_id, services=services)

    async def set_contractor_objects(self, org_id: str, objects: list[ContractorObject]) -> None:
        self.contractor_index.update_objects(
            contractor_id=org_id,
            objects=[object.object_type_id for object in objects],
        )

        await self.profile_repository.set_contractor_objects(org_id=org_id, objects=objects)

    async def save_contractor_cv(self, org_id: str, name: str, description: str, links: list[str]) -> str:
        id = "cv_" + str(uuid.uuid4())
        cv: ContractorCV = ContractorCV(
            id=id,
            org_id=org_id,
            name=name,
            description=description,
            links=links,
        )
        return await self.profile_repository.save_contractor_cv(cv=cv)

    async def update_contractor_cv(self, cv_id: str, cv: dict[str, Any]) -> None:
        await self.profile_repository.update_contractor_cv(cv_id=cv_id, cv=cv)

    async def delete_contractor_cv(self, cv_id: str) -> None:
        await self.profile_repository.delete_contractor_cv(cv_id=cv_id)

    async def get_contractor_cv(self, org_id: str) -> list[schema_models.ContractorCV]:
        return await self.profile_repository.get_contractor_cv(org_id=org_id)

    async def get_contractor_cv_by_id(self, cv_id: str) -> ContractorCV:
        return await self.profile_repository.get_contractor_cv_by_id(cv_id=cv_id)

    async def set_brand_avatar(self, org_id: str, url: str) -> None:
        await self.profile_repository.set_brand_avatar(org_id=org_id, url=url)

    async def set_brand_name(self, org_id: str, name: str) -> None:
        await self.profile_repository.set_brand_name(org_id=org_id, name=name)

    async def set_brand_contact_info(
        self,
        org_id: str,
        emails: list[tuple[str, str]],
        phones: list[tuple[str, str]],
        messengers: list[tuple[str, str]],
    ) -> None:
        await self.profile_repository.set_brand_emails(org_id=org_id, emails=emails)
        await self.profile_repository.set_brand_phones(org_id=org_id, phones=phones)
        await self.profile_repository.set_brand_messengers(org_id=org_id, messengers=messengers)
