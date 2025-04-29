import { FC, useEffect, useRef, useState } from "react";
import styles from './rights-page.module.css'
import FirstText from "./FirstText";
import SecondText from "./SecondText";
import ThirdText from "./ThirdText";
import { useLocation, useNavigate } from "react-router-dom";

const RightsPage: FC = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);

    const navigate = useNavigate()

    const startRef = useRef<HTMLHeadingElement>(null)

    const [switcher, setSwitcher] = useState<"Пользовательское соглашение" | "Согласие на обработку персональных данных" | "Политика обработки персональных данных">("Пользовательское соглашение");

    useEffect(() => {
        startRef.current!.scrollIntoView({ behavior: "smooth" })
        setTimeout(() => {
            const elementTop = startRef.current!.getBoundingClientRect().top;
            window.scrollBy({ top: elementTop - 200, behavior: "smooth" });
        }, 0);

        const documentParam = searchParams.get("document");
        if (documentParam === "1") setSwitcher("Политика обработки персональных данных")
        else if (documentParam === "2") setSwitcher("Пользовательское соглашение")
        else if (documentParam === "3") setSwitcher("Согласие на обработку персональных данных")
        else navigate('/rights?document=1')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <section ref={startRef} className={styles.container}>
            <div className={styles.main}>
                <p className={styles.title}>Правовая информация</p>
                <p className={styles.underTitle}>Список соглашений и документов, применяемых на сайте <span>Ubrato</span></p>
                <div className={styles.btnsContainer}>
                    <button
                        disabled={switcher === "Политика обработки персональных данных"}
                        onClick={() => navigate('/rights?document=1')}
                        className={styles.btn}
                    >
                        Политика обработки персональных данных
                    </button>
                    <button
                        disabled={switcher === "Пользовательское соглашение"}
                        className={styles.btn}
                        onClick={() => navigate('/rights?document=2')}
                    >
                        Пользовательское соглашение
                    </button>
                    <button
                        disabled={switcher === "Согласие на обработку персональных данных"}
                        onClick={() => navigate('/rights?document=3')}
                        className={styles.btn}
                    >
                        Согласие на обработку персональных данных
                    </button>
                </div>
                <div className={styles.info}>
                    <p className={styles.infoTitle}>{switcher}</p>
                    <p className={styles.infoDate}>Обновлено: 23.10.2023</p>
                </div>
                {
                    switcher === "Пользовательское соглашение" ?
                        <FirstText /> :
                        switcher === "Согласие на обработку персональных данных" ?
                            <SecondText /> :
                            <ThirdText />
                }
            </div>
        </section>
    );
}

export default RightsPage;