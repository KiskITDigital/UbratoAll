from fastapi import Depends

from ubrato_back.infrastructure.postgres.repos import CitiesRepository
from ubrato_back.schemas import models
from ubrato_back.infrastructure.tools import get_org_by_query


class SuggestService:
    cities_repository: CitiesRepository

    def __init__(
        self,
        cities_repository: CitiesRepository = Depends(),
    ) -> None:
        self.cities_repository = cities_repository

    async def search_city(self, query: str) -> list[models.City]:
        return await self.cities_repository.search_by_name(name=query)

    async def search_company(self, query: str) -> list[models.EgrulCompany]:
        return get_org_by_query(query=query)
