import uuid

from fastapi import Depends, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from ubrato_back.config import get_config
from ubrato_back.infrastructure.postgres.exceptions import RepositoryException
from ubrato_back.infrastructure.postgres.main import get_db_connection
from ubrato_back.infrastructure.postgres.models import (
    Document,
    DocumentType,
    VerificationRequest,
)
from ubrato_back.schemas import schema_models


class VerificationRepository:
    db: AsyncSession

    def __init__(self, db: AsyncSession = Depends(get_db_connection)) -> None:
        self.db = db

    async def get_doc_types(self) -> dict[str, int]:
        query = await self.db.execute(select(DocumentType))

        doc_types: dict[str, int] = {}

        for doc_type in query.scalars().all():
            doc_types[doc_type.name] = doc_type.id

        return doc_types

    async def save_docs(
        self,
        document: Document,
    ) -> None:
        self.db.add(document)
        await self.db.commit()

    async def get_user_doc(
        self,
        user_id: str,
    ) -> list[schema_models.VerificationDoc]:
        query = await self.db.execute(
            select(Document, DocumentType.name).join(DocumentType).where(Document.user_id == user_id)
        )
        docs: list[schema_models.VerificationDoc] = []

        for doc_info in query.all():
            doc, type_name = doc_info._tuple()
            docs.append(
                schema_models.VerificationDoc(
                    id=doc.id,
                    type=type_name,
                    link=doc.url,
                )
            )

        return docs

    async def get_doc_by_id(self, doc_id: str) -> Document:
        query = await self.db.execute(select(Document).where(Document.id == doc_id))
        document = query.scalar_one_or_none()
        if document is None:
            raise RepositoryException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=get_config().localization.config["errors"]["document_not_found"].format(doc_id),
                sql_msg="",
            )
        return document

    async def delete_doc_by_id(self, doc_id: str) -> None:
        doc = await self.get_doc_by_id(doc_id=doc_id)
        await self.db.delete(doc)
        await self.db.commit()

    async def create_verification_requests(self, user_id: str) -> str:
        verification_request_id = str(uuid.uuid4())
        verification_request = VerificationRequest(id=verification_request_id, user_id=user_id)
        self.db.add(verification_request)
        await self.db.commit()
        return verification_request_id

    async def response_verification_requests(self, verf_id: str, is_verified: bool, msg: str | None) -> None:
        query = await self.db.execute(select(VerificationRequest).where(VerificationRequest.id == verf_id))
        verf_req = query.scalar_one_or_none()
        if verf_req is None:
            raise RepositoryException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=get_config().localization.config["errors"]["verified_request_not_found"].format(verf_id),
                sql_msg="",
            )

        verf_req.verified = is_verified
        verf_req.verified_at = func.current_timestamp()
        verf_req.msg = msg

        await self.db.commit()

    async def get_verf_by_id(self, verf_id: str) -> VerificationRequest:
        query = await self.db.execute(select(VerificationRequest).where(VerificationRequest.id == verf_id))
        verf_req = query.scalar_one_or_none()
        if verf_req is None:
            raise RepositoryException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=get_config().localization.config["errors"]["verified_request_not_found"].format(verf_id),
                sql_msg="",
            )
        return verf_req

    async def get_verification_history(self, user_id: str) -> list[schema_models.VerificationInfo]:
        query = await self.db.execute(select(VerificationRequest).where(VerificationRequest.user_id == user_id))

        verf_req_list: list[schema_models.VerificationInfo] = []

        for verf_req in query.scalars().all():
            verf_req_list.append(
                schema_models.VerificationInfo(
                    id=verf_req.id,
                    verified=verf_req.verified,
                    msg=verf_req.msg,
                    verified_at=verf_req.verified_at,
                    created_at=verf_req.created_at,
                )
            )
        return verf_req_list
