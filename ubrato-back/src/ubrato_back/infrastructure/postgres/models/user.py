from datetime import datetime

from sqlalchemy import TIMESTAMP, Boolean, SmallInteger, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ubrato_back.infrastructure.postgres.models.base import Base


# TODO: add info row for admin
class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(41), primary_key=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    totp_salt: Mapped[str] = mapped_column(String(32), nullable=False)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    middle_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    avatar: Mapped[str] = mapped_column(String(255), nullable=False)
    verified: Mapped[bool] = mapped_column(Boolean, default=False)
    email_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    role: Mapped[int] = mapped_column(SmallInteger, default=0)
    is_contractor: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), default=func.current_timestamp())
    deleted_at: Mapped[datetime | None] = mapped_column(TIMESTAMP(timezone=True), nullable=True)

    documents = relationship("Document", back_populates="user")
    organization = relationship("Organization", back_populates="user")
    tender = relationship("Tender", back_populates="user")
    draft_tender = relationship("DraftTender", back_populates="user")
    session = relationship("Session", back_populates="user")
    questionnaire = relationship("Questionnaire", back_populates="user")
    notification = relationship("Notification", back_populates="user")
    verification_requests = relationship("VerificationRequest", back_populates="user")
    tender_respond = relationship("TenderRespond", back_populates="user")
