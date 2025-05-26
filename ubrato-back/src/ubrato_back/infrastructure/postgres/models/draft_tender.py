from datetime import datetime

from sqlalchemy import (
    ARRAY,
    TIMESTAMP,
    Boolean,
    ForeignKey,
    Identity,
    Integer,
    String,
    Text,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ubrato_back.infrastructure.postgres.models.base import Base


class DraftTender(Base):
    __tablename__ = "draft_tender"

    id: Mapped[int] = mapped_column(Integer, Identity(start=1, cycle=True), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(40), ForeignKey("users.id"))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    price: Mapped[int | None] = mapped_column(Integer, nullable=False)
    is_contract_price: Mapped[bool | None] = mapped_column(Boolean, nullable=False)
    is_nds_price: Mapped[bool | None] = mapped_column(Boolean, nullable=False)
    city_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("cities.id"), nullable=False)
    floor_space: Mapped[int | None] = mapped_column(Integer, nullable=False)
    description: Mapped[str | None] = mapped_column(String(400))
    wishes: Mapped[str | None] = mapped_column(String(400))
    specification: Mapped[str | None] = mapped_column(String(400))
    attachments: Mapped[list[str] | None] = mapped_column(ARRAY(Text))
    reception_start: Mapped[datetime | None] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.current_timestamp()
    )
    reception_end: Mapped[datetime | None] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.current_timestamp()
    )
    work_start: Mapped[datetime | None] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.current_timestamp()
    )
    work_end: Mapped[datetime | None] = mapped_column(TIMESTAMP(timezone=True), server_default=func.current_timestamp())
    update_at: Mapped[datetime | None] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.current_timestamp()
    )

    user = relationship("User", back_populates="draft_tender")
    city = relationship("City")
    draft_tender_service_type = relationship("DraftTenderServiceType", back_populates="draft_tender")
    draft_tender_object_type = relationship("DraftTenderObjectType", back_populates="draft_tender")
