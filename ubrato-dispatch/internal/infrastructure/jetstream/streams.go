package jetstream

import (
	"context"

	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/broker"
	"github.com/nats-io/nats.go/jetstream"
)

func CreateStreams(ctx context.Context, js *JetStream) error {
	_, err := js.conn.CreateOrUpdateStream(ctx, jetstream.StreamConfig{
		Name:      broker.SendEmailStream,
		Retention: jetstream.WorkQueuePolicy,
		Subjects:  []string{broker.EmailResetPassTopic, broker.ConfirmEmailTopic, broker.EmailDeleteConfirmationTopic},
	})
	return err
}
