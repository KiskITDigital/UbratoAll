import { Dispatch, FC } from "react";
import styles from './switcher.module.css'

const Switcher: FC<{ state: 'Тендеры' | 'Исполнители', setState: Dispatch<React.SetStateAction<"Тендеры" | "Исполнители">> }> = ({ state, setState }) => {
    return (
        <div className={styles.switcher}>
            <span className={`${styles.showEffect} ${state === 'Тендеры' ? styles.showEffectStart : styles.showEffectEnd}`}></span>
            <p onClick={() => setState('Тендеры')} className={styles.option}>Тендеры</p>
            <p onClick={() => setState('Исполнители')} className={styles.option}>Исполнители</p>
        </div>
    );
}

export default Switcher;