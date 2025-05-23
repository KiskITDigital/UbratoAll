from datetime import datetime

from pydantic import BaseModel


class Notification(BaseModel):
    id: int
    header: str | None
    msg: str | None
    href: str | None
    href_text: str | None
    href_color: int | None
    read: bool
    created_at: datetime


class Notifications(BaseModel):
    total: int
    notifications: list[Notification]
