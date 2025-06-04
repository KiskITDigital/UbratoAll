from typing import Annotated
from uuid import uuid4

from fastapi import Depends

from ubrato_back.infrastructure.postgres.models.survey import Survey
from ubrato_back.infrastructure.postgres.repos.survey import SurveyRepo
from ubrato_back.schemas.survey import CreateSurveyRequest


class SurveyService:
    def __init__(self, survey_repo: Annotated[SurveyRepo, Depends()]) -> None:
        self._survey_repo = survey_repo

    async def create_survey(self, data: CreateSurveyRequest):
        survey = Survey(id=uuid4(), name=data.name, type=data.type, phone=data.phone, question=data.question)
        await self._survey_repo.add_survey(survey)
