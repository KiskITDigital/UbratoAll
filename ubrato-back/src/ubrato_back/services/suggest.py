from fastapi import Depends

from ubrato_back.infrastructure.postgres.repos import CitiesRepository
from ubrato_back.infrastructure.tools.egrul import EgrulClient
from ubrato_back.schemas import schema_models


class SuggestService:
    cities_repository: CitiesRepository

    def __init__(
        self,
        cities_repository: CitiesRepository = Depends(),
    ) -> None:
        self.cities_repository = cities_repository
        self._egrul_client = EgrulClient()

    async def search_city(self, query: str) -> list[schema_models.City]:
        return await self.cities_repository.search_by_name(name=query)

    async def search_company(self, query: str) -> list[schema_models.EgrulCompany]:
        return self._egrul_client.get_org_by_query(query=query)
