import { FC } from 'react';
import styles from './arrowcontrol.module.css';

type PropsT = {
  image: string;
};

export const ArrowControl: FC<PropsT> = ({ image }) => {
  return <img className={styles.image} src={image} alt="" />;
};
