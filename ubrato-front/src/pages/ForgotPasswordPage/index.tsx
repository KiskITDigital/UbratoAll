import { useEffect, useState } from 'react';
import localStyles from './forgot-password.module.css'
import styles from '../LoginPage/loginpage.module.css'
import { AxiosError } from 'axios';
import { askResetPassword, login, resetPassword } from '@/api';
import { Input } from '@nextui-org/react';
import { useLocation, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search);
    const codeParams = searchParams.get("code")
    const emailParams = searchParams.get("email")

    const [errorMsg, setErrorMsg] = useState<"Почта указана неверно" | "" | "Что-то пошло не так" | "Пользователя с таким e-mail не существует" | "allowed">("")

    const [email, setEmail] = useState("");

    const [buttonText, setButtonText] = useState<"Получить ссылку по почте" | "Создать новый пароль" | "На указанную вами электронную почту отправлена ссылка для создания нового пароля." | "что-то пошло не так">((emailParams && codeParams) ? "Создать новый пароль" : "Получить ссылку по почте");

    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const [password1Error, setPassword1Error] = useState<"Пароль слишком короткий" | "">("");
    const [password2Error, setPassword2Error] = useState<"Пароли не совпадают" | "">("");

    const handleChange = async (newVal: string) => {
        setEmail(newVal)
        if (newVal === "") { setErrorMsg(""); return }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newVal)) {
            setErrorMsg("Почта указана неверно")
        } else {
            if (errorMsg === "Почта указана неверно") setErrorMsg("")
            try {
                await login({ email: newVal, password: "" })
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.status === 404) {
                        setErrorMsg('Пользователя с таким e-mail не существует');
                    } else if (e.response?.status === 401) {
                        setErrorMsg("allowed")
                    } else {
                        setErrorMsg('Что-то пошло не так');
                    }
                }
            }
        }
    }

    const askToResetPassword = async () => {
        if (!email) return;
        const { status } = await askResetPassword(email)
        if (status === true) {
            setButtonText("На указанную вами электронную почту отправлена ссылка для создания нового пароля.")
        }
    }

    const sendNewResetPassword = async () => {
        if (!emailParams || !codeParams || !password1) {
            navigate("/reset-password")
            return;
        }
        try {
            const res = await resetPassword(emailParams, codeParams, password1)
            if (res.status === 200) navigate("/login")
        } catch (e) {
            setButtonText("что-то пошло не так")
            setTimeout(() => {
                setButtonText("Создать новый пароль")
            }, 3000);
        }
    }

    const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const toggleConfirmVisible = () => setIsConfirmVisible(!isConfirmVisible);

    const itemClasses = {
        input: styles.input,
        innerWrapper: styles.innerWrapper,
        base: styles.base,
        label: styles.label,
        errorMessage: styles.errorMessage,
        helperWrapper: styles.helperWrapper,
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if ((codeParams && !emailParams) || (emailParams && !codeParams) || (emailParams && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailParams))) navigate("/reset-password")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codeParams, emailParams]);

    useEffect(() => {
        if (password1 && password1.length < 6) setPassword1Error("Пароль слишком короткий")
        else setPassword1Error("")
        if (password2 && password2 !== password1) setPassword2Error("Пароли не совпадают")
        else setPassword2Error("")
    }, [password1, password2]);

    return (
        <div className={`container ${localStyles.container}`}>
            <h1 className={localStyles.header}>Забыли пароль?</h1>
            <p className={'ml-[15px] text-[var(--color-black-60)] font-[600]'}>
                Введите электронную почту, указанную при регистрации
            </p>
            <label className={localStyles.inputWrapper} htmlFor="">
                <p className={localStyles.inputLabel}>Логин (Email)</p>
                <input maxLength={250} disabled={!!(emailParams && codeParams)} value={(emailParams && codeParams) ? emailParams : email} className={`${localStyles.input} ${errorMsg !== "allowed" && errorMsg !== "" ? localStyles.errorInput : ""}`} placeholder="Электронная почта" type="text" onChange={(e) => handleChange(e.currentTarget.value)} />
                {errorMsg !== "allowed" && <p className={localStyles.errorMessage}>{errorMsg}</p>}
            </label>
            {
                emailParams && codeParams && <>
                    <label className={localStyles.inputWrapper} htmlFor="">
                        <Input
                            value={password1}
                            maxLength={250}
                            onChange={(e) => setPassword1(e.currentTarget.value)}
                            type={isPasswordVisible ? 'text' : 'password'}
                            label="Пароль (не менее 6 знаков)"
                            placeholder="Придумайте пароль"
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
                        {password1Error && <p className={localStyles.errorMessage}>{password1Error}</p>}
                    </label>
                    <label className={localStyles.inputWrapper} htmlFor="">
                        <Input
                            value={password2}
                            maxLength={250}
                            onChange={(e) => setPassword2(e.currentTarget.value)}
                            type={isConfirmVisible ? 'text' : 'password'}
                            label="Пароль (не менее 6 знаков)"
                            placeholder="Повторите пароль"
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
                        {password2Error && <p className={localStyles.errorMessage}>{password2Error}</p>}
                    </label>
                </>
            }
            <button
                className={localStyles.sendButton}
                disabled={(emailParams && codeParams) ? ((!password1 || !password2 || password1 !== password2) || buttonText === "что-то пошло не так") : (errorMsg !== "allowed" || buttonText === "На указанную вами электронную почту отправлена ссылка для создания нового пароля.")}
                onClick={() => (emailParams && codeParams) ? sendNewResetPassword() : askToResetPassword()}
            >{buttonText}</button>
        </div>
    );
}

export default ForgotPasswordPage;