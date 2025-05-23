from datetime import datetime

from pydantic import BaseModel


class CreateDraftTenderRequest(BaseModel):
    name: str
    price: int | None
    is_contract_price: bool | None
    is_nds_price: bool | None
    floor_space: int | None
    description: str | None
    wishes: str | None
    specification: str | None
    attachments: list[str] | None
    services_types: list[int]
    objects_types: list[int]
    reception_start: datetime | None
    reception_end: datetime | None
    work_start: datetime | None
    work_end: datetime | None
    city_id: int | None
