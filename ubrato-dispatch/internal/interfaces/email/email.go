package email

type Client interface {
	Send(subject string, emailTo []string, body string) error
}
