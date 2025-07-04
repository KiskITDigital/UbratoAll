from datetime import datetime

from sqlalchemy import TIMESTAMP, SmallInteger, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from ubrato_back.infrastructure.postgres.models.base import Base


class Logs(Base):
    __tablename__ = "logs"

    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    method: Mapped[str] = mapped_column(String(6), nullable=False)
    url: Mapped[str] = mapped_column(String(255), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    code: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    msg: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), default=func.current_timestamp())
