import requests
from pydantic import BaseModel


class EgrulCompany(BaseModel):
    name: str
    director: str
    inn: str
    kpp: str
    ogrn: str
    registration_date: str
    region: str


class EgrulClient:
    def __init__(self) -> None:
        self._base_url = "https://egrul.nalog.ru/"

    def get_org_by_query(self, query: str) -> list[EgrulCompany]:
        form_data = {
            "vyp3CaptchaToken": "",
            "page": "",
            "query": query,
            "region": "",
            "PreventChromeAutocomplete": "",
        }

        response = requests.post(self._base_url, data=form_data)

        response = requests.get(self._base_url + "search-result/" + response.json()["t"])

        companies: list[EgrulCompany] = []

        for company_data in response.json()["rows"]:
            company = EgrulCompany(
                name=company_data.get("c", ""),
                director=company_data.get("g", ""),
                inn=company_data.get("i", ""),
                kpp=company_data.get("p", ""),
                ogrn=company_data.get("o", ""),
                registration_date=company_data.get("r", ""),
                region=company_data.get("rn", ""),
            )
            companies.append(company)

        return companies
