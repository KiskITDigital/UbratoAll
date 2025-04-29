import { FC } from 'react';
import style from './OneTenderWishes.module.css';

type TenderWishes = {
  wishes: string;
};

export const OneTenderWishes: FC<TenderWishes> = ({ wishes }) => {
  return (
    <div className={style.block_main}>
      <p className={style.block_main_p}>Пожелания:</p>
      <p className={style.block_add_p}>{wishes}</p>
    </div>
  );
};
