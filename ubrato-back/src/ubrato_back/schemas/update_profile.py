from pydantic import BaseModel
from pydantic_extra_types.phone_numbers import PhoneNumber

from ubrato_back.schemas.models.organization import ContactInfo

PhoneNumber.phone_format = "E164"


class UpdateCustomerProfileRequest(BaseModel):
    description: str
    locations: list[int]


class ContractorPricingRequest(BaseModel):
    id: int
    price: int


class ContractorCVRequest(BaseModel):
    name: str
    description: str
    links: list[str]


class ContractorCVResponse(BaseModel):
    id: str


class UpdateContractorProfileRequest(BaseModel):
    description: str
    locations: list[int]
    services: list[ContractorPricingRequest]
    objects: list[int]


class UpdateBrandProfileRequest(BaseModel):
    name: str
    avatar: str


class UpdateBrandContactRequest(BaseModel):
    emails: list[ContactInfo]
    phones: list[ContactInfo]
    messengers: list[ContactInfo]


class UpdAvatarRequest(BaseModel):
    avatar: str


class UpdateUserInfoRequest(BaseModel):
    first_name: str
    middle_name: str
    last_name: str
    phone: PhoneNumber
