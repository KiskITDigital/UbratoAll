import { FC } from 'react';
import style from './OneTenderDescriptiom.module.css';

type TenderDescription = {
  description: string;
};

export const OneTenderDescription: FC<TenderDescription> = ({ description }) => {
  return (
    <div className={style.block_main}>
      <p className={style.block_main_p}>Описание:</p>{' '}
      <p className={style.block_add_p}>{description}</p>
    </div>
  );
};
