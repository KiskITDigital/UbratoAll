import { FC, useEffect, useState } from "react";
import styles from './confirm-email-page.module.css'
import { useLocation } from "react-router-dom";
import { verify } from "@/api";

const ConfirmEmailPage: FC = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const codeParams = searchParams.get("code")

    const [text, setText] = useState("Запрос на верефикацию отправлен");

    useEffect(() => {
        // console.log(codeParams);
        if (codeParams) {
            (async () => {
                try {
                    await verify(codeParams)
                } catch (e) {
                    setText("Что-то пошло не так, попробуйте открыть ссылку еще раз")
                }
            })()
        } else setText("Что-то пошло не так, попробуйте открыть ссылку еще раз")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <h1 className={styles.text}>{text}</h1>
        </div>
    );
}

export default ConfirmEmailPage;