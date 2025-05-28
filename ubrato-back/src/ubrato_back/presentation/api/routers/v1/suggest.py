from fastapi import APIRouter, Depends, HTTPException, status

from ubrato_back.application.organization.dto import ExternalOrganizationInfo
from ubrato_back.infrastructure.postgres.readers.organization import OrganizationReader
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
    response_model=list[ExternalOrganizationInfo],
)
async def search_company(
    query: str,
    suggest_service: SuggestService = Depends(),
) -> list[ExternalOrganizationInfo]:
    return await suggest_service.search_company(query=query)


@router.get("/check-inn")
async def check_inn(
    inn: str,
    organization_reader: OrganizationReader = Depends(),
) -> None:
    is_organization_exists = await organization_reader.check_organization_with_inn_exists(inn=inn)
    if is_organization_exists is False:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "not found")
