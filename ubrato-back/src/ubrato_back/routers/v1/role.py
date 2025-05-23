from fastapi import APIRouter, Depends

from ubrato_back.routers.v1.dependencies import authorized

router = APIRouter(
    prefix="/v1/role",
    tags=["role"],
    dependencies=[Depends(authorized)],
)
