import os

import uvicorn

from ubrato_store.exceptions import (
    exception_handler,
    request_validation_exception_handler,
)
from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from ubrato_store.routers import s3

app = FastAPI(
    title="Ubrato store API",
    version="0.1.0",
    servers=[
        {
            "url": "https://cdn.ubrato.ru",
            "description": "prod environment",
        },
        {
            "url": "https://localhost:8001",
            "description": "local environment",
        },
    ],
)

origins = [
    "https://cdn.ubrato.ru",
    "http://ubrato.ru",
    "https://ubrato.ru",
    "http://dev.ubrato.ru",
    "https://dev.ubrato.ru",
    "http://localhost",
    "http://localhost:5174",
    "http://localhost:5173",
    "http://127.0.0.1:8001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


app.include_router(s3.router)

app.add_exception_handler(
    RequestValidationError,
    request_validation_exception_handler,  # type: ignore
)

app.add_exception_handler(
    HTTPException,
    exception_handler,  # type: ignore
)


def main() -> None:
    host = os.environ["API_HOST"]
    port = int(os.environ["API_PORT"])
    uvicorn.run(app, host=host, port=port)


if __name__ == "__main__":
    main()
