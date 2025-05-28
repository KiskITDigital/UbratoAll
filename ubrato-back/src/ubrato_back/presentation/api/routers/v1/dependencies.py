from typing import Annotated

from fastapi import Depends, Header, status

from ubrato_back.application.identity.dto import Identity
from ubrato_back.application.identity.interface.identity_provider import IdentityProvider
from ubrato_back.config import get_config
from ubrato_back.exceptions import AuthException
from ubrato_back.infrastructure.identity_provider.raw import RawIdentityProvider
from ubrato_back.schemas.jwt_user import JWTUser
from ubrato_back.services import JWTService

localization = get_config().localization.config


async def authorized(
    authorization: Annotated[str, Header()],
    jwt_service: JWTService = Depends(),
) -> None:
    jwt_service.unmarshal_jwt(authorization)


async def get_user(
    authorization: Annotated[str, Header()],
    jwt_service: JWTService = Depends(),
) -> JWTUser:
    user = jwt_service.unmarshal_jwt(authorization)
    return user


async def get_idp(
    user: Annotated[JWTUser, Depends(get_user)],
) -> IdentityProvider:
    identity_provider = RawIdentityProvider(
        Identity(
            id=user.id,
            org_id=user.org_id,
            role=user.role,
        )
    )
    return identity_provider


# TODO: rename and make for all roles
async def is_admin(
    authorization: Annotated[str, Header()],
    jwt_service: JWTService = Depends(),
) -> None:
    user = jwt_service.unmarshal_jwt(authorization)

    if user.role < get_config().role.admin:
        raise AuthException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=localization["errors"]["no_access"],
        )


async def is_creator_or_manager(
    user_id: str,
    user: JWTUser,
) -> None:
    if user.role < get_config().role.manager and user.id != user_id:
        raise AuthException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=localization["errors"]["no_access"],
        )
