import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Notification } from '@codecharacter-2023/client';
import styles from './Notifs.module.css';
import notifIcon from '../../assets/notification.svg';

import {
  getNotifAction,
  markNotifAction,
  notifs as notifications,
  unreadNotifs as unreadNotifications,
} from '../../store/Notifs/notifSlice';

const Notifs: React.FunctionComponent = () => {
  const notifModalRef = useRef<HTMLDivElement>(null);
  const notifIconRef = useRef<HTMLDivElement>(null);
  const notifTriangleRef = useRef<HTMLDivElement>(null);
  const notifs = useAppSelector<Notification[]>(notifications)
    .slice()
    .reverse();
  const unreadNotifs = useAppSelector<number>(unreadNotifications);
  const hookDispatch = useAppDispatch();

  useEffect(() => {
    hookDispatch(getNotifAction());
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const eventTarget = e.target as HTMLElement;
      if (
        !notifModalRef.current?.contains(eventTarget) &&
        !notifIconRef.current?.contains(eventTarget) &&
        notifModalRef.current?.classList.contains(styles.notifModalShow)
      ) {
        toggleNotifModal();
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [unreadNotifs]);
  const toggleNotifModal = () => {
    if (
      notifModalRef.current?.classList.contains(styles.notifModalShow) &&
      unreadNotifs > 0
    ) {
      hookDispatch(markNotifAction());
    }
    notifModalRef.current?.classList.toggle(styles.notifModalShow);
    notifIconRef.current?.classList.toggle(styles.notifIconShow);
    notifTriangleRef.current?.classList.toggle(styles.notifTriangleShow);
  };

  const parseDate = (date: Date) => {
    const createdDate = new Date(date);
    const diff = Math.round(
      (new Date().getTime() - createdDate.getTime()) / (1000 * 3600 * 24),
    );
    const dateDiff =
      diff === 0 ? `Today` : diff === 1 ? `Yesterday` : `${diff} days`;
    return `${dateDiff}`;
  };

  const parseTime = (date: Date) => {
    const createdDate = new Date(date);
    return `${createdDate.getHours()}:${createdDate.getMinutes()}`;
  };

  return (
    <>
      <div
        className={styles.notifIconContainer}
        ref={notifIconRef}
        onClick={toggleNotifModal}
      >
        <img
          src={notifIcon}
          title="Notifications"
          className={styles.notifIcon}
          alt="BellIcon"
        />
        {unreadNotifs > 0 ? (
          <div className={styles.notifUnreadCounter}>{unreadNotifs}</div>
        ) : null}
      </div>
      <div className={styles.notifModalTriangle} ref={notifTriangleRef}></div>
      <div className={styles.notifModal} ref={notifModalRef}>
        {notifs.length > 0 ? (
          notifs.map((notif: Notification) => {
            return (
              <div
                className={`${styles.notif} ${
                  !notif.read ? '' : styles.notifRead
                }`}
                key={notif.id}
              >
                <div className={styles.notifLine}>
                  <h5 className={styles.notifHeader}>{notif.title}</h5>
                  <div className={styles.notifTimeSection}>
                    <p className={styles.notifTime}>
                      {parseTime(notif.createdAt)}
                    </p>
                    <p className={styles.notifTime}>
                      {parseDate(notif.createdAt)}
                    </p>
                  </div>
                </div>
                <div className={styles.notifLine}>
                  <p className={styles.notifContent}>{notif.content}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.notifTextContainer}>
            <p className={styles.notifText}>No notifications</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Notifs;
