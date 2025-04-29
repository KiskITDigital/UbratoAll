import { FC } from 'react';
import { HowToFindCardT } from '@/textData/textData';
import styles from './howtofindcard.module.css'

export const HowToFindCard: FC<HowToFindCardT> = ({ img, title, text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <img className={styles.image} src={img} alt="" />
        <p className={styles.title}>{title}</p>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
