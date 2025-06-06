package command

import (
	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/email"
	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/emailtemplater"
)

type SendEmailDeleteAccountConfirmation struct {
	RecipientEmail string
	RecipientName  string
	Salt           string
}

type SendEmailDeleteAccountConfirmationHandler struct {
	emailTemplater emailtemplater.Templater
	emailClient    email.Client
}

func NewSendEmailDeleteAccountConfirmationHandler(
	emailTemplater emailtemplater.Templater,
	emailClient email.Client,
) *SendEmailDeleteAccountConfirmationHandler {
	return &SendEmailDeleteAccountConfirmationHandler{emailTemplater: emailTemplater, emailClient: emailClient}
}

func (h *SendEmailDeleteAccountConfirmationHandler) Handle(command SendEmailDeleteAccountConfirmation) error {
	subject, body, err := h.emailTemplater.GetDeleteAccountConfirmationTemplate(emailtemplater.DeleteAccountConfirmationData{
		Salt:  command.Salt,
		Name:  command.RecipientName,
		Email: command.RecipientEmail,
	})
	if err != nil {
		return err
	}
	err = h.emailClient.Send(subject, []string{command.RecipientEmail}, body)
	return err
}
