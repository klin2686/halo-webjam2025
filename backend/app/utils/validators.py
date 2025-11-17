from typing import Tuple

from email_validator import EmailNotValidError, validate_email


def validate_email_address(email: str) -> Tuple[bool, str, str | None]:
    """Validate email address format and domain"""
    try:
        valid = validate_email(email, check_deliverability=True)
        normalized_email = valid.normalized
        return True, normalized_email, None
    except EmailNotValidError as e:
        return False, email.lower().strip(), str(e)


def validate_password_strength(password: str) -> Tuple[bool, str | None]:
    """Validate password meets strength requirements"""
    if len(password) < 8:
        return False, 'Password must be at least 8 characters long'

    if len(password) > 128:
        return False, 'Password must be less than 128 characters'

    return True, None
