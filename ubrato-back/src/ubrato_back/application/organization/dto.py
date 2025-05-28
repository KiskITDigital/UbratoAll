from dataclasses import dataclass


@dataclass(frozen=True)
class ExternalOrganizationInfo:
    inn: str
    name: str
    director: str
