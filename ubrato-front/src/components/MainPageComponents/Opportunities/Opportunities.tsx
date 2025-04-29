import { FC, useEffect, useState } from 'react';
import styles from './opportunities.module.css';
import { OpportunitiesCard } from '@/components';
import { useIsOrdererState } from '@/store/isOrdererStore';
import { Executor, OpportunitiesInfoT, Orderer } from '@/textData/textData';
import { useUserInfoStore } from '@/store/userInfoStore';

export const Opportunities: FC = () => {
  const ordererState = useIsOrdererState();
  const userState = useUserInfoStore();
  const [info, setInfo] = useState<OpportunitiesInfoT[]>(Orderer);

  function handleInfo() {
    if (ordererState.role === 'orderer') {
      ordererState.handleState('contractor');
      setInfo(Executor);
    } else {
      ordererState.handleState('orderer');
      setInfo(Orderer);
    }
  }

  useEffect(() => {
    if (userState.user.is_contractor) {
      setInfo(Executor);
    } else setInfo(Orderer);
  }, [userState.user.is_contractor]);

  return (
    <div className={`container ${styles.container}`}>
      <h2 className={styles.header}>
        Возможности <span className={styles.blueText}>Ubrato</span>
      </h2>
      <p className={styles.text}>
        {ordererState.role === 'contractor'
          ? `На площадке Ubrato публикуются тендеры от надежных заказчиков. Клининг офиса, высотные работы, уборка после ремонта или мероприятия — здесь можно найти заказ для клининговой компании любого профиля и масштаба.`
          : `Ubrato объединяет клининговые компании разного профиля и масштаба. Клининг офиса, высотные
          работы, уборка после стройки или мероприятия — найдите исполнителя удобным для вас способом.`}
      </p>
      <div className={styles.btnsContainer}>
        <button
          onClick={() => {
            handleInfo();
          }}
          disabled={ordererState.role === 'orderer'}
          className={`${styles.button}`}
        >
          Для заказчика
        </button>
        <button
          onClick={() => {
            handleInfo();
          }}
          disabled={ordererState.role === 'contractor'}
          className={`${styles.button}`}
        >
          Для исполнителя
        </button>
      </div>
      <div className={styles.info}>
        {info.map((e, ix) => (
          <OpportunitiesCard
            key={ix}
            title={e.title}
            text={e.text}
            image={e.image}
            btnText={e.btnText}
            link={e.link}
          />
        ))}
      </div>
    </div>
  );
};
