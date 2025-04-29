package models

import "errors"

var (
	ErrNotFound                    = errors.New("not found")
	ErrUserNameOrPasswordIncorrect = errors.New("username or password incorrect. try again")
	ErrConflict                    = errors.New("conflict")
	ErrTokenIsExpired              = errors.New("token TTL is expired")
)
