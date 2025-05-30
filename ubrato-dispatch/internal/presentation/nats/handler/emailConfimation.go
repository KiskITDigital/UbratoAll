package handler

import (
	"git.ubrato.ru/ubrato/dispatch-service/internal/application/email/command"
	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/broker"
	"git.ubrato.ru/ubrato/dispatch-service/internal/pb/models/v1"
	"google.golang.org/protobuf/proto"
)

func (c *Collection) emailConfirmHandler(msg *broker.Message) error {
	emailConfirmation := &models.EmailConfirmation{}
	if err := proto.Unmarshal(msg.Data, emailConfirmation); err != nil {
		return err
	}

	requestCommand := command.SendEmailConfirmation{
		RecipientEmail: emailConfirmation.Email,
		Salt:           emailConfirmation.Salt,
	}
	handler := command.NewSendEmailConfirmationHandler(c.emailTemplater, c.emailClient)
	err := handler.Handle(requestCommand)
	return err
}
