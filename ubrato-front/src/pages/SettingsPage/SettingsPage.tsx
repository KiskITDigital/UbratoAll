import { FC, useEffect, useRef, useState } from "react";
import styles from './settings-page.module.css'
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/react";
// import { LoginFormValuesT } from "@/types/app";
// import { useFormik } from "formik";
import { askForVerification, askResetPassword, login } from "@/api";
// import { loginSchema } from '@/validation/loginSchema';
// import { AxiosError } from "axios";
import { useUserInfoStore } from "@/store/userInfoStore";
import { AxiosError } from "axios";
import Modal from "@/components/Modal";
import ContactModal from "@/components/Modal/ContactModal";

const SettingsPage: FC = () => {
  const navigate = useNavigate()

  const startRef = useRef<HTMLHeadingElement>(null)

  const userInfoStore = useUserInfoStore()

  const status: 'unverified' | 'success' = userInfoStore.user.verified ? "success" : "unverified"

  const [buttonText, setButtonText] = useState<"Отправить письмо" | "Ссылка для подтверждения e-mail отправлена на указанную вами почту.">("Отправить письмо");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<"" | "Пароль некорректен" | "allowed" | "На указанную вами электронную почту отправлена ссылка для создания нового пароля.">("");

  // const initialValues: LoginFormValuesT = {
  //     email: userInfoStore.user.email,
  //     password: '',
  // };

  // const formik = useFormik<LoginFormValuesT>({
  //     initialValues: initialValues,
  //     onSubmit() { },
  //     validationSchema: loginSchema,
  // });

  const handlePassword = async (newVal: string) => {
    setPassword(newVal)
    // if (password.length > 0 && password.length < 6) setPasswordError("Пароль слишком короткий")
    // else setPasswordError("")
    if (newVal.length > 0) {
      try {
        await login({ email: userInfoStore.user.email, password: newVal })
        setPasswordError("allowed")
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 401) {
            setPasswordError("Пароль некорректен")
          } else {
            setErrorMsg('Что-то пошло не так');
          }
        }
      }
    } else setPasswordError("")
  }

  const verification = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate("/login")
      return;
    }
    try {
      await askForVerification(token)
      setButtonText("Ссылка для подтверждения e-mail отправлена на указанную вами почту.")
      setTimeout(() => {
        setButtonText("Отправить письмо")
      }, 3000)
    } catch (e) {
      navigate("/login")
    }
  }

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 200, behavior: "smooth" });
    }, 0);

    const token = localStorage.getItem('token')
    if (!token) {
      navigate("/login")
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const askToResetPassword = async () => {
    const { status } = await askResetPassword(userInfoStore.user.email)
    if (status) {
      setPassword("")
      setPasswordError("На указанную вами электронную почту отправлена ссылка для создания нового пароля.")
      setTimeout(() => {
        setPasswordError("")
      }, 3000)
    }
  }

  const itemClasses = {
    input: styles.input,
    innerWrapper: styles.innerWrapper,
    base: styles.base,
    label: styles.label,
    errorMessage: styles.errorMessage,
    helperWrapper: styles.helperWrapper,
  };

  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <section ref={startRef} className={`${styles.container}`}>
      <p className={styles.title}>Настройки аккаунта</p>
      <div className="flex gap-10 border-b border-black/30 pb-6">
        <p className="min-w-[220px] font-bold">Статус</p>
        <div className={`${styles.section__container} ${styles.section__containerStatus}`}>
          {/* <p className={`${styles.status} ${status === 'success' ? styles.statusSuccess : styles.statusUnSuccess}`}>{status === 'success' ? 'Верифицирован' : status === 'blocked' ? 'Заблокирован' : 'Подтвердите почту'}</p> */}
          <p className={`${styles.status} ${status === 'success' ? styles.statusSuccess : styles.statusUnSuccess}`}>{status === 'success' ? 'Верифицирован' : 'Подтвердите почту'}</p>
          {status === 'unverified' &&
            <div className={styles.statusVerifyBlock}>
              <button
                onClick={() => verification()}
                className={`${styles.sendMessage}`}
                disabled={buttonText === "Ссылка для подтверждения e-mail отправлена на указанную вами почту."}
              >{buttonText}</button>
              {
                buttonText !== "Ссылка для подтверждения e-mail отправлена на указанную вами почту." &&
                <div className={styles.info}>
                  <img className={styles.info__img} src="/info-ic.svg" alt="i" />
                  <p className={styles.info__text}>Чтобы начать работу с тендерами пройдите верификацию</p>
                </div>
              }
            </div>
          }
        </div>
      </div>
      <div className="flex justify-between gap-10 border-b border-black/30 pb-6">
        <p className="min-w-[220px] font-bold">Пользовательские данные</p>
        <div className={styles.section__container}>
          <div className={styles.inputBlock}>
            <p className={styles.inputBlock__name}>Email</p>
            {/* <input className={styles.inputBlock__input} type="text" /> */}
            <Input
              id="email"
              name="email"
              type="email"
              readOnly={true}
              maxLength={250}
              value={userInfoStore.user.email}
              variant="bordered"
              placeholder="Электронная почта"
              classNames={itemClasses}
              onFocus={() => {
                setErrorMsg('');
              }}
            />
          </div>
          <div className={styles.inputBlock}>
            <p className={styles.inputBlock__name}>Пароль</p>
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              maxLength={250}
              value={password}
              onChange={(e) => handlePassword(e.currentTarget.value)}
              placeholder="Введите пароль"
              endContent={
                <button onClick={() => setIsPasswordVisible(prev => !prev)} type="button">
                  {isPasswordVisible ? (
                    <img width="20" height="20" src="/eye-hide.svg" />
                  ) : (
                    <img width="20" height="20" src="/eye-show.svg" />
                  )}
                </button>
              }
              classNames={itemClasses}
              onFocus={() => {
                setErrorMsg('');
              }}
            />
            {(passwordError !== "allowed" && passwordError !== "На указанную вами электронную почту отправлена ссылка для создания нового пароля.") && <p className={styles.errorMessage}>{passwordError}</p>}
          </div>
          <button
            disabled={passwordError !== "allowed"}
            className={styles.updateAccaunt}
            onClick={() => askToResetPassword()}
          >{passwordError === "На указанную вами электронную почту отправлена ссылка для создания нового пароля." ? "На указанную вами электронную почту отправлена ссылка для создания нового пароля." : "Изменить"}</button>
          {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
        </div>
      </div>
      <div className="flex gap-10 border-b border-black/30 pb-6">
        <p className="min-w-[220px] font-bold">Правовые документы</p>
        <div className={styles.section__container}>
          <Link target="_blank" to="/rights?document=1" className={styles.sectionLink}>Политика обработки персональных данных</Link>
          <Link target="_blank" to="/rights?document=2" className={styles.sectionLink}>Пользовательское соглашение</Link>
          <Link target="_blank" to="/rights?document=3" className={styles.sectionLink}>Согласие на обработку персональных данных</Link>
        </div>
      </div>
      <div className="flex gap-10 border-b border-black/30 pb-6">
        <p className="min-w-[220px] font-bold">Обратная связь</p>
        <div className={styles.section__container}>
          <p className={styles.sectionText}>Есть вопросы по настройке аккаунта? <span className={`${styles.sectionLink} cursor-pointer`} onClick={() => setOpenModal(true)}>
            Напишите телефон
          </span> и мы перезвоним</p>
        </div>
      </div>
      {/* {status !== 'blocked' && <button className={styles.deleteAccaunt}>Удалить аккаунт</button>} */}
      <button className={styles.deleteAccaunt}>Удалить аккаунт</button>
      <Modal isOpen={openModal}>
        <ContactModal onClose={() => setOpenModal(false)} />
      </Modal>
    </section>
  );
}

export default SettingsPage;