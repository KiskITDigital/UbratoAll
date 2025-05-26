from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from ubrato_back.infrastructure.postgres.models.base import Base


class TenderOffer(Base):
    __tablename__ = "tender_offers"

    contractor_id: Mapped[str] = mapped_column(String(40), ForeignKey("organizations.id"), primary_key=True)
    tender_id: Mapped[int] = mapped_column(Integer, ForeignKey("tender.id"), primary_key=True)
