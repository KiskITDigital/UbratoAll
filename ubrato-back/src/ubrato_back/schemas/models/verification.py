from datetime import datetime

from pydantic import BaseModel


class VerificationInfo(BaseModel):
    id: str
    verified: bool | None
    msg: str | None
    verified_at: datetime | None
    created_at: datetime
