from datetime import datetime

from dadata import DadataAsync

from ubrato_back.infrastructure.dadata.models import Organization


class DadataClient:
    def __init__(self, api_key: str) -> None:
        self._dadata = DadataAsync(api_key)

    async def get_organization_by_inn(self, inn: str) -> Organization | None:
        organizations = await self.get_organizations_by_inn(inn)

        if len(organizations) == 0:
            return None
        return organizations[0]

    async def get_organizations_by_inn(self, inn: str, count: int = 10) -> list[Organization]:
        if len(inn) != 10:
            raise ValueError("INN must be 10 characters long")

        result = await self._dadata.find_by_id(name="party", query=inn, count=count)

        organizations = [
            Organization(
                inn=inn,
                brand_name=org["data"]["name"]["short"],
                full_name=org["data"]["name"]["full_with_opf"],
                short_name=org["data"]["name"]["short_with_opf"],
                okpo=org["data"]["okpo"],
                ogrn=org["data"]["ogrn"],
                kpp=org["data"]["kpp"],
                tax_code=int(org["data"]["address"]["data"]["tax_office"]),
                address=org["data"]["address"]["unrestricted_value"],
                registration_date=datetime.fromtimestamp(org["data"]["state"]["registration_date"] // 1000),
                director=org["data"]["management"]["name"],
            ) for org in result
        ]
        return organizations
