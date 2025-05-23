from pydantic import BaseModel

from .user import UserMe


class QuestionnaireAnswer(BaseModel):
    id: int
    answers: list[str]
    user: UserMe
