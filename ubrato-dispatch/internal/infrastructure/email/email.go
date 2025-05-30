package email

import (
	"crypto/tls"
	"fmt"
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
	// return smtp.SendMail(addr, auth, from, emailReceivers, message)
	if c.useSSL {
		tlsconfig := &tls.Config{
			ServerName:         c.Host,
		}

		conn, err := tls.Dial("tcp", addr, tlsconfig)
		if err != nil {
			return fmt.Errorf("failed to connect via SSL: %w", err)
		}
		defer conn.Close()

		client, err := smtp.NewClient(conn, c.Host)
		if err != nil {
			return fmt.Errorf("failed to create SMTP client: %w", err)
		}
		defer client.Quit()

		if err = client.Auth(auth); err != nil {
			return fmt.Errorf("auth failed: %w", err)
		}
		if err = client.Mail(from); err != nil {
			return err
		}
		for _, to := range emailReceivers {
			if err = client.Rcpt(to); err != nil {
				return err
			}
		}
		w, err := client.Data()
		if err != nil {
			return err
		}
		_, err = w.Write([]byte(message))
		if err != nil {
			return err
		}
		return w.Close()
	}

	// Non-SSL connection, optionally with STARTTLS
	client, err := smtp.Dial(addr)
	if err != nil {
		return fmt.Errorf("failed to dial: %w", err)
	}
	defer client.Quit()

	if c.useTLS {
		tlsconfig := &tls.Config{
			ServerName:         c.Host,
		}
		if err = client.StartTLS(tlsconfig); err != nil {
			return fmt.Errorf("starttls failed: %w", err)
		}
	}

	if err = client.Auth(auth); err != nil {
		return fmt.Errorf("auth failed: %w", err)
	}
	if err = client.Mail(from); err != nil {
		return err
	}
	for _, to := range emailReceivers {
		if err = client.Rcpt(to); err != nil {
			return err
		}
	}
	w, err := client.Data()
	if err != nil {
		return err
	}
	_, err = w.Write([]byte(message))
	if err != nil {
		return err
	}
	return w.Close()
}

func buildHeaders(from mail.Address, to []string, subject string) map[string]string {
	headers := make(map[string]string)
	headers["From"] = from.String()
	headers["To"] = strings.Join(to, ", ")
	headers["Subject"] = subject
	return headers
}

func buildMessage(headers map[string]string, body string) []byte {
	var message strings.Builder
	for k, v := range headers {
		message.WriteString(fmt.Sprintf("%s: %s\r\n", k, v))
	}
	message.WriteString("\r\n")
	message.WriteString(body)
	return []byte(message.String())
}
