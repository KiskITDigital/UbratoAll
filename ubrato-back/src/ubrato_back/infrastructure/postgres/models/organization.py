from datetime import datetime

from sqlalchemy import TIMESTAMP, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ubrato_back.infrastructure.postgres.models.base import Base
from ubrato_back.schemas import schema_models


class Organization(Base):
    __tablename__ = "organizations"

    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    brand_name: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    short_name: Mapped[str] = mapped_column(String(50), nullable=False)
    inn: Mapped[str] = mapped_column(String(10), nullable=False)
    okpo: Mapped[str] = mapped_column(String(8), nullable=False)
    ogrn: Mapped[str] = mapped_column(String(15), nullable=False)
    kpp: Mapped[str] = mapped_column(String(12), nullable=False)
    tax_code: Mapped[int] = mapped_column(Integer, nullable=False)
    address: Mapped[str] = mapped_column(String(255), nullable=False)
    avatar: Mapped[str | None] = mapped_column(String(255), nullable=True)
    email: Mapped[list[dict[str, str]]] = mapped_column(JSONB, default=[], nullable=True)
    phone: Mapped[list[dict[str, str]]] = mapped_column(JSONB, default=[], nullable=True)
    messenger: Mapped[list[dict[str, str]]] = mapped_column(JSONB, default=[], nullable=True)
    user_id: Mapped[str] = mapped_column(String(40), ForeignKey("users.id"), nullable=False)
    update_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.current_timestamp(),
    )
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.current_timestamp())

    user = relationship("User", back_populates="organization")
    customer_profile = relationship("CustomerProfile", back_populates="org")
    customer_locations = relationship("CustomerLocation", back_populates="org")
    contractor_profile = relationship("ContractorProfile", back_populates="org")
    contractor_services = relationship("ContractorService", back_populates="org")
    contractor_objects = relationship("ContractorObject", back_populates="org")
    contractor_cv = relationship("ContractorCV", back_populates="org")
    contractor_locations = relationship("ContractorLocation", back_populates="org")

    def to_model(self) -> schema_models.Organization:
        email: list[schema_models.ContactInfo] = []
        for info in self.email:
            email.append(schema_models.ContactInfo(contact=info["contact"], info=info["description"]))

        phone: list[schema_models.ContactInfo] = []
        for info in self.phone:
            phone.append(schema_models.ContactInfo(contact=info["contact"], info=info["description"]))

        messenger: list[schema_models.ContactInfo] = []
        for info in self.messenger:
            messenger.append(schema_models.ContactInfo(contact=info["contact"], info=info["description"]))

        return schema_models.Organization(
            id=self.id,
            brand_name=self.brand_name,
            full_name=self.full_name,
            short_name=self.short_name,
            inn=self.inn,
            okpo=self.okpo,
            ogrn=self.ogrn,
            kpp=self.kpp,
            tax_code=self.tax_code,
            address=self.address,
            avatar=self.avatar,
            email=email,
            phone=phone,
            messenger=messenger,
            user_id=self.user_id,
            update_at=self.update_at,
            created_at=self.created_at,
        )
