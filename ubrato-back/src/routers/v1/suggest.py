from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from src.schemas import models
from src.services import SuggestService


router = APIRouter(
    prefix="/v1/suggest",
    tags=["suggest"],
)


@router.get(
    "/city",
    response_model=List[models.City],
)
async def search_city(
    query: str,
    suggest_service: SuggestService = Depends(),
) -> List[models.City]:
    return await suggest_service.search_city(query=query)


@router.get(
    "/company",
    response_model=List[models.EgrulCompany],
)
async def search_company(
    query: str,
    suggest_service: SuggestService = Depends(),
) -> List[models.EgrulCompany]:
    return await suggest_service.search_company(query=query)


@router.get("/check-inn")
async def check_inn(
    inn: str,
    suggest_service: SuggestService = Depends(),
) -> None:
    companies = await suggest_service.search_company(query=inn)
    if not companies:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "not found")
