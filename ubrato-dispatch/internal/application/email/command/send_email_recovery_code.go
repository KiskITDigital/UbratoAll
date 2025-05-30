package command

import "git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/email"
import "git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/emailtemplater"

type SendEmailRecoveryCode struct {
	RecipientEmail string
	RecipientName  string
	Salt           string
}

type SendEmailRecoveryCodeHandler struct {
	emailTemplater emailtemplater.Templater
	emailClient    email.Client
}

func NewSendEmailRecoveryCodeHandler(
	emailTemplater emailtemplater.Templater,
	emailClient email.Client,
) *SendEmailRecoveryCodeHandler {
	return &SendEmailRecoveryCodeHandler{emailTemplater: emailTemplater, emailClient: emailClient}
}

func (h *SendEmailRecoveryCodeHandler) Handle(command SendEmailRecoveryCode) error {
	subject, body, err := h.emailTemplater.GetRecoveryCodeTemplate(emailtemplater.RecoveryCodeData{
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
