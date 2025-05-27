"""Increate "totp_salt" length to 32 char

Revision ID: 5b3e215ccaea
Revises: 6124abe53c8d
Create Date: 2025-05-27 20:12:08.419900

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "5b3e215ccaea"
down_revision: str | None = "6124abe53c8d"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column(
        "users", "totp_salt", existing_type=sa.VARCHAR(length=16), type_=sa.String(length=32), existing_nullable=False
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.alter_column(
        "users", "totp_salt", existing_type=sa.String(length=32), type_=sa.VARCHAR(length=16), existing_nullable=False
    )
