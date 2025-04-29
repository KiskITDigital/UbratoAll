import { FC } from 'react';
import style from './OneTenderCIty.module.css';

type TednerCity = {
  city: string;
};

export const OneTenderCity: FC<TednerCity> = ({ city }) => {
  return (
    <div className={style.block_main}>
      <p className={style.block_main_p}>Город и регион:</p>{' '}
      <p className={style.block_add_p}>{city}</p>
    </div>
  );
};
