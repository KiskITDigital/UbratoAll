from datetime import datetime

from pydantic import BaseModel


class TenderResponse(BaseModel):
    company_id: str
    company_name: str
    company_avatar: str | None
    price: int | None
    response_at: datetime
