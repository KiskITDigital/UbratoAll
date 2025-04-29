import { FC, useState } from 'react';
import styles from './description.module.css'

// eslint-disable-next-line react-refresh/only-export-components
export const getShorterText = (text: string) => {
    return text.split(' ').slice(0, 10).join(' ')
}

const Description: FC<{ text: string }> = ({ text }) => {
    const [isShorterText, setIsShorterText] = useState(text.split(' ').length > 10);

    return (
        <div className={styles.container}>
            <p className={styles.title}>Описание компании</p>
            <p className={styles.text}>
                {isShorterText ? getShorterText(text) : text}
                {
                    text.split(' ').length > 10 &&
                    (isShorterText ?
                        <>... <span onClick={() => setIsShorterText(false)} className={styles.showMore}>Показать все</span></> :
                        <><br /><span onClick={() => setIsShorterText(true)} className={styles.showMore}>Показать меньше</span></>)
                }
            </p>
        </div>
    );
}

export default Description;