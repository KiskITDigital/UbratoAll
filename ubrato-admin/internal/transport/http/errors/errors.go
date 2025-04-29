package http

import (
	"fmt"
)

type HandlerErrorCode string

func (e HandlerErrorCode) String() string { return string(e) }

const (
	ErrAppCode      HandlerErrorCode = "ERR_APP_CODE"
	ErrInvalidInput HandlerErrorCode = "ERR_INVALID_INPUT"
	ErrNotFound     HandlerErrorCode = "NOT_FOUND"
	ErrForbidden    HandlerErrorCode = "ERR_FORBIDDEN"
)

type HandlerError struct {
	code           string
	title          string
	detail         string
	httpStatusCode int
}

func NewHandlerError(httpCode int, code HandlerErrorCode, title, err string) HandlerError {
	return HandlerError{
		code:           string(code),
		title:          title,
		detail:         err,
		httpStatusCode: httpCode,
	}
}

func (he HandlerError) Error() string {
	return fmt.Sprintf("%s: %s: %s", he.code, he.title, he.detail)
}

func (he HandlerError) Code() string {
	return he.code
}

func (he HandlerError) Title() string {
	return he.title
}

func (he HandlerError) Detail() string {
	return he.detail
}

func (he HandlerError) StatusCode() int {
	return he.httpStatusCode
}
