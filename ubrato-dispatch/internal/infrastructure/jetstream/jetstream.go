package jetstream

import (
	"context"
	"fmt"
	"log/slog"

	"git.ubrato.ru/ubrato/dispatch-service/internal/interfaces/broker"
	"github.com/nats-io/nats.go"
	"github.com/nats-io/nats.go/jetstream"
)

type Config struct {
	Host string `env:"HOST,required"`
	Port int    `env:"PORT,required"`
}

type JetStream struct {
	conn   jetstream.JetStream
	logger *slog.Logger
}

func New(config Config, logger *slog.Logger) (*JetStream, error) {
	conn, err := nats.Connect(fmt.Sprintf("%s:%d", config.Host, config.Port))
	if err != nil {
		return nil, err
	}

	js, err := jetstream.New(conn)
	if err != nil {
		return nil, err
	}

	return &JetStream{
		conn:   js,
		logger: logger,
	}, nil
}

func (j *JetStream) Subscribe(ctx context.Context, streamName string, handleFunc broker.MsgHandler) (broker.Subscription, error) {
	stream, err := j.conn.Stream(ctx, streamName)
	if err != nil {
		return nil, err
	}

	cons, err := stream.CreateOrUpdateConsumer(ctx, jetstream.ConsumerConfig{})
	if err != nil {
		return nil, err
	}

	sub, err := cons.Consume(func(msg jetstream.Msg) {
		err := handleFunc(&broker.Message{
			Data:  msg.Data(),
			Topic: msg.Subject(),
		})

		if err != nil {
			j.logger.Error("Error while consume message", "error", err)
			return
		}
		msg.Ack()
	})
	if err != nil {
		return nil, err
	}
	return sub, nil
}

// func (j *JetStream) PublishProto(ctx context.Context, topic string, msg protoreflect.ProtoMessage) error {
// 	data, err := proto.Marshal(msg)
// 	if err != nil {
// 		return err
// 	}

// 	_, err = j.conn.Publish(ctx, topic, data)
// 	if err != nil {
// 		return err
// 	}

// 	return nil
// }
