import { object, string } from 'yup';

export const loginSchema = object().shape({
  email: string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      { message: 'Некорректный e-mail' }
    )
    .required('Введите e-mail'),
  password: string().required('Введите пароль'),
});
