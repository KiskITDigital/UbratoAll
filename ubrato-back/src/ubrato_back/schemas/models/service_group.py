from pydantic import BaseModel


class ServiceGroupModel(BaseModel):
    id: int
    name: str


class ServiceTypeModel(BaseModel):
    id: int
    name: str
    count: int = 0


class ServiceGroupWithTypes(BaseModel):
    id: int
    name: str
    total: int = 0
    types: list[ServiceTypeModel]


class ServicesGroupsWithTypes(BaseModel):
    groups: list[ServiceGroupWithTypes]
