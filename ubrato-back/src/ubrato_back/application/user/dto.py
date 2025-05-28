from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class UserOrganizationInfoDTO:
    id: str
    short_name: str
    inn: str
    okpo: str
    ogrn: str
    kpp: str


@dataclass(frozen=True)
class UserMeWithOrg:
    id: str
    email: str
    phone: str
    first_name: str
    middle_name: str
    last_name: str
    avatar: str
    verified: bool
    email_verified: bool
    role: int
    is_contractor: bool
    organization: UserOrganizationInfoDTO
    created_at: datetime
