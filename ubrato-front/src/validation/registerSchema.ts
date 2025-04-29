import { AnySchema, boolean, object, ref, string } from 'yup';
import { RegisterFormValuesT } from '../types/app';

export const registerSchema = object().shape<Record<keyof RegisterFormValuesT, AnySchema>>({
  inn: string().length(10, 'ИНН должен состоять из 10 символов').required('ИНН обязательно!'),
  email: string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      { message: 'Некорректный e-mail' }
    )
    .required('E-mail обязателен!'),
  phone: string().required('Телефон обязателен!'),
  password: string().min(6, 'Пароль слишком короткий').required('Введите пароль!'),
  repeatPassword: string()
    .oneOf([ref('password')], 'Пароли не совпадают')
    .required('Повторите пароль!'),
  firstName: string().required('Введите имя'),
  lastName: string().required('Введите фамилию'),
  middleName: string(),
  userAgreement: boolean().oneOf([true], 'Обязательное поле'),
  personalDataAgreement: boolean().oneOf([true], 'Обязательное поле'),
  personalDataPolicy: boolean().oneOf([true], 'Обязательное поле'),
});
