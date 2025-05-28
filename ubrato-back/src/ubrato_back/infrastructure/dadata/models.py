from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class Organization:
    inn: str
    brand_name: str
    full_name: str
    short_name: str
    okpo: str
    ogrn: str
    kpp: str
    tax_code: int
    address: str
    registration_date: datetime
    director: str
