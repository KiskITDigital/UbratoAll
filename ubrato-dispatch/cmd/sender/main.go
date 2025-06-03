package main

import (
	"fmt"

	"git.ubrato.ru/ubrato/dispatch-service/internal/application/email/command"
	"git.ubrato.ru/ubrato/dispatch-service/internal/config"
	"git.ubrato.ru/ubrato/dispatch-service/internal/infrastructure/email"
	"git.ubrato.ru/ubrato/dispatch-service/internal/infrastructure/emailtemplater"
)

func SendTestEmail() {
	config := email.Config{
		Host:  "smtp.yandex.ru",
		Port:  465,
		Login: "noreply@ubrato.ru",
		Pass:  "..",
		From:  "noreply@ubrato.ru",
	}
	emailClient, err := email.NewClient(config)
	if err != nil {
		panic(err)
	}
	subject := "Test Email"
	body := "This is a test email sent from the email client."
	recipientEmail := []string{"SamWardenSad@gmail.com"}

	err = emailClient.Send(subject, recipientEmail, body)
	if err != nil {
		fmt.Printf("Failed to send email: %v\n", err)
	} else {
		fmt.Println("Email sent successfully!")
	}
}

func SendEmailConfirmation() {
	config, err := config.Load()
	if err != nil {
		panic(err)
	}
	emailTemplater := emailtemplater.New(config.EmailTemplater)
	emailClient, err := email.NewClient(config.Email)
	if err != nil {
		panic(err)
	}

	handler := command.NewSendEmailConfirmationHandler(emailTemplater, emailClient)
	err = handler.Handle(command.SendEmailConfirmation{
		RecipientEmail: "SamWardenSad@gmail.com",
		Salt:           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl81OTY5N2M0Yy0yYWEzLTRlM2QtYjRhYy0yYWY1YTBlYmQ2YzQiLCJleHAiOjE3NDg4MDM0NjZ9.N49v9jsIncl7IUb64iKKpOTB5OdVJ7EE9ZF66xMo-Pg",
	})
	if err != nil {
		fmt.Printf("Failed to send email: %v\n", err)
	} else {
		fmt.Println("Email sent successfully!")
	}
}

func main() {
	// SendTestEmail()
	SendEmailConfirmation()
}
