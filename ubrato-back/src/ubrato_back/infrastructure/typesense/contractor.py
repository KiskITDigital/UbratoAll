from fastapi import Depends
from typesense.client import Client

from ubrato_back.infrastructure.typesense.client import get_db_connection
from ubrato_back.infrastructure.typesense.schemas import (
    TypesenseContractor,
    TypesenseContractorService,
)


class ContractorIndex:
    db: Client

    def __init__(self, db: Client = Depends(get_db_connection)) -> None:
        self.db = db

    def save(
        self,
        contractor: TypesenseContractor,
        cities: list[int],
        objects: list[int],
        services: list[TypesenseContractorService],
    ) -> None:
        self.db.collections["contractor_index"].documents.create(contractor.model_dump())
        for city in cities:
            self.db.collections["contractor_city"].documents.create(
                {"contractor_id": contractor.id, "city_id": str(city)}
            )

        for object in objects:
            self.db.collections["contractor_object"].documents.create(
                {"contractor_id": contractor.id, "object_type_id": str(object)}
            )

        for service in services:
            self.db.collections["contractor_object"].documents.create(service.model_dump())

    def update_locations(
        self,
        contractor_id: str,
        locations: list[int],
    ) -> None:
        self.db.collections["contractor_city"].documents.delete({"filter_by": f"contractor_id:{contractor_id}"})
        for location in locations:
            self.db.collections["contractor_city"].documents.create(
                {"contractor_id": contractor_id, "city_id": str(location)}
            )

    def update_objects(
        self,
        contractor_id: str,
        objects: list[int],
    ) -> None:
        self.db.collections["contractor_object"].documents.delete({"filter_by": f"contractor_id: {contractor_id}"})
        for object in objects:
            self.db.collections["contractor_object"].documents.create(
                {
                    "contractor_id": str(contractor_id),
                    "object_type_id": str(object),
                }
            )

    def update_services(
        self,
        contractor_id: str,
        services: list[TypesenseContractorService],
    ) -> None:
        self.db.collections["contractor_service"].documents.delete({"filter_by": f"contractor_id: {contractor_id}"})
        for service in services:
            self.db.collections["contractor_service"].documents.create(service.model_dump())
