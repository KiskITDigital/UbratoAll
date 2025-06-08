from dataclasses import dataclass


@dataclass(frozen=True)
class DeleteAccountRequest:
    email: str
    code: str
