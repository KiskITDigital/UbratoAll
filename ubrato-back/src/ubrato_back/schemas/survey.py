from dataclasses import dataclass
from typing import Literal


@dataclass(frozen=True)
class CreateSurveyRequest:
    name: str
    type: Literal["SURVEY_TYPE_FEEDBACK"]
    phone: str
    question: str
