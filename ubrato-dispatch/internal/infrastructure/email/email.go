package email

import (
	"fmt"
	"mime"
	"net/mail"
	"net/smtp"
	"strings"
)

type client struct {
	auth smtp.Auth

	emailFrom string
	Host      string
	Port      uint
	useSSL    bool
	useTLS    bool
}

type Config struct {
	Host  string `env:"HOST,required"`
	Port  uint   `env:"PORT,required"`
	Login string `env:"LOGIN,required"`
	Pass  string `env:"PASS,required"`
	From  string `env:"FROM,required"`
}

func NewClient(config Config) (*client, error) {
	auth := smtp.PlainAuth("", config.Login, config.Pass, config.Host)

	return &client{
		auth:      auth,
		emailFrom: config.From,
		Host:      config.Host,
		Port:      config.Port,
		useSSL:    true, // Set to true if you want to use SSL
		useTLS:    true, // Set to true if you want to use STARTTLS
	}, nil
}

func (c *client) Send(subject string, emailTo []string, body string) error {
	from := mail.Address{Name: "noreply", Address: c.emailFrom}

	headers := buildHeaders(from, emailTo, subject)
	message := buildMessage(headers, body)

	err := c.SendMail(c.auth, from.Address, emailTo, []byte(message))
	return err
}

func (c *client) SendMail(auth smtp.Auth, from string, emailReceivers []string, message []byte) error {
	addr := fmt.Sprintf("%s:%d", c.Host, c.Port)
	return smtp.SendMail(addr, auth, from, emailReceivers, message)
}

func buildHeaders(from mail.Address, to []string, subject string) map[string]string {
	subject = mime.BEncoding.Encode("UTF-8", "Подтверждение почты")

	headers := make(map[string]string)
	headers["From"] = from.String()
	headers["To"] = strings.Join(to, ", ")
	headers["Subject"] = subject + ""
	headers["MIME-version"] = "1.0"
	headers["Content-Type"] = "text/html; charset=\"UTF-8\""
	return headers
}

func buildMessage(headers map[string]string, body string) string {
	var message strings.Builder
	for k, v := range headers {
		message.WriteString(fmt.Sprintf("%s: %s\r\n", k, v))
	}
	message.WriteString("\r\n")
	message.WriteString(body)
	return message.String()
}
