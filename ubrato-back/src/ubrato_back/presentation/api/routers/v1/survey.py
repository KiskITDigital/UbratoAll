from typing import Annotated

from fastapi import APIRouter, Depends

from ubrato_back.infrastructure.postgres.tx_manager import TxManager
from ubrato_back.schemas.survey import CreateSurveyRequest
from ubrato_back.services.survey import SurveyService

router = APIRouter(
    prefix="/v1/survey",
    tags=["survey"],
)


@router.post("")
async def create_survey(
    data: CreateSurveyRequest,
    survey_service: Annotated[SurveyService, Depends()],
    tx_manager: Annotated[TxManager, Depends()],
) -> None:
    await survey_service.create_survey(data)
    await tx_manager.commit()
