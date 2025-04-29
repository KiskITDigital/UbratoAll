import { FC } from 'react';
// import style from './OneTenderExecutorNotification.css'
import styles from './ExecutorNotice.module.css';


export const OneTenderExecutorNotification: FC = () =>{
    return(
        <div className={styles.block}>
            <h2 className={styles.notif_header}>Идёт этап приема откликов. </h2>
            <p className={styles.notif_paragraph}>Нажмите на кнопку «Откликнуться на тендер» и укажите стоимость, за которую вы готовы выполнить работы. Если есть вопросы, напишите заказчику в чате.</p>
        </div>
    )
}

