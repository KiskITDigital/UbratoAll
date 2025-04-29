import { FC, RefObject, useEffect } from 'react';
import styles from './notificationslist.module.css';
import { useNotificationsStore } from '@/store/notificationsStore';
import { Link } from 'react-router-dom';

export const NotificationsList: FC<{
  closeList: (state: boolean) => void;
  listRef: RefObject<HTMLDivElement>;
}> = ({ closeList, listRef }) => {
  const notificationsStore = useNotificationsStore();



  return (
    <div tabIndex={1} ref={listRef} className={`${styles.container} `}>
      <div className={styles.scroll}>
        {notificationsStore.notifications.notifications.map(
          (e) =>
            !e.read && (
              <div key={e.id} className={`${styles.listItem}`}>
                {e.header}
                <button onClick={() => notificationsStore.setNotificationRead(e.id)}>
                  <img src="/x-icon.svg" alt="" />
                </button>
              </div>
            )
        )}
        {notificationsStore.notifications.total === 0 && <p>Новых уведомлений нет</p>}
        <Link onClick={() => closeList(false)} to="./profile/notifications" className={styles.link}>
          Смотреть все
        </Link>
      </div>
    </div>
  );
};
