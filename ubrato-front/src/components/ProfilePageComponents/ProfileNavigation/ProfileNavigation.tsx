/// <reference types="vite-plugin-svgr/client" />
import { AvatarInput } from '@/components/AvatarInput/AvatarInput';
import { useUserInfoStore } from '@/store/userInfoStore';
import { FC, useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styles from './profilenav.module.css';
import {
  DocumentsIC,
  HeartIC,
  LogoutIC,
  SurveyIC,
  CompanyProfiveIC,
  BellIC,
  SettingsIC,
  TenderIC,
  HelpIC,
} from './icons';

export const ProfileNavigation: FC = () => {
  const userStore = useUserInfoStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState('');
  // const [, set] = useState(true);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    userStore.setLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    setPage(location.pathname);
  }, [location]);

  return (
    <div className={styles.container}>
      {/* <button
        onClick={() => set(!)}
        className={`${styles.menuBtn} ${ ? '' : styles.menuBtnActive}`}
      >
        <img src="/profile-menu-btn.svg" alt="" />
      </button> */}

      <div className={styles.avatar}>
        <AvatarInput />
      </div>

      <div className={styles.info}>
        <p>{userStore.user.organization.short_name}</p>
        <p>
          ИНН <span className={styles.blueText}>{userStore.user.organization.inn}</span>
        </p>
      </div>

      <div className={styles.links}>
        {userStore.user.is_contractor && !userStore.passedSurvey && (
          <Link to="/survey" className={`${styles.link}`}>
            <SurveyIC />
            Анкета
          </Link>
        )}
        <Link
          to=""
          className={`${styles.link} ${!page.includes('profile/') ? styles.active : ''} `}
        >
          <CompanyProfiveIC />
          Профиль компании
        </Link>
        <Link
          className={`${styles.link} ${styles.sublink} ${
            page.includes('orderer') && !page.includes('tenders') ? styles.active : ''
          }`}
          to="orderer"
        >
          Заказчик
        </Link>
        {userStore.user.is_contractor ? (
          <Link
            className={`${styles.link} ${styles.sublink} ${
              page.includes('contractor') && !page.includes('tenders') ? styles.active : ''
            }`}
            to="contractor"
          >
            Исполнитель
          </Link>
        ) : (
          <Link
            className={`${styles.link} ${styles.sublink} ${styles.become_link__padding}`}
            to="become-contractor"
          >
            <p className={styles.become_link}>Стать исполнителем</p> 
          </Link>
        )}
        <Link
          to="tenders"
          className={`${styles.link} ${
            page.includes('tenders') && !page.includes('tenders/') ? styles.active : ''
          } `}
        >
          <TenderIC />
          Мои тендеры
        </Link>
        <Link
          className={`${styles.link} ${styles.sublink} ${
            page.includes('tenders/orderer') ? styles.active : ''
          }`}
          to="tenders/orderer"
        >
          Заказчик
        </Link>
        {userStore.user.is_contractor && (
          <Link
            className={`${styles.link} ${styles.sublink} ${
              page.includes('tenders/contractor') ? styles.active : ''
            }`}
            to="tenders/contractor"
          >
            Исполнитель
          </Link>
        ) 
        // : (
        //   <Link
        //     className={`${styles.link} ${styles.sublink} ${styles.become_link__padding}`}
        //     to="documents"
        //   >
        //     <p className={styles.become_link}>Стать исполнителем</p> 
        //   </Link>
        // )
        }
        <Link
          to="favourite"
          className={`${styles.link} ${page.includes('favourite') ? styles.active : ''}`}
        >
          <HeartIC />
          Избранное
        </Link>
        <Link
          to="notifications"
          className={`${styles.link} ${page.includes('notifications') ? styles.active : ''} `}
        >
          <BellIC />
          Уведомления
        </Link>
        <Link
          to="documents"
          className={`${styles.link} ${page.includes('documents') ? styles.active : ''} `}
        >
          <DocumentsIC />
          Документы
        </Link>
        <Link
          to="settings"
          className={`${styles.link} ${page.includes('settings') ? styles.active : ''} `}
        >
          <SettingsIC />
          Настройки аккаунта
        </Link>
        <Link to="help" className={`${styles.link} ${page.includes('help') ? styles.active : ''} `}>
          <HelpIC />
          Помощь
        </Link>
      </div>

      <button className={styles.logout} onClick={handleLogOut}>
        <LogoutIC />
        Выйти
      </button>
    </div>
  );
};
