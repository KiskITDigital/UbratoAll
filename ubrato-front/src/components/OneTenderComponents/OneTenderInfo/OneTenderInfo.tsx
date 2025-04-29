import { FC } from 'react';
import styles from './OneTenderInfo.module.css';
// import { Link } from 'react-router-dom';

type OneTenderInfo = {
  price: number;
  timestamp_rc_start: string;
  timestamp_rc_end: string;
  timestamp_wrk_start: string;
  timestamp_wrk_end: string;
  timestamp_crtd: string;
  // is_nds: boolean
};

export const OneTenderInfo: FC<OneTenderInfo> = ({
  price,
  // timestamp_rc_start,
  // timestamp_rc_end,
  timestamp_wrk_end,
  timestamp_wrk_start,
  // is_nds,
}) => {
  return (
    <div className={styles.infocontainer}>
      <div className={styles.offerings_block}>
        <div className={styles.one_part_grow}>
          <p className={styles.nd_info}>Стоимость</p>
          <div className={styles.date_info}>
            <p>{price} ₽</p>
          </div>
        </div>
        <div className={styles.one_part_grow}>
          <p className={styles.nd_info_accented}>Оказание услуг</p>
          <div className={styles.date_info}>
            <p className={styles.info_start}>{timestamp_wrk_start.split('T')[0]}</p>
            <p className={styles.info_end}>{timestamp_wrk_end.split('T')[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
