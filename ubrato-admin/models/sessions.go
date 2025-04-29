package models

import "database/sql"

type Session struct {
	ID                    int64          `db:"id" json:"id"`
	UserID                int64          `db:"user_id" json:"user_id"`
	RefreshToken          string         `db:"refresh_token" json:"refresh_token"`
	IP                    sql.NullString `db:"ip_address" json:"ip,omitempty"`
	CreatedAt             int64          `db:"created_at" json:"created_at,omitempty"`
	RefreshTokenExpiredAt int64          `db:"refresh_token_expired_at" json:"refresh_token_expired_at"`
}

type Token struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type UserLogin struct {
	Login    string `json:"login,omitempty"`
	Email    string `json:"email,omitempty"`
	Password string `json:"password"`
}
