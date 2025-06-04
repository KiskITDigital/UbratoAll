from ubrato_back.infrastructure.postgres.models.survey import Survey
from ubrato_back.infrastructure.postgres.repos.base import BaseRepo


class SurveyRepo(BaseRepo):
    async def add_survey(self, survey: Survey) -> None:
        self._session.add(survey)
        await self._session.flush((survey,))
