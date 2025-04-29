package sessions

import (
	"git.ubrato.ru/ubrato/admin/internal/auth"
	"git.ubrato.ru/ubrato/admin/internal/repository/postgres"
	"git.ubrato.ru/ubrato/admin/plugins/sessions/handler"
	"git.ubrato.ru/ubrato/admin/plugins/sessions/provider"
	"git.ubrato.ru/ubrato/admin/plugins/sessions/storage"
)

func InitModule(authorizer *auth.TokenAuthorizer, repo *postgres.Repo) *handler.Handler {
	return handler.NewHandler(provider.NewProvider(authorizer, storage.NewStore(repo)))
}
