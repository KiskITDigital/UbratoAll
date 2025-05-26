from fastapi import APIRouter, Depends, status

from ubrato_back.presentation.api.routers.v1.dependencies import get_user, is_creator_or_manager
from ubrato_back.schemas import schema_models
from ubrato_back.schemas.add_document import AddDocumentResponse
from ubrato_back.schemas.exception import ExceptionResponse
from ubrato_back.schemas.jwt_user import JWTUser
from ubrato_back.schemas.success import SuccessResponse
from ubrato_back.schemas.verify_request import SaveVerificationDoc
from ubrato_back.services import VerificationService

router = APIRouter(
    prefix="/v1/verification",
    tags=["verification"],
)


@router.get(
    "/docs/types",
    response_model=list[schema_models.VerificationDocType],
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": ExceptionResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
)
async def get_doc_types(
    verf_service: VerificationService = Depends(),
) -> list[schema_models.VerificationDocType]:
    return await verf_service.get_doc_types()


@router.post(
    "/docs",
    response_model=AddDocumentResponse,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": ExceptionResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
)
async def save_user_doc(
    doc: SaveVerificationDoc,
    verf_service: VerificationService = Depends(),
    user: JWTUser = Depends(get_user),
) -> AddDocumentResponse:
    id = await verf_service.save_doc(link=doc.link, type=doc.type, user_id=user.id)
    return AddDocumentResponse(id=id)


@router.get(
    "/docs",
    response_model=list[schema_models.VerificationDoc],
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": ExceptionResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
)
async def get_user_docs(
    verf_service: VerificationService = Depends(),
    user: JWTUser = Depends(get_user),
) -> list[schema_models.VerificationDoc]:
    return await verf_service.get_user_doc(user_id=user.id)


@router.delete(
    "/docs/{doc_id}",
    response_model=SuccessResponse,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": ExceptionResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
)
async def delete_user_doc(
    doc_id: str,
    verf_service: VerificationService = Depends(),
    user: JWTUser = Depends(get_user),
) -> SuccessResponse:
    doc = await verf_service.get_doc_by_id(doc_id=doc_id)
    await is_creator_or_manager(user_id=doc.user_id, user=user)
    await verf_service.delete_doc_by_id(doc_id=doc_id)
    return SuccessResponse()
