package handler

import (
	"git.ubrato.ru/ubrato/dispatch-service/internal/application/email/command"
	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/broker"
	"git.ubrato.ru/ubrato/dispatch-service/internal/pb/models/v1"
	"google.golang.org/protobuf/proto"
)

func (c *Collection) emailDeleteConfirmationHandler(msg *broker.Message) error {
	deleteAccountConfirmation := &models.DeleteAccountConfirmation{}
	if err := proto.Unmarshal(msg.Data, deleteAccountConfirmation); err != nil {
		return err
	}

	requestCommand := command.SendEmailDeleteAccountConfirmation{
		RecipientEmail: deleteAccountConfirmation.Email,
		RecipientName:  deleteAccountConfirmation.Name,
		Salt:           deleteAccountConfirmation.Salt,
	}
	handler := command.NewSendEmailDeleteAccountConfirmationHandler(c.emailTemplater, c.emailClient)
	err := handler.Handle(requestCommand)
	return err
}
