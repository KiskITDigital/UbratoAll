import { FC } from 'react';
import { useIsOrdererState } from '@/store/isOrdererStore';
import styles from './howtofind.module.css';
import { executorCardList, ordererCardList } from '@/textData/textData';
import { HowToFindCard } from '@/components';
import { Link } from 'react-router-dom';

export const HowToFind: FC = () => {
  const isOrdererStore = useIsOrdererState();

  return (
    <div className={`container ${styles.container}`}>
      <h2 className={styles.header}>
        Как найти{' '}
        <span className={styles.blueHeader}>
          {isOrdererStore.role === 'orderer' ? 'надёжного' : 'выгодный'}
        </span>
        {isOrdererStore.role === 'orderer' ? ' исполнителя' : ' тендер'}
      </h2>
      <div className={styles.cards}>
        {isOrdererStore.role === 'orderer'
          ? ordererCardList.map((e, ix) => (
            <HowToFindCard key={ix} img={e.img} title={e.title} text={e.text} />
          ))
          : executorCardList.map((e, ix) => (
            <HowToFindCard key={ix} img={e.img} title={e.title} text={e.text} />
          ))}
      </div>
      <div className={styles.btnContainer}>
        <Link to={isOrdererStore.role === 'orderer' ? "/create-tender" : "/alltenders"} className={styles.btn}>
          <p className={styles.btnText}>
            {isOrdererStore.role === 'orderer' ? 'Опубликуйте тендер' : 'Найти тендер'}
          </p>
          <img src="./arrow-with-line-right-white.svg" alt="arrow" />
        </Link>
      </div>
    </div>
  );
};
