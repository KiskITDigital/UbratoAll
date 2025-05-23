from pydantic import BaseModel


class TenderRespondRequest(BaseModel):
    price: int | None
