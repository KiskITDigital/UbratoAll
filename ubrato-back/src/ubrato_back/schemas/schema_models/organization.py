from datetime import datetime

from pydantic import BaseModel


class ContactInfo(BaseModel):
    contact: str
    info: str


class Organization(BaseModel):
    id: str
    brand_name: str
    full_name: str
    short_name: str
    inn: str
    okpo: str
    ogrn: str
    kpp: str
    tax_code: int
    address: str
    avatar: str | None
    email: list[ContactInfo]
    phone: list[ContactInfo]
    messenger: list[ContactInfo]
    user_id: str
    update_at: datetime
    created_at: datetime


class OrganizationLiteDTO(BaseModel):
    id: str
    short_name: str
    inn: str
    okpo: str
    ogrn: str
    kpp: str


class OrganizationDTO(BaseModel):
    id: str
    brand_name: str
    short_name: str
    inn: str
    okpo: str
    ogrn: str
    kpp: str
    avatar: str | None


class EgrulCompany(BaseModel):
    name: str
    director: str
    inn: str
    kpp: str
    ogrn: str
    registration_date: str
    region: str
