package broker

import (
	"context"
)

type Message struct {
	Data  []byte
	Topic string
}

type Subscription interface {
	Stop()
}

type MsgHandler func(msg *Message) error

type Broker interface {
	// PublishProto(ctx context.Context, topic string, msg protoreflect.ProtoMessage) error
	Subscribe(ctx context.Context, topic string, handleFunc MsgHandler) (Subscription, error)
}
