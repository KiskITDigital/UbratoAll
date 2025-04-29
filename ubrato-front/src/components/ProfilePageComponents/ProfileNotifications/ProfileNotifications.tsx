import { useNotificationsStore } from "@/store/notificationsStore";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import s from "./styles.module.css";

export const ProfileNotifications: FC = () => {
  const notificationsStore = useNotificationsStore();
  // console.log(notificationsStore.notifications.notifications);

  const handleNotificationClick = (id: number) => {
    notificationsStore.setNotificationRead(id);
    notificationsStore.toggleNotificationExpansion(id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isExpanded = (id: number) => {
    return useNotificationsStore.getState().expandedIds.includes(id);
  };


  const toDate = (date: string) => {
    const timestamp = date;
    const newDate = new Date(Date.parse(timestamp));
    newDate.setHours(0, 0, 0, 0);
    const formattedDate = newDate.toISOString().split("T")[0];
    return formattedDate;
  };

  return (
    <div>
      <h1 className={s.title}>Уведомления</h1>
      {notificationsStore.notifications.notifications.map((e) => (
        <div
          className={s.notification_container}
          onClick={() => handleNotificationClick(e.id)}
          key={e.id}
        >
          <div className={s.header_line}>
            <div className={s.created_at}>{toDate(e.created_at)}</div>
            <div className={s.content}>

              <h2 className={`${s.notification_header} ${isExpanded(e.id) ? s.notification_header_expanded : ''}`}>{e.header}</h2>
              {isExpanded(e.id) && <div className={s.message}>{e.msg}
                {e.href && (
                  <Link
                    className="underline text-red-400"
                    to={e.href.replace("https://ubrato.ru", "")}
                  >
                    {e.href_text}
                  </Link>
                )}
              </div>}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};
