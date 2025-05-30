package emailtemplater

type RecoveryCodeData struct {
	Email string
	Name  string
	Salt  string
}

type ConfirmationData struct {
	Email string
	Salt  string
}

type Templater interface {
	GetRecoveryCodeTemplate(data RecoveryCodeData) (string, string, error)
	GetConfirmationTemplate(data ConfirmationData) (string, string, error)
}
