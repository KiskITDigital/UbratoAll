from pydantic import BaseModel


class QuestionnaireRequest(BaseModel):
    answers: list[str]
