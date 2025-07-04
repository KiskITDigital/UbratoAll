package command

import (
	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/email"
	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/emailtemplater"
)

type SendEmailConfirmation struct {
	RecipientEmail string
	Salt           string
}

type SendEmailConfirmationHandler struct {
	emailTemplater emailtemplater.Templater
	emailClient    email.Client
}

func NewSendEmailConfirmationHandler(
	emailTemplater emailtemplater.Templater,
	emailClient email.Client,
) *SendEmailConfirmationHandler {
	return &SendEmailConfirmationHandler{emailTemplater: emailTemplater, emailClient: emailClient}
}

func (h *SendEmailConfirmationHandler) Handle(command SendEmailConfirmation) error {
	subject, body, err := h.emailTemplater.GetEmailConfirmationTemplate(emailtemplater.EmailConfirmationData{
		Salt:  command.Salt,
		Email: command.RecipientEmail,
	})
	if err != nil {
		return err
	}
	err = h.emailClient.Send(subject, []string{command.RecipientEmail}, body)
	return err
}
