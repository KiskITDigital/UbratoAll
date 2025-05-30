package handler

import (
	"context"

	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/email"
	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/emailtemplater"
)

type Collection struct {
	emailClient    email.Client
	ctx            context.Context
	emailTemplater emailtemplater.Templater
}

func NewCollection(ctx context.Context, emailClient email.Client, emailTemplater emailtemplater.Templater) *Collection {
	return &Collection{
		ctx:            ctx,
		emailClient:    emailClient,
		emailTemplater: emailTemplater,
	}
}

// func (c *Collection) Start() (err error) {
// 	c.emailQueueSub, err = s.broker.Subscribe(s.ctx, broker.SendEmailStream, s.MainHandler)

// 	if err != nil {
// 		return err
// 	}

// 	return nil
// }
