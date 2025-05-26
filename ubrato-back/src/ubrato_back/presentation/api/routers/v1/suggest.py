from fastapi import APIRouter, Depends, HTTPException, status

from ubrato_back.schemas import schema_models
from ubrato_back.services import SuggestService

router = APIRouter(
    prefix="/v1/suggest",
    tags=["suggest"],
)


@router.get(
    "/city",
    response_model=list[schema_models.City],
)
async def search_city(
    query: str,
    suggest_service: SuggestService = Depends(),
) -> list[schema_models.City]:
    return await suggest_service.search_city(query=query)


@router.get(
    "/company",
    response_model=list[schema_models.EgrulCompany],
)
async def search_company(
    query: str,
    suggest_service: SuggestService = Depends(),
) -> list[schema_models.EgrulCompany]:
    return await suggest_service.search_company(query=query)


@router.get("/check-inn")
async def check_inn(
    inn: str,
    suggest_service: SuggestService = Depends(),
) -> None:

    companies = await suggest_service.search_company(query=inn)
    if not companies:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "not found")
