package emailtemplater

type RecoveryCodeData struct {
	Email string
	Name  string
	Salt  string
}

type EmailConfirmationData struct {
	Email string
	Salt  string
}

type DeleteAccountConfirmationData struct {
	Email string
	Name  string
	Salt  string
}

type Templater interface {
	GetRecoveryCodeTemplate(data RecoveryCodeData) (string, string, error)
	GetEmailConfirmationTemplate(data EmailConfirmationData) (string, string, error)
	GetDeleteAccountConfirmationTemplate(data DeleteAccountConfirmationData) (string, string, error)
}
