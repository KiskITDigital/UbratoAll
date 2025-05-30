package handler

import (
	"git.ubrato.ru/ubrato/dispatch-service/internal/application/email/command"
	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/broker"
	"git.ubrato.ru/ubrato/dispatch-service/internal/pb/models/v1"
	"google.golang.org/protobuf/proto"
)

func (c *Collection) resetPassHandler(msg *broker.Message) error {
	passwordRecovery := &models.PasswordRecovery{}
	if err := proto.Unmarshal(msg.Data, passwordRecovery); err != nil {
		return err
	}

	requestCommand := command.SendEmailRecoveryCode{
		RecipientEmail: passwordRecovery.Email,
		Salt:           passwordRecovery.Salt,
		RecipientName:  passwordRecovery.Name,
	}
	handler := command.NewSendEmailRecoveryCodeHandler(c.emailTemplater, c.emailClient)
	err := handler.Handle(requestCommand)
	return err
}
