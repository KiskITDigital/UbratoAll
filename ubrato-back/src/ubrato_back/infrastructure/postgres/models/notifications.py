from datetime import datetime

from sqlalchemy import TIMESTAMP, Boolean, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ubrato_back.infrastructure.postgres.models.base import Base


class Notification(Base):
    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[str] = mapped_column(String(40), ForeignKey("users.id"))
    header: Mapped[str | None] = mapped_column(String, nullable=True)
    msg: Mapped[str | None] = mapped_column(String, nullable=True)
    href: Mapped[str | None] = mapped_column(String, nullable=True)
    href_text: Mapped[str | None] = mapped_column(String, nullable=True)
    href_color: Mapped[int | None] = mapped_column(Integer, default=0)
    read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), default=func.current_timestamp())

    user = relationship("User", back_populates="notification")
