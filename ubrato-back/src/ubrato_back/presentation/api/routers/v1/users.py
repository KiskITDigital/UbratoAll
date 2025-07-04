import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from ubrato_back.application.identity.interface.identity_provider import \
    IdentityProvider
from ubrato_back.application.user.dto import UserMeWithOrg
from ubrato_back.config import get_config
from ubrato_back.infrastructure.broker.nats import (NatsClient,
                                                    get_nats_connection)
from ubrato_back.infrastructure.broker.topic import \
    EMAIL_DELETE_CONFIRMATION_TOPIC
from ubrato_back.infrastructure.crypto.salt import generate_user_salt
from ubrato_back.infrastructure.postgres.exceptions import RepositoryException
from ubrato_back.infrastructure.postgres.readers.user import UserReader
from ubrato_back.infrastructure.postgres.repos.user import UserRepository
from ubrato_back.presentation.api.routers.v1.dependencies import (authorized,
                                                                  get_idp,
                                                                  get_user)
from ubrato_back.schemas import schema_models
from ubrato_back.schemas.delete_account import DeleteAccountRequest
from ubrato_back.schemas.exception import ExceptionResponse
from ubrato_back.schemas.jwt_user import JWTUser
from ubrato_back.schemas.offer_tender import OfferTenderRequest
from ubrato_back.schemas.pb.models.v1.delete_account_confirmation_pb2 import \
    DeleteAccountConfirmation
from ubrato_back.schemas.success import SuccessResponse
from ubrato_back.schemas.update_profile import (UpdateUserInfoRequest,
                                                UpdAvatarRequest)
from ubrato_back.services import (NoticeService, OrganizationService,
                                  QuestionnaireService, TenderService,
                                  UserService, VerificationService)

router = APIRouter(
    prefix="/v1/users",
    tags=["users"],
)


@router.post(
    "/me/verify",
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": ExceptionResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
    tags=["users", "verification"],
)
async def user_requires_verification(
    verf_service: VerificationService = Depends(),
    user: JWTUser = Depends(get_user),
    notice_service: NoticeService = Depends(),
) -> None:
    verification_request_id = await verf_service.create_verification_requests(user_id=user.id)
    verification_request = await verf_service.get_verf_by_id(verification_request_id)
    msk_tz = datetime.timezone(datetime.timedelta(hours=3))
    created_at = verification_request.created_at.astimezone(msk_tz).strftime("%Y-%m-%d %H:%M:%S")
    await notice_service.add_notice(
        user_id=user.id,
        header="Верификация",
        msg=f"{created_at} Документы успешно отправлены. Дождитесь проверки",
        href=None,
        href_text=None,
        href_color=None,
    )


@router.get(
    "/me/verification/history",
    response_model=list[schema_models.VerificationInfo],
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": ExceptionResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
    tags=["users", "verification"],
)
async def user_verification_history(
    verf_service: VerificationService = Depends(),
    user: JWTUser = Depends(get_user),
) -> list[schema_models.VerificationInfo]:
    return await verf_service.get_verification_history(user_id=user.id)


@router.get(
    "/me",
    response_model=UserMeWithOrg,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": ExceptionResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
)
async def get_me(
    user_reader: UserReader = Depends(),
    identity_provider: IdentityProvider = Depends(get_idp),
) -> UserMeWithOrg:
    identity = await identity_provider.get_identity()
    user_with_org = await user_reader.get_me_with_organization(identity.id)
    if user_with_org is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=get_config().localization.config["errors"]["userid_not_found"].format(identity.id),
        )
    return user_with_org


@router.put(
    "/me/avatar",
    response_model=SuccessResponse,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": ExceptionResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
)
async def upd_avatar(
    avatar: UpdAvatarRequest,
    user_service: UserService = Depends(),
    user: JWTUser = Depends(get_user),
) -> SuccessResponse:
    await user_service.upd_avatar(user_id=user.id, avatar=avatar.avatar)
    return SuccessResponse()


@router.get(
    "/me/pass-questionnaire",
    response_model=SuccessResponse,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": ExceptionResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
)
async def pass_questionnaire(
    questionnaire_service: QuestionnaireService = Depends(),
    user: JWTUser = Depends(get_user),
) -> SuccessResponse:
    try:
        await questionnaire_service.get_by_user_id(user_id=user.id)
        return SuccessResponse()
    except RepositoryException as err:
        if err.status_code == status.HTTP_404_NOT_FOUND:
            return SuccessResponse(status=False)
        raise err


@router.get(
    "/me/notice",
    response_model=schema_models.Notifications,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
)
async def get_notice(
    notice_service: NoticeService = Depends(),
    user: JWTUser = Depends(get_user),
) -> schema_models.Notifications:
    return await notice_service.get_user_notice(user_id=user.id)


@router.put(
    "/me/notice/read",
    response_model=SuccessResponse,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
    description="many values example usage: /me/notice/read?ids_str=1,2,3",
)
async def mark_read_notice(
    ids_str: str,
    notice_service: NoticeService = Depends(),
    user: JWTUser = Depends(get_user),
) -> SuccessResponse:
    ids = [int(x) for x in ids_str.split(",")]

    await notice_service.mark_read(ids=ids, user_id=user.id)
    return SuccessResponse()


