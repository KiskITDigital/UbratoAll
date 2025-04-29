import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { LoginFormValuesT } from '@/types/app';
import axios, { AxiosError } from 'axios';
import styles from './loginpage.module.css';
import { Input } from '@nextui-org/react';
import { useUserInfoStore } from '@/store/userInfoStore';
import { loginSchema } from '@/validation/loginSchema';
import { Link, useNavigate, useNavigationType } from 'react-router-dom';
import { login } from '@/api';

axios.defaults.withCredentials = true;

export const LoginPage: FC = () => {
  const initialValues: LoginFormValuesT = {
    email: '',
    password: '',
  };

  const [errorMsg, setErrorMsg] = useState('');

  const userInfoStore = useUserInfoStore();
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const formik = useFormik<LoginFormValuesT>({
    initialValues: initialValues,
    onSubmit(values) {
      const parameters = {
        email: values.email,
        password: values.password,
      };
      (async () => {
        setIsLoading(true);
        try {
          const res = await login(parameters);
          localStorage.setItem('token', res.data.access_token);
          userInfoStore.isLoggedIn = true
          if (res.data.access_token) {
            await userInfoStore.fetchUser(res.data.access_token);
            if (!userInfoStore.error) {
              navigate('/profile');
            }
          }
        } catch (e) {
          // console.log(e, '1');
          if (e instanceof AxiosError) {
            if (e.response?.status === 401) {
              setErrorMsg('incorrect password');
            } else if (e.response?.status === 404) {
              setErrorMsg('email busy');
            } else {
              setErrorMsg('Что-то пошло не так');
            }
          }
        } finally {
          setIsLoading(false);
        }
      })();
    },
    validationSchema: loginSchema,
  });

  const itemClasses = {
    input: styles.input,
    innerWrapper: styles.innerWrapper,
    base: styles.base,
    label: styles.label,
    errorMessage: styles.errorMessage,
    helperWrapper: styles.helperWrapper,
    inputWrapper: styles.inputWrapper
  };

  const navigationType = useNavigationType()
  useEffect(() => {
    if (userInfoStore.isLoggedIn) {
      navigate(-1);
    }
    else
      if (navigationType === "POP")
        navigate(-1)
  }, [navigate, userInfoStore.isLoggedIn]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (userInfoStore.isLoggedIn) {
    return <div></div>;
  }

  return (
    <div className={`container ${styles.container}`}>
      <div>
        <h1 className={styles.header}>Вход</h1>
        <p className={'ml-[15px] pt-[10px] text-[var(--color-black-60)] font-[600]'}>
          Ещё нет аккунта?{' '}
          <Link className="text-[var(--color-blue-primary)] underline" to="/register">
            Зарегистрироваться
          </Link>
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.inputContainer}>
            <Input
              id="email"
              name="email"
              type="email"
              label="Логин (Email)"
              value={formik.values.email}
              onChange={formik.handleChange}
              variant="bordered"
              placeholder="Электронная почта"
              isInvalid={Boolean(formik.errors.email)}
              errorMessage={formik.errors.email}
              classNames={itemClasses}
              onFocus={() => {
                setErrorMsg('');
              }}
            />
            {
              errorMsg === 'email busy' && 
              <p className={styles.errorMessage}>
                Пользователь с таким e-mail не существует
              </p>
            }
          </div>
          <div className={styles.inputContainer}>
            <Input
              id="password"
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              label="Пароль"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Введите пароль"
              isInvalid={Boolean(formik.errors.password)}
              errorMessage={formik.errors.password}
              endContent={
                <button onClick={toggleVisibility} type="button">
                  {isPasswordVisible ? (
                    <img width="20" height="20" src="./eye-hide.svg" />
                  ) : (
                    <img width="20" height="20" src="./eye-show.svg" />
                  )}
                </button>
              }
              classNames={itemClasses}
              onFocus={() => {
                setErrorMsg('');
              }}
            />
            {
              errorMsg === 'incorrect password' && 
              <p className={styles.errorMessage}>Неверный пароль</p>
            }
          </div>
          <Link className={styles.forgotPassword} to="/reset-password">Забыли пароль?</Link>
          <div className={styles.submitContainer}>
            <input disabled={isLoading} className={styles.submit} type="submit" value="Войти" />
          </div>
        </form>
      </div>
    </div>
  );
};
