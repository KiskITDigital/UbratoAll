import { FC, useEffect, useState } from 'react';
import styles from './style.module.css';
import { OpportunitiesCard } from '@/components';
import { useIsOrdererState } from '@/store/isOrdererStore';
import { Executor, OpportunitiesInfoT, Orderer } from '@/textData/textData';
import { useUserInfoStore } from '@/store/userInfoStore';

export const AboutTasks: FC = () => {
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
    <div className={`${styles.container} max-w-[1130px] p-10 flex gap-20`}>
      <div className="flex flex-col gap-[30px]">
        <h2 className={styles.header}>
          Какие задачи решает <span className={styles.blueText}>Ubrato</span>
        </h2>
        <div className="bg-white rounded-[17px] flex w-fit self-center">
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
      </div>
      {ordererState.role === 'orderer' && (
        <div className="flex flex-col justify-center items-center gap-[30px] max-w-[1130px]">
          <h2 className={styles.develop_header}>
            <span className={styles.blueText}>Ubrato</span> поможет
          </h2>
          <div className="flex w-full gap-5">
            <div className={styles.list_elem}>
              <img className="size-[50px] min-w-[50px]" src="./arrow.png" alt="" />
              <p className=" text-wrap">Сориентироваться на рынке клининга</p>
            </div>
            <div className={styles.list_elem}>
              <img className="size-[50px] min-w-[50px]" src="./person.png" alt="" />
              <p>Найти нового подрядчика для вашей организации</p>
            </div>
            <div className={styles.list_elem}>
              <img className="size-[50px] min-w-[50px]" src="./graphs.png" alt="" />
              <p>Быть в курсе актуальных цен на услуги клининга</p>
            </div>
          </div>
        </div>
      )}

      {ordererState.role === 'contractor' && (<div className={styles.develop_container}>
        <h2 className={styles.develop_header}>
          <span className={styles.blueText}>Ubrato</span> поможет
        </h2>
        <div className={styles.develop_list}>
          <div className={styles.list_elem}><img src="./person.png" alt="" /> <p>Найти новых клиентов</p></div>
          <div className={styles.list_elem}><img src="./likes.png" alt="" /> <p>Заработать репутацию надёжного партнёра</p></div>
          <div className={styles.list_elem}><img src="./graphs.png" alt="" /> <p>Сравнить себя с конкурентами</p></div>
        </div>
      </div>
      )}
    </div>
  );
};
