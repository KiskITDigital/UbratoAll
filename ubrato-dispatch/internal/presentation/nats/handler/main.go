package handler

import (
	"errors"

	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/broker"
)

func (c *Collection) MainHandler(msg *broker.Message) (err error) {
	switch msg.Topic {
	case broker.EmailResetPassTopic:
		err = c.resetPassHandler(msg)
	case broker.ConfirmEmailTopic:
		err = c.emailConfirmHandler(msg)
	default:
		err = errors.New("topic not found")
	}
	if err != nil {
		return err
	}
	return nil
}
