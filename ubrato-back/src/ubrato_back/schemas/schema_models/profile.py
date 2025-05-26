from pydantic import BaseModel


class ContractorPricing(BaseModel):
    id: int
    name: str
    price: int


class ProfileLocation(BaseModel):
    id: int
    name: str


class ContractorObject(BaseModel):
    id: int
    name: str


class ContractorCV(BaseModel):
    id: str
    name: str
    description: str
    links: list[str]


class CustomerProfile(BaseModel):
    description: str | None
    locations: list[ProfileLocation]


class ContractorProfile(BaseModel):
    description: str | None
    locations: list[ProfileLocation]
    services: list[ContractorPricing]
    objects: list[ContractorObject]
    portfolio: list[ContractorCV]
