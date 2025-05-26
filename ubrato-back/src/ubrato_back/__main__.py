from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager
from typing import Any

import uvicorn
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

from ubrato_back.infrastructure.broker import get_nats_connection
from ubrato_back.exceptions import (
    AuthException,
    ServiceException,
    auth_exception_handler,
    internal_exception_hander,
    repository_exception_handler,
    request_validation_exception_handler,
    service_exception_handler,
)
from ubrato_back.infrastructure import redis, typesense
from ubrato_back.infrastructure.postgres.repos.exceptions import RepositoryException
from ubrato_back.presentation.api.routers.v1 import auth, health, manager, organizations, questionnaire, role, suggest, \
    tender, \
    users, \
    verification


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[Any, Any]:
    nats_conn = get_nats_connection()
    typesense.get_db_connection()
    await redis.get_db_connection()
    await nats_conn.connect()
    yield
    await nats_conn.close()


app = FastAPI(
    title="Ubrato API",
    version="0.1.0",
    servers=[
        {
            "url": "https://api.ubrato.ru/",
            "description": "development environment",
        },
    ],
    lifespan=lifespan,
)

origins = [
    "http://ubrato.ru",
    "https://ubrato.ru",
    "http://dev.ubrato.ru",
    "https://dev.ubrato.ru",
    "http://stage.ubrato.ru",
    "https://stage.ubrato.ru",
    "http://localhost",
    "http://localhost:5174",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(health.router)
app.include_router(role.router)
app.include_router(manager.router)
app.include_router(tender.router)
app.include_router(suggest.router)
app.include_router(questionnaire.router)
app.include_router(verification.router)
app.include_router(organizations.router)

app.add_exception_handler(
    RequestValidationError,
    request_validation_exception_handler,  # type: ignore
)
app.add_exception_handler(
    ServiceException,
    service_exception_handler,  # type: ignore
)
app.add_exception_handler(
    RepositoryException,
    repository_exception_handler,  # type: ignore
)
app.add_exception_handler(
    AuthException,
    auth_exception_handler,  # type: ignore
)
app.add_exception_handler(Exception, internal_exception_hander)


def main() -> None:
    uvicorn.run(app, host="0.0.0.0")


if __name__ == "__main__":
    main()
