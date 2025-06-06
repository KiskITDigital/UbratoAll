from dataclasses import dataclass


@dataclass(frozen=True)
class Identity:
    id: str
    org_id: str | None
    role: int
