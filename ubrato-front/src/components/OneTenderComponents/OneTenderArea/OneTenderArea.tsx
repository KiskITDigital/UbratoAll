import { FC } from 'react';
import style from './OneTenderArea.module.css';

type TenderArea = {
  area: number;
};

export const OneTenderArea: FC<TenderArea> = ({ area }) => {
  return (
    <div className={style.block_main}>
      <p className={style.block_main_p}>Площадь:</p> <p className={style.block_add_p}>{area} кв.м</p>
    </div>
  );
};
