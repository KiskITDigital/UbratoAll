from datetime import datetime

from pydantic import BaseModel


class Category(BaseModel):
    name: str
    services: list[str]


class Tender(BaseModel):
    id: int
    name: str
    price: int
    is_contract_price: bool
    is_nds_price: bool
    location: str
    floor_space: int
    description: str
    wishes: str
    specification: str
    attachments: list[str]
    categories: list[Category]
    reception_start: datetime
    reception_end: datetime
    work_start: datetime
    work_end: datetime
    object_group: str
    objects_types: list[str]
    user_id: str
    created_at: datetime
    verified: bool


class DraftTender(BaseModel):
    id: int
    user_id: str
    name: str
    price: int | None
    is_contract_price: bool | None
    is_nds_price: bool | None
    location: int | None
    floor_space: int | None
    description: str | None
    wishes: str | None
    specification: str | None
    attachments: list[str] | None
    services_groups: list[int]
    services_types: list[int]
    reception_start: datetime | None
    reception_end: datetime | None
    work_start: datetime | None
    work_end: datetime | None
    object_group: int | None
    objects_types: list[int]
    update_at: datetime | None
