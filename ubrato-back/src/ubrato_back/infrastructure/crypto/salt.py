from hashlib import md5

import pyotp


def generate_user_salt(totp_salt: str, interval: int = 1800):
    totp = pyotp.TOTP(totp_salt, interval=interval)

    salt = md5()
    salt.update(totp.now().encode())
    return salt
