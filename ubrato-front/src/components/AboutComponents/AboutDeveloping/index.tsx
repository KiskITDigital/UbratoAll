import { FC, useEffect, useState } from 'react';
import styles from './style.module.css';

export const AboutDeveloping: FC = () => {

  return (
    <div className={styles.develop_container}>
        <h2 className={styles.develop_header}>
            Мы ценим и развиваем
        </h2>
        <div className={styles.develop_list}> 
            <div className={styles.list_elem}><img src="./graphic.png" alt="" /> <p>Честную конкуренцию</p></div>
            <div className={styles.list_elem}><img src="./shakehands.png" alt="" /> <p>Надёжных проверенных партнёров</p></div>
            <div className={styles.list_elem}><img src="./door.png" alt="" /> <p>Прозрачную коммуникацию</p></div>
        </div>
    </div>
  );
};
