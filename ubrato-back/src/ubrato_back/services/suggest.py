from fastapi import Depends

from ubrato_back.application.organization.dto import ExternalOrganizationInfo
from ubrato_back.config import get_config
from ubrato_back.infrastructure.dadata.client import DadataClient
from ubrato_back.infrastructure.dadata.models import Organization
from ubrato_back.infrastructure.postgres.repos import CitiesRepository
from ubrato_back.schemas import schema_models


class SuggestService:
    cities_repository: CitiesRepository

    def __init__(
        self,
        cities_repository: CitiesRepository = Depends(),
    ) -> None:
        self.cities_repository = cities_repository
        self._dadata_client = DadataClient(get_config().dadata.api_key)

    async def search_city(self, query: str) -> list[schema_models.City]:
        return await self.cities_repository.search_by_name(name=query)

    async def search_company(self, query: str) -> list[ExternalOrganizationInfo]:
        organizations = await self._dadata_client.get_organizations_by_inn(inn=query)
        return [ExternalOrganizationInfo(inn=org.inn, name=org.short_name, director=org.director) for org in organizations]
