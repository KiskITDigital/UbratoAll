from datetime import datetime

from pydantic import BaseModel


class CreateTenderRequest(BaseModel):
    name: str
    price: int
    is_contract_price: bool
    is_nds_price: bool
    floor_space: int
    description: str
    wishes: str
    specification: str
    attachments: list[str]
    services_types: list[int]
    objects_types: list[int]
    reception_start: datetime
    reception_end: datetime
    work_start: datetime
    work_end: datetime
    city_id: int
