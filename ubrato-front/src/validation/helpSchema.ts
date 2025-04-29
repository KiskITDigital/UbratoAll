import { boolean, object, string } from 'yup';

export const helpSchema = object().shape({
  name: string().required('Это обязательное поле!'),
  phone: string().required('Телефон обязателен!'),
  confirm: boolean().oneOf([true], 'Обязательное поле'),
});