@router.post(
    "/{contractor_id}/add_favorite",
    response_model=SuccessResponse,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
)
async def add_favorite_contractor(
    contractor_id: str,
    user_service: UserService = Depends(),
    user: JWTUser = Depends(get_user),
) -> SuccessResponse:
    await user_service.add_favorite_contratctor(user_id=user.id, contractor_id=contractor_id)
    return SuccessResponse()


@router.post(
    "/{contractor_id}/remove_favorite",
    response_model=SuccessResponse,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
)
async def remove_favorite_contractor(
    contractor_id: str,
    user_service: UserService = Depends(),
    user: JWTUser = Depends(get_user),
) -> SuccessResponse:
    await user_service.remove_favorite_contratctor(user_id=user.id, contractor_id=contractor_id)
    return SuccessResponse()


@router.get(
    "/{contractor_id}/is_favorite",
    response_model=SuccessResponse,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
)
async def is_favorite_contractor(
    contractor_id: str,
    user_service: UserService = Depends(),
    user: JWTUser = Depends(get_user),
) -> SuccessResponse:
    return SuccessResponse(
        status=await user_service.is_favorite_contratctor(user_id=user.id, contractor_id=contractor_id)
    )


@router.get(
    "/me/favorite_contractors",
    response_model=list[schema_models.FavoriteContractor],
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
)
async def list_favorite_contractor(
    user_service: UserService = Depends(),
    user: JWTUser = Depends(get_user),
) -> list[schema_models.FavoriteContractor]:
    return await user_service.list_favorite_contratctor(user_id=user.id)


@router.post(
    "/{contractor_id}/offer",
    response_model=SuccessResponse,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
)
async def offer_tender(
    contractor_id: str,
    data: OfferTenderRequest,
    tender_service: TenderService = Depends(),
    org_service: OrganizationService = Depends(),
    notice_service: NoticeService = Depends(),
    user: JWTUser = Depends(get_user),
) -> SuccessResponse:
    await tender_service.make_offer(contractor_id=contractor_id, tender_id=data.tender_id, user_id=user.id)
    org = await org_service.get_organization_by_id(org_id=contractor_id)
    await notice_service.add_notice(
        user_id=org.user_id,
        header="Оффер",
        msg="Вы получиле оффер",
        href=f"https://ubrato.ru/tender/{data.tender_id}",
        href_text="посмотреть тендер",
        href_color=1,
    )
    return SuccessResponse()


@router.get(
    "/me/favorite_tenders",
    response_model=list[schema_models.Tender],
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
)
async def list_favorite_tenders(
    user_service: UserService = Depends(),
    user: JWTUser = Depends(get_user),
) -> list[schema_models.Tender]:
    return await user_service.list_favorite_tenders(user_id=user.id)


@router.put(
    "/me/info",
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ExceptionResponse},
    },
    dependencies=[Depends(authorized)],
)
async def update_user_info(
    data: UpdateUserInfoRequest,
    user_service: UserService = Depends(),
    user: JWTUser = Depends(get_user),
) -> SuccessResponse:
    await user_service.upd_info(
        user_id=user.id,
        first_name=data.first_name,
        middle_name=data.middle_name,
        last_name=data.last_name,
        phone=data.phone,
    )
    return SuccessResponse()


@router.get("/check-email")
async def get_user_by_email(
    email: str,
    user_service: UserService = Depends(),
) -> None:
    await user_service.get_by_email(email=email)


@router.post("/me/delete")
async def delete_user_account(
    identity_provider: Annotated[IdentityProvider, Depends(get_idp)],
    notice_service: Annotated[NoticeService, Depends()],
    nats_client: Annotated[NatsClient, Depends(get_nats_connection)],
    user_repository: Annotated[UserRepository, Depends()],
) -> None:
    identity = await identity_provider.get_identity()
    user = await user_repository.get_by_id(user_id=identity.id)
    salt = generate_user_salt(user.totp_salt)
    payload = DeleteAccountConfirmation(email=user.email,  salt=salt.hexdigest(), name=user.first_name)

    await nats_client.pub(EMAIL_DELETE_CONFIRMATION_TOPIC, payload=payload.SerializeToString())
    await notice_service.add_notice(
        user_id=user.id,
        header="Удаление аккаунта",
        msg=(
            "Вы инициировали процедуру удаления учетной записи на Ubrato.\n"
            "Чтобы удалить учетную запись, пожалуйста, подтвердите свое решение по почте"
        ),
        href=None,
        href_text=None,
        href_color=None,
    )


@router.post("/me/confirm-delete")
async def confirm_user_account_deletion(
    data: DeleteAccountRequest,
    user_service: Annotated[UserService, Depends()],
    user_repo: Annotated[UserRepository, Depends()],
) -> None:
    user = await user_repo.get_by_email(data.email)
    salt = generate_user_salt(user.totp_salt)
    if data.code != salt.hexdigest():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=get_config().localization.config["errors"]["expired_delete_account_code"],
        )

    await user_service.delete_user(user.id)
