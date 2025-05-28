from ubrato_back.application.user.dto import UserMeWithOrg, UserOrganizationInfoDTO
from ubrato_back.infrastructure.postgres import models


def convert_db_row_to_user_me_with_org_dto(user_data: models.User) -> UserMeWithOrg:
    return UserMeWithOrg(
        id=user_data.id,
        email=user_data.email,
        phone=user_data.phone,
        first_name=user_data.first_name,
        middle_name=user_data.middle_name,
        last_name=user_data.last_name,
        avatar=user_data.avatar,
        verified=user_data.verified,
        email_verified=user_data.email_verified,
        role=user_data.role,
        is_contractor=user_data.is_contractor,
        organization=UserOrganizationInfoDTO(
            id=user_data.organization.id,
            short_name=user_data.organization.short_name,
            inn=user_data.organization.inn,
            okpo=user_data.organization.okpo,
            ogrn=user_data.organization.ogrn,
            kpp=user_data.organization.kpp,
        ),
        created_at=user_data.created_at,
    )
