from fastapi import HTTPException


class ServiceException(HTTPException):
    status_code: int
    detail: str

    def __init__(self, **kwargs):
        super().__init__(**kwargs)


class AuthException(HTTPException):
    status_code: int
    detail: str

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
