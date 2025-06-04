from datetime import datetime
from typing import Literal
from uuid import UUID

from sqlalchemy import TIMESTAMP, String, Uuid, func
from sqlalchemy.orm import Mapped, mapped_column

from ubrato_back.infrastructure.postgres.models.base import Base


class Survey(Base):
    __tablename__ = "surveys"

    id: Mapped[UUID] = mapped_column(Uuid(), primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    type: Mapped[Literal["SURVEY_TYPE_FEEDBACK"]] = mapped_column(String(100))
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    question: Mapped[str] = mapped_column(String(1000), nullable=False)

    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), default=func.current_timestamp())
