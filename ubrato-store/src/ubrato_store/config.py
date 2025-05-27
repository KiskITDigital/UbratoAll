import os


class Config:
    class S3:
        FOLDER: str = os.getenv("STORAGE_FOLDER", "/files/")

    class JWT:
        secret: str = os.getenv("JWT_SECRET", "secret")
        time_live: int = int(os.getenv("JWT_TIME_LIVE", 24))

    class Role:
        super_admin = 1 << 7
        admin = 1 << 6
        manager = 1 << 5

        guest = 1 << 0


config = Config()


def get_config() -> Config:
    return config
