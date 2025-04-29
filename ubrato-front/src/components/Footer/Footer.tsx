import { FC } from 'react';
import styles from './footer.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserInfoStore } from '@/store/userInfoStore';
import { useIsOrdererState } from '@/store/isOrdererStore';

export const Footer: FC = () => {
  const userInfoStorage = useUserInfoStore();
  const ordererState = useIsOrdererState();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    userInfoStorage.setLoggedIn(false);
    navigate('/');
  };

  return (
    <footer className={`container ${styles.container}`}>
      <div className={styles.footerTop}>
        <div className={styles.imgcontainer}>
          <img src="/minilogo2.png" className={styles.minilogo} alt="minilogo" />
          <img src="/logo.svg" className={styles.logo} alt="logo" />
        </div>
        {!userInfoStorage.isLoggedIn && (
          <div className={styles.loginRegister}>
            <Link to="/login" className={styles.loginLink}>
              <img src="/login.svg" alt="login" />
              <p className={styles.loginText}>Вход</p>
            </Link>
            <Link to="/register" className={styles.registrationLink}>
              <p className={styles.registrationText}>Регистрация</p>
            </Link>
          </div>
        )}
        {userInfoStorage.isLoggedIn && !location.pathname.includes('profile') && (
          <div className="flex gap-[20px]">
            <Link to="/profile" className={styles.registrationLink}>
              <p className={styles.registrationText}>Личный кабинет</p>
            </Link>
            <button className="rounded-[10px] border-[#070c2c]/[.1] border-[1px] py-[9px] px-[14px] text-[var(--color-black-60)]" onClick={handleLogOut}>
              Выйти
            </button>
          </div>
        )}
      </div>
      <div className={styles.footerUnder}>
        <div className={styles.column}>
          <p className={styles.footercolumn}>Возможности</p>
          <ul>
            {/* {userInfoStorage.user} */}
            {!userInfoStorage.isLoggedIn && (
              <li>
                <Link to="/about" onClick={() => ordererState.handleState('contractor')} state={{ toReload: null }}>
                  <p className={styles.point}>Стать заказчиком</p>
                </Link>
              </li>)
            }
            {(!userInfoStorage.user || !userInfoStorage.user.is_contractor) && (
              <li>
                <Link to="/about" onClick={() => ordererState.handleState('contractor')} state={{ toReload: null }}>
                  <p className={styles.point}>Стать исполнителем</p>
                </Link>
              </li>)
            }
            <li>
              <Link to="/create-tender">
                <p className={styles.point}>Создать тендер</p>
              </Link>
            </li>
            <li>
              <Link to="/alltenders">
                <p className={styles.point}>Найти тендер</p>
              </Link>
            </li>
            <li>
              <Link to="/find-executor">
                <p className={styles.point}>Найти исполнителя</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <p className={styles.footercolumn}>Информация</p>
          <ul>
            <li>
              <Link to="/" state={{ to: "catalog" }}>
                <p className={styles.point}>Каталог</p>
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => ordererState.handleState('orderer')} state={{ toReload: null }}>
                <p className={styles.point}>Заказчикам</p>
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => ordererState.handleState('contractor')} state={{ toReload: null }}>
                <p className={styles.point}>Исполнителям</p>
              </Link>
            </li>
            {/* <li>
              <Link to="/">
                <p className={styles.point}>Отзывы об исполнителях</p>
              </Link>
            </li> */}
            <li>
              <Link to="/" state={{ to: "questions" }}>
                <p className={styles.point}>Частые вопросы</p>
              </Link>
            </li>
            <li>
              <Link to="/knowledge-base">
                <p className={styles.point}>База знаний</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <p className={styles.footercolumn}>Об Ubrato</p>
          <ul>
            <li>
              <Link to="/about">
                <p className={styles.point}>О сервисе</p>
              </Link>
            </li>
            <li>
              <Link to="/contacts" state={{ isHelp: false, previousPage: location.pathname }}>
                <p className={styles.point}>Контакты</p>
              </Link>
            </li>
            <li>
              <Link to="/contacts" state={{ isHelp: true, previousPage: location.pathname }}>
                <p className={styles.point}>Помощь</p>
              </Link>
            </li>
            <li>
              <a target="_blank" href='https://yandex.ru/maps/213/moscow/stops/station__9858857/?ll=37.627860%2C55.685608&tab=overview&z=15'>
                <p className={styles.point}>Карта сайта</p>
              </a>
            </li>
            <li>
              <Link target="_blank" to="/rights?document=1">
                <p className={styles.point}>Правовая информация</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${styles.column} ${styles.supportService}`}>
          <p className={styles.footercolumn}>Служба поддержки</p>
          <ul>
            <li>
              <a className={styles.bluetext} href='tel:88007756757'>
                8 800-775-67-57
              </a>
              <p className={styles.pointtwo}>Время работы с 9:00 до 21:00 по Московскому времени</p>
            </li>
            <li>
              <a href="mailto:info@ubrato.ru">
                <p className={styles.bluetext}>info@ubrato.ru</p>
              </a>
              <p className={styles.pointtwo}>Вопросы и предложения по работе сервиса</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.line}>
        <Link target="_blank" to="/rights?document=1">
          <p className={styles.confidental}>Политика обработки персональных данных</p>
        </Link>
        <Link target="_blank" to="/rights?document=2">
          <p className={styles.confidental}>Пользовательское соглашение</p>
        </Link>
        <Link target="_blank" to="/rights?document=3">
          <p className={styles.confidental}>Согласие на обработку персональных данных</p>
        </Link>
      </div>
      <div className={styles.last}>
        <p className={styles.greytext}>
          © 2024 ООО “Интеграция”{' '}
          <Link to="/" className={styles.greytext}>
            (ubrato.ru)
          </Link>
        </p>
      </div>
    </footer>
  );
};
