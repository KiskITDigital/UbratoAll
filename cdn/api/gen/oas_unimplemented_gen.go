// Code generated by ogen, DO NOT EDIT.

package api

import (
	"context"

	ht "github.com/ogen-go/ogen/http"
)

// UnimplementedHandler is no-op Handler which returns http.ErrNotImplemented.
type UnimplementedHandler struct{}

var _ Handler = UnimplementedHandler{}

// FileIDGet implements GET /file/{id} operation.
//
// Получает файл из MinIO по уникальному идентификатору.
//
// GET /file/{id}
func (UnimplementedHandler) FileIDGet(ctx context.Context, params FileIDGetParams) (r FileIDGetRes, _ error) {
	return r, ht.ErrNotImplemented
}

// FileIDHead implements HEAD /file/{id} operation.
//
// Получает мету файла из MinIO по уникальному
// идентификатору.
//
// HEAD /file/{id}
func (UnimplementedHandler) FileIDHead(ctx context.Context, params FileIDHeadParams) (r FileIDHeadRes, _ error) {
	return r, ht.ErrNotImplemented
}

// UploadPost implements POST /upload operation.
//
// Загружает файл в MinIO с использованием JWT токена для
// аутентификации.
//
// POST /upload
func (UnimplementedHandler) UploadPost(ctx context.Context, req *UploadPostReq, params UploadPostParams) (r UploadPostRes, _ error) {
	return r, ht.ErrNotImplemented
}
