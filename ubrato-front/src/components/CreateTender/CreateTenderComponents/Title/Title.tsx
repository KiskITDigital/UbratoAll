import { FC } from "react";
import styles from '../../CreateTender.module.css'

const Title: FC = () => {
    return (
        <div className={`${styles.title}`}>
            {/* <h1 className={`${styles.title__h1} ${styles.textBlack60} ${styles.textRegular}`}>Тендер №{'1304'}</h1> */}
            <p className={`${styles.title__p} ${styles.textBlack60} ${styles.textRegular}`}>Статус: <span className={`${styles.textBlack} ${styles.textMedium}`}>{'Создание тендера'}</span></p>
        </div>
    );
}

export default Title;