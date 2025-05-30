package emailtemplater

import (
	"path"
	"strings"
	"text/template"

	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/emailtemplater"
)

type Config struct {
	RootDir string `env:"ROOT_DIR,required"`
}

type templater struct {
	rootDir string
}

func New(config Config) emailtemplater.Templater {
	return &templater{rootDir: config.RootDir}
}

func (t *templater) GetRecoveryCodeTemplate(data emailtemplater.RecoveryCodeData) (string, string, error) {
	template, err := template.ParseFiles(path.Join(t.rootDir, "resetPassword.templ"))
	if err != nil {
		return "", "", err
	}
	body := new(strings.Builder)
	template.Execute(body, data)

	subject := "Сброс пароля"
	return subject, body.String(), nil
}

func (t *templater) GetConfirmationTemplate(data emailtemplater.ConfirmationData) (string, string, error) {
	template, err := template.ParseFiles(path.Join(t.rootDir, "emailConfirm.templ"))
	if err != nil {
		return "", "", err
	}
	body := new(strings.Builder)
	template.Execute(body, data)

	subject := "Подтвеждение почты"
	return subject, body.String(), nil
}
