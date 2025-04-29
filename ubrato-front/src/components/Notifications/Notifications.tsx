import { FC, useEffect, useRef, useState } from 'react';
import styles from './notifications.module.css';
import { useNotificationsStore } from '@/store/notificationsStore';
import { NotificationsList } from '../NotificationsList/NotificationsList';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { updateToken } from '@/api';

export const Notifications: FC = () => {
  const notificationsStore = useNotificationsStore();

  const fetchNotifications = notificationsStore.fetchNotifications;
  const [isDisplayed, setIsDisplayed] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const protalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateToken<void, null>(fetchNotifications, null);
  }, [fetchNotifications]);

  return (
    <div className={styles.container}>
      <Popover
        isOpen={isDisplayed}
        onOpenChange={(open) => setIsDisplayed(open)}
        portalContainer={protalRef.current ?? document.body}
      >
        <PopoverTrigger>
          <div className={styles.trigger}>
            <button>
              <img className={styles.img} src="/bell.svg" alt="" />
            </button>
            <div className={styles.count}>{notificationsStore.notifications.total}</div>
            <div className={styles.content} ref={protalRef}></div>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <NotificationsList listRef={listRef} closeList={setIsDisplayed} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
