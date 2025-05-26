from fastapi import Depends
from typesense.client import Client

from ubrato_back.infrastructure.typesense.client import get_db_connection
from ubrato_back.infrastructure.typesense.schemas import TypesenseTender


class TenderIndex:
    db: Client

    def __init__(self, db: Client = Depends(get_db_connection)) -> None:
        self.db = db

    def save(self, tender: TypesenseTender, services: list[int], objects: list[int]) -> None:
        self.db.collections["tender_index"].documents.create(tender.__dict__)
        for service in services:
            self.db.collections["tender_service"].documents.create(
                {"tender_id": tender.id, "service_type_id": str(service)}
            )

        for object in objects:
            self.db.collections["tender_object"].documents.create(
                {"tender_id": tender.id, "object_type_id": str(object)}
            )

    def update(self, tender: TypesenseTender, services: list[int], objects: list[int]) -> None:
        self.db.collections["tender_index"].documents.update(tender.__dict__, {"filter_by": f"id:{tender.id}"})

        self.db.collections["tender_service"].documents.delete({"filter_by": f"id:{tender.id}"})
        self.db.collections["tender_object"].documents.delete({"filter_by": f"id:{tender.id}"})

        for service in services:
            self.db.collections["tender_service"].documents.create({"tender_id": tender.id, "service_type_id": service})

        for object in objects:
            self.db.collections["tender_object"].documents.create(
                {"tender_id": tender.id, "object_type_id": str(object)}
            )

    def update_verified_status(self, tender_id: int, verified: bool) -> None:
        self.db.collections["tender_index"].documents.update({"verified": verified}, {"filter_by": f"id:{tender_id}"})
