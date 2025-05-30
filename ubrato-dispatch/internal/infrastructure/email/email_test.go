package email_test

import (
	"net/smtp"
	"testing"

	"git.ubrato.ru/ubrato/dispatch-service/internal/infrastructure/email"
)

type fakeAuth struct{}

func (a fakeAuth) Start(server *smtp.ServerInfo) (string, []byte, error) {
	return "", nil, nil
}

func (a fakeAuth) Next(fromServer []byte, more bool) ([]byte, error) {
	return nil, nil
}

func TestNewClient(t *testing.T) {
	cfg := email.Config{
		From:  "sender@example.com",
		Login: "user",
		Pass:  "pass",
		Host:  "smtp.example.com",
		Port:  465,
	}

	client, err := email.NewClient(cfg)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if client == nil {
		t.Fatal("expected client to be non-nil")
	}
}

func TestSend(t *testing.T) {
	cfg := email.Config{
		From:  "noreply@ubrato.ru",
		Login: "noreply@ubrato.ru",
		Pass:  "tichchkpkixglxxk",
		Host:  "smtp.yandex.ru", // Use MailHog or Mailpit for local SMTP testing
		Port:  465,
	}

	client, err := email.NewClient(cfg)
	if err != nil {
		t.Fatalf("failed to create client: %v", err)
	}

	emailTo := []string{"SamWardenSad@gmail.com"}
	subject := "Hello message"
	body := "This is a test email"

	err = client.Send(subject, emailTo, body)
	if err != nil {
		t.Errorf("Send failed: %v", err)
	}
}
