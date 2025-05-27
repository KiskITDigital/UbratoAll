from fastapi import Depends, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ubrato_back.config import get_config
from ubrato_back.infrastructure.postgres.exceptions import RepositoryException
from ubrato_back.infrastructure.postgres.main import get_db_connection
from ubrato_back.infrastructure.postgres.models import Organization, Questionnaire, User
from ubrato_back.schemas import schema_models


class QuestionnaireRepository:
    db: AsyncSession

    def __init__(self, db: AsyncSession = Depends(get_db_connection)) -> None:
        self.db = db
        self.localization = get_config().localization.config

    async def save(self, answers: list[str], user_id: str) -> None:
        self.db.add(
            Questionnaire(
                answers=answers,
                user_id=user_id,
            )
        )
        await self.db.commit()

    async def get_page(self, page: int, page_size: int) -> list[schema_models.QuestionnaireAnswer]:
        query = await self.db.execute(
            select(Questionnaire, User, Organization)
            .join(User, Questionnaire.user_id == User.id)
            .join(Organization, Questionnaire.user_id == Organization.user_id)
            .order_by(Questionnaire.created_at.desc())
            .limit(page_size)
            .offset((page - 1) * page_size)
        )

        answers: list[schema_models.QuestionnaireAnswer] = []

        for found_tender in query.all():
            answer, user, org = found_tender._tuple()

            org_model = schema_models.OrganizationLiteDTO(**org.__dict__)
            user_model = schema_models.UserMe(organiztion=org_model, **user.__dict__)

            answers.append(
                schema_models.QuestionnaireAnswer(
                    id=answer.id,
                    answers=answer.answers,
                    user=user_model,
                )
            )

        return answers

    async def get_all(self) -> list[schema_models.QuestionnaireAnswer]:
        query = await self.db.execute(
            select(Questionnaire, User, Organization)
            .join(User, Questionnaire.user_id == User.id)
            .join(Organization, Questionnaire.user_id == Organization.user_id)
            .order_by(Questionnaire.created_at.desc())
        )

        answers: list[schema_models.QuestionnaireAnswer] = []

        for found_tender in query.all():
            answer, user, org = found_tender._tuple()

            org_model = schema_models.OrganizationLiteDTO(**org.__dict__)
            user_model = schema_models.UserMe(organiztion=org_model, **user.__dict__)

            answers.append(
                schema_models.QuestionnaireAnswer(
                    id=answer.id,
                    answers=answer.answers,
                    user=user_model,
                )
            )

        return answers

    async def get_by_user_id(self, user_id: str) -> schema_models.QuestionnaireAnswer:
        query = await self.db.execute(
            select(Questionnaire, User, Organization)
            .join(User, Questionnaire.user_id == User.id)
            .join(Organization, Questionnaire.user_id == Organization.user_id)
            .order_by(Questionnaire.created_at.desc())
            .where(Questionnaire.user_id == user_id)
        )

        result = query.tuples().first()

        if result is None:
            raise RepositoryException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=self.localization["errors"]["questionnaire_not_found"],
                sql_msg="",
            )

        answer, user, org = result

        org_model = schema_models.OrganizationLiteDTO(**org.__dict__)
        user_model = schema_models.UserMe(organiztion=org_model, **user.__dict__)

        return schema_models.QuestionnaireAnswer(
            id=answer.id,
            answers=answer.answers,
            user=user_model,
        )
