import uuid

from fastapi import Depends

from ubrato_back.infrastructure.postgres.models import Document
from ubrato_back.infrastructure.postgres.repos import VerificationRepository
from ubrato_back.schemas import schema_models


class VerificationService:
    verf_repository: VerificationRepository

    def __init__(self, verf_repository: VerificationRepository = Depends()) -> None:
        self.verf_repository = verf_repository

    async def get_doc_types(self) -> list[schema_models.VerificationDocType]:
        types = await self.verf_repository.get_doc_types()

        doc_types: list[schema_models.VerificationDocType] = []

        for name, id in types.items():
            doc_types.append(schema_models.VerificationDocType(id=id, name=name))

        return doc_types

    async def save_doc(self, link: str, user_id: str, type: int) -> str:
        id = f"doc_{uuid.uuid4()}"
        document = Document(
            id=id,
            url=link,
            type=type,
            user_id=user_id,
        )
        await self.verf_repository.save_docs(document)
        return id

    async def get_user_doc(self, user_id: str) -> list[schema_models.VerificationDoc]:
        return await self.verf_repository.get_user_doc(user_id=user_id)

    async def get_doc_by_id(self, doc_id: str) -> Document:
        return await self.verf_repository.get_doc_by_id(doc_id=doc_id)

    async def delete_doc_by_id(self, doc_id: str) -> None:
        return await self.verf_repository.delete_doc_by_id(doc_id=doc_id)

    async def create_verification_requests(self, user_id: str) -> None:
        await self.verf_repository.create_verification_requests(user_id=user_id)

    async def get_verification_history(self, user_id: str) -> list[schema_models.VerificationInfo]:
        return await self.verf_repository.get_verification_history(user_id=user_id)
