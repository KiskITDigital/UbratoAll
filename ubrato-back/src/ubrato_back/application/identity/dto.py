from dataclasses import dataclass


@dataclass(frozen=True)
class Identity:
    id: str | None
    org_id: str | None
    role: int
