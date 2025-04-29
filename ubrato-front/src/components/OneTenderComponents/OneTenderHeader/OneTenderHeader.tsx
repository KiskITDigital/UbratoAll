import { FC } from 'react';
import styles from './OneTenderHeader.module.css';

type PropsForTenderHeader = {
  status: boolean;
  id: number;
  name: string;
};

export const OneTenderHeader: FC<PropsForTenderHeader> = ({ status, id, name }) => {
  return (
    <div className={styles.headerwrap}>
      <div className={styles.infohead}>
        <p className={styles.text}>Тендер №{id}</p>
        <p className={styles.text}>
          Статус: <span className={styles.accenttext}>{status ? 'В работе' : 'Не в работе'}</span>
        </p>
      </div>
      <h1 className={styles.mainheader}>{name}</h1>
    </div>
  );
};

