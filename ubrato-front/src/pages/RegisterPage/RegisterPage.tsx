import { useFormik } from "formik";
import {
  ChangeEvent,
  FC,
  FormEvent,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import { RegisterFormValuesT } from "@/types/app";
import { Checkbox, Input } from "@nextui-org/react";
import { registerSchema } from "@/validation/registerSchema";
import styles from "./registerpage.module.css";
import { useUserInfoStore } from "@/store/userInfoStore";
import { Link, useNavigate } from "react-router-dom";
import { checkINN, registerUser } from "@/api";
import { useIMask } from "react-imask";
import Modal from "@/components/Modal";
import ContactModal from "@/components/Modal/ContactModal";

export const RegisterPage: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userInfoStore = useUserInfoStore();
  const navigate = useNavigate();
  const fetchUser = userInfoStore.fetchUser;

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmVisible = () => setIsConfirmVisible(!isConfirmVisible);

  const initialValues: RegisterFormValuesT = {
    inn: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    middleName: "",
    userAgreement: false,
    personalDataAgreement: false,
    personalDataPolicy: false,
  };

  const itemClasses = {
    input: styles.input,
    innerWrapper: styles.innerWrapper,
    base: styles.base,
    label: styles.label,
    errorMessage: styles.errorMessage,
    helperWrapper: styles.helperWrapper,
  };

  const formik = useFormik<RegisterFormValuesT>({
    initialValues: initialValues,
    onSubmit(values) {
      const parameters = {
        email: values.email,
        phone: values.phone,
        password: values.password,
        first_name: values.firstName,
        middle_name: values.middleName,
        last_name: values.lastName,
        inn: values.inn,
        is_contractor: isContractor,
        avatar: "",
      };
      (async () => {
        setIsLoading(true);
        try {
          await registerUser(parameters);

          const token = localStorage.getItem("token");
          if (token) {
            await fetchUser(token);
            if (!userInfoStore.error) {
              navigate("/profile");
            }
          }
        } catch (e) {
          // console.log(e);
        } finally {
          setIsLoading(false);
        }
      })();
    },
    validationSchema: registerSchema,
    validateOnBlur: true,
    validateOnMount: false,
  });

  const [isContractor, setIsContractor] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [registrationStep, setRegistrationStep] = useState<1 | 2 | 3 | 4>(1);
  // const [nameConfirm, setNameConfirm] = useState(false);

  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: `${styles.checkText} ${styles.infoText}`,
  };

  const surnameRef = useRef<HTMLInputElement>(null);

  const scrollTosurnameRef = () => {
    surnameRef.current!.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const elementTop = surnameRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 200, behavior: "smooth" });
    }, 0);
  };

  const { ref, value, setValue } = useIMask({ mask: "+{7}(900)000-00-00" });

  useEffect(() => {
    if (userInfoStore.isLoggedIn) {
      navigate("/profile");
    }
  }, [navigate, userInfoStore.isLoggedIn]);

  useEffect(() => {
    if (
      !formik.errors.email &&
      !formik.errors.password &&
      !formik.errors.repeatPassword &&
      formik.values.email.length !== 0 &&
      formik.values.password.length !== 0 &&
      formik.values.repeatPassword.length !== 0 &&
      registrationStep === 1
    ) {
      setRegistrationStep(2);
    }
  }, [
    formik.errors.email,
    formik.errors.password,
    formik.errors.repeatPassword,
    formik.values.email.length,
    formik.values.password.length,
    formik.values.repeatPassword.length,
    registrationStep,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (userInfoStore.isLoggedIn) {
    return <div></div>;
  }

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Регистрация на сайте Ubrato</h1>
        <p className={`${styles.infoText} pt-[10px]`}>
          Уже есть аккунт?{" "}
          <Link className={styles.link} to="/login">
            Войти
          </Link>
        </p>
        <div className={styles.createInfo}>
          <p className={styles.create}>Выберите Вашу роль</p>
          <img className={styles.info} src="./info-ic.svg" alt="info" />
        </div>
        <div className={styles.buttonsContainer}>
          <button className={`${styles.button} ${styles.active}`} disabled>
            Вы заказчик
          </button>
          <button
            className={`${styles.button} ${isContractor ? styles.active : ""}`}
            onClick={() => {
              setIsContractor(!isContractor);
            }}
          >
            Вы исполнитель
          </button>
        </div>
        <div className={styles.questionsAboutRegistrationContainer}>
          <p className={styles.questionsAboutRegistration}>
            {isContractor
              ? "Если ваша компания выполняет заказы, то добавьте функционал исполнителя. Или выберите эту роль позже."
              : "Регистрируясь на сайте Ubrato, ваша компания получает возможность проводить тендеры."}
          </p>
        </div>
        <div
          className={`${styles.questionsAboutRegistration} ${styles.stillHaveQuestions}`}
        >
          Есть вопросы по регистрации?{" "}
          <span
            className={`cursor-pointer underline underline-offset-4`}
            onClick={() => setOpenModal(true)}
          >
            Напишите телефон
          </span>{" "}
          и мы перезвоним
        </div>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <p className={styles.inputGrHeader}>Создайте учетную запись</p>
          <div className={styles.inputContainer}>
            <Input
              id="email"
              name="email"
              type="email"
              label="Логин (Email)"
              value={formik.values.email}
              onChange={(e) => {
                formik.handleChange(e);
                if (e.target.value.endsWith(" ")) {
                  formik.setErrors({ email: "Некорректный e-mail" });
                }
                // console.log(e.target.value);
              }}
              variant="bordered"
              placeholder="Электронная почта"
              isInvalid={Boolean(formik.errors.email)}
              errorMessage={formik.errors.email}
              classNames={itemClasses}
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              id="password"
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              label="Пароль (не менее 6 знаков)"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Придумайте пароль"
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
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              id="repeatPassword"
              name="repeatPassword"
              type={isConfirmVisible ? "text" : "password"}
              label="Пароль (не менее 6 знаков)"
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              placeholder="Повторите пароль"
              isInvalid={Boolean(formik.errors.repeatPassword)}
              errorMessage={formik.errors.repeatPassword}
              endContent={
                <button onClick={toggleConfirmVisible} type="button">
                  {isConfirmVisible ? (
                    <img width="20" height="20" src="./eye-hide.svg" />
                  ) : (
                    <img width="20" height="20" src="./eye-show.svg" />
                  )}
                </button>
              }
              classNames={itemClasses}
            />
          </div>
          {registrationStep > 1 && (
            <p className={styles.inputGrHeader}>Укажите данные компании</p>
          )}
          {registrationStep > 1 && (
            <p
              className={`${styles.infoText} py-[10px] w-full max-w-full text-center`}
            >
              В настоящее время сервис Ubrato открыт для юридических лиц
            </p>
          )}
          <div className={styles.inputContainer}>
            {registrationStep > 1 && (
              <Input
                id="inn"
                name="inn"
                type="text"
                label="ИНН"
                value={formik.values.inn}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (formik.values.inn.length >= 10 && e.target.value) {
                    e.target.value = e.target.value.slice(0, 10);
                    formik.handleChange(e);
                    return;
                  }
                  if (e.currentTarget.value.length === 10) {
                    (async () => {
                      const res = await checkINN(e.currentTarget.value).catch(
                        (e) => {
                          console.log(e);
                          return "err";
                        }
                      );
                      if (res === "Неверный ИНН") {
                        formik.setErrors({ inn: "Неверный ИНН" });
                        setCompanyName("");
                      } else if (res === "err") {
                        formik.setErrors({ inn: "Что-то не так" });
                        setCompanyName("");
                      } else {
                        setCompanyName(res);
                        if (registrationStep !== 4) {
                          setRegistrationStep(3);
                        }
                      }
                    })();
                  }
                  if (e.target.value?.match(/[\d]/) || !e.target.value) {
                    formik.handleChange(e);
                  }
                }}
                placeholder="ИНН"
                isInvalid={Boolean(formik.errors.inn)}
                errorMessage={formik.errors.inn}
                classNames={itemClasses}
              />
            )}
            {registrationStep > 2 && (
              <div className={styles.companyName}>
                <p className={`${styles.label} ${styles.companyText}`}>
                  Это название вашей компании?
                </p>
                <p className={`${styles.label} ${styles.companyText}`}>
                  Краткое название компании
                </p>
                <p className={styles.nameConfirm}>{companyName}</p>
                <div className={styles.companyBtns}>
                  <button
                    onClick={() => {
                      setTimeout(() => {
                        if (registrationStep !== 4) {
                          scrollTosurnameRef();
                        }
                      }, 5);
                      setRegistrationStep(4);
                    }}
                    type="button"
                  >
                    Да
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // setNameConfirm(false);
                      formik.values.inn = "";
                      if (registrationStep !== 4) {
                        setRegistrationStep(2);
                      }
                      setCompanyName("");
                    }}
                  >
                    Нет
                  </button>
                </div>
              </div>
            )}
          </div>
          {registrationStep > 3 && (
            <>
              <p className={styles.inputGrHeader}>Укажите контактное лицо</p>
              <p className={`${styles.infoText} ${styles.weCall}`}>
                Мы свяжемся с Вами для верификации данных
              </p>
              <div className={styles.inputContainer}>
                <Input
                  id="lastName"
                  name="lastName"
                  label="Фамилия"
                  type="text"
                  autoFocus
                  ref={surnameRef}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  placeholder="Фамилия"
                  isInvalid={Boolean(formik.errors.lastName)}
                  errorMessage={formik.errors.lastName}
                  classNames={itemClasses}
                />
              </div>
              <div className={styles.inputContainer}>
                <Input
                  id="firstName"
                  name="firstName"
                  label="Имя"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  placeholder="Имя"
                  isInvalid={Boolean(formik.errors.firstName)}
                  errorMessage={formik.errors.firstName}
                  classNames={itemClasses}
                />
              </div>
              <div className={styles.inputContainer}>
                <Input
                  id="middleName"
                  name="middleName"
                  label="Отчество"
                  type="text"
                  value={formik.values.middleName}
                  onChange={formik.handleChange}
                  placeholder="Отчество"
                  isInvalid={Boolean(formik.errors.middleName)}
                  errorMessage={formik.errors.middleName}
                  classNames={itemClasses}
                />
              </div>
              <div className={styles.inputContainer}>
                <Input
                  ref={ref as Ref<HTMLInputElement>}
                  id="phone"
                  name="phone"
                  label="Телефон"
                  type="phone"
                  value={value}
                  onChange={formik.handleChange}
                  onInput={(e: FormEvent<HTMLInputElement>) => {
                    setValue(e.currentTarget.value);
                    formik.handleChange(e);
                  }}
                  placeholder="Телефон"
                  isInvalid={Boolean(formik.errors.phone)}
                  errorMessage={formik.errors.phone}
                  classNames={itemClasses}
                />
              </div>
              <div className={styles.approvalContainer}>
                <Checkbox
                  id="userAgreement"
                  name="userAgreement"
                  isSelected={formik.values.userAgreement}
                  onChange={formik.handleChange}
                  classNames={checkStyle}
                >
                  Принимаю{" "}
                  <Link
                    target="_blank"
                    className={styles.link}
                    to="/rights?document=2"
                  >
                    Пользовательское соглашение ООО «Интеграция»
                  </Link>
                  <p className={`${styles.errorMessage} ${styles.checkErr}`}>
                    {formik.errors.userAgreement}
                  </p>
                </Checkbox>
                <Checkbox
                  id="personalDataPolicy"
                  name="personalDataPolicy"
                  isSelected={formik.values.personalDataPolicy}
                  onChange={formik.handleChange}
                  classNames={checkStyle}
                >
                  Соглашаюсь с{" "}
                  <Link
                    target="_blank"
                    className={styles.link}
                    to="/rights?document=1"
                  >
                    Политикой обработки персональных данных ООО «Интеграция»
                  </Link>
                  <p className={`${styles.errorMessage} ${styles.checkErr}`}>
                    {formik.errors.personalDataPolicy}
                  </p>
                </Checkbox>
                <Checkbox
                  id="personalDataAgreement"
                  name="personalDataAgreement"
                  isSelected={formik.values.personalDataAgreement}
                  onChange={formik.handleChange}
                  classNames={checkStyle}
                >
                  Даю{" "}
                  <Link
                    target="_blank"
                    className={styles.link}
                    to="/rights?document=3"
                  >
                    Согласие на обработку персональных данных
                  </Link>
                  <p className={`${styles.errorMessage} ${styles.checkErr}`}>
                    {formik.errors.personalDataAgreement}
                  </p>
                </Checkbox>
              </div>
              <div className={styles.submitContainer}>
                <input
                  disabled={isLoading}
                  className={styles.submit}
                  type="submit"
                  value="Зарегистрироваться"
                />
              </div>
            </>
          )}
        </form>
      </div>
      <Modal isOpen={openModal}>
        <ContactModal onClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
};
