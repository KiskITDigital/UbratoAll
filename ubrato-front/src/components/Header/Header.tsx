import { FC, useEffect, useRef, useState } from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { useUserInfoStore } from '@/store/userInfoStore';
import { Avatar } from '@nextui-org/react';
import { useIsOrdererState } from '@/store/isOrdererStore';
import { Notifications } from '..';
import { updateToken } from '@/api';
import { CityModal } from '../CityModal/CityModal';
import axios from "axios";

export const Header: FC = () => {
  const userInfoStorage = useUserInfoStore();
  const isOrdererState = useIsOrdererState();

  const width: number | null = null;
  const widthR = useRef<number | null>(width);

  const fetchUser = userInfoStorage.fetchUser;
  const handleState = isOrdererState.handleState;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [city, setCity] = useState<string | undefined>('');
  const [geolocation, setGeolocation] = useState<{ lat: number, lon: number }>()

  const handleConfirm = () => {
    if (city) {
      localStorage.setItem('city', city);
      setConfirm(true);
    }
  };

  const setNewCity = (newCity: string) => {
    localStorage.setItem('city', newCity);
    setCity(newCity);
  };

  const avatarStyle = {
    base: styles.base,
    img: styles.avatarImg,
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      (async () => {
        await updateToken<void, undefined>(fetchUser, undefined);
      })();
    }
  }, [fetchUser]);

  useEffect(() => {
    handleState(userInfoStorage.user.is_contractor ? 'contractor' : 'orderer');
  }, [handleState, userInfoStorage.user.is_contractor]);

  useEffect(() => {
    if (window.outerWidth <= 450) {
      widthR.current = window.outerHeight;
    }

    if (localStorage.getItem('city')) {
      setCity(localStorage.getItem('city') || "")
      setConfirm(true)
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocation({ lat: position.coords.latitude, lon: position.coords.longitude })
      })
    }
  }, []);

  useEffect(() => {
    if (geolocation)
      axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${geolocation.lat}&lon=${geolocation.lon}&format=json`, {
        withCredentials: false
      }).then(response => {
        if (response.data?.address?.city)
          setCity(response.data?.address?.city)
      })
  }, [geolocation]);

  return (
    <header className={`${styles.container}`}>
      {isCityModalOpen && <CityModal setCity={setNewCity} setConfirm={setConfirm} setModal={setIsCityModalOpen} />}
      {!!widthR.current && isMenuOpen && (
        <div
          onClick={() => {
            setIsMenuOpen(false);
          }}
          className={styles.mobileMenuWrapper}
        >
          <div className={styles.mobileMenu}>
            <Link to="/create-tender">Создать тендер</Link>
            <Link to="/find-executor">Найти исполнителя</Link>
            <Link to="/alltenders">Найти тендер</Link>
            <Link to="/">Мои тендеры</Link>
            <Link to="/about">О сервисе</Link>
            <Link to="/">Правовая информация</Link>
          </div>
        </div>
      )}
      <div className={`container ${styles.mobileContainer}`}>
        <div className={styles.headerTop}>
          {widthR.current ? (
            <button
              className={styles.burger}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <img src="/burger_button.svg" alt="" />
            </button>
          ) : (
            ''
          )}
          <Link to="/">
            <img className={styles.logo} src={widthR.current ? '/logo-mobile.svg' : '/logo.svg'} alt="logo" />
          </Link>
          <div className={styles.headerTopLinks}>
            <Link to="/about">
              <p className={styles.text}>О сервисе</p>
            </Link>
            <a href="tel:88007756757">
              <p className={styles.text}>8 800-775-67-57</p>
            </a>
            <div className={styles.location}>
              <img src="/location.svg" alt="location" className="cursor-pointer" onClick={() => setIsCityModalOpen(true)} />
              <p className={styles.locationText}
                onClick={() => setConfirm(false)}
              >
                {city ? city : "Указать"}
              </p>
              {!confirm && city && (
                <div className={styles.cityConfirm}>
                  <p>Ваш город {city}?</p>
                  <div>
                    <button onClick={() => handleConfirm()}>Да</button>
                    <button
                      onClick={() => {
                        document.body.style.overflow = 'hidden';
                        setIsCityModalOpen(true);
                      }}
                    >
                      Нет
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <nav>
            <ul className={styles.navLinksList}>
              <li>
                <Link to="/create-tender" className={styles.navLink}>
                  <img src="/create-tender.svg" alt="create-tender" />
                  <p>Создать тендер</p>
                </Link>
              </li>
              <li>
                <Link to="/find-executor" className={styles.navLink}>
                  <img src="/find-executor.svg" alt="find-executor" />
                  <p>Найти исполнителя</p>
                </Link>
              </li>
              {(userInfoStorage.user.is_contractor || !userInfoStorage.isLoggedIn) && (
                <li>
                  <Link to="/alltenders" className={styles.navLink}>
                    <img src="/find-tender.svg" alt="my-tender" />
                    <p>Найти тендер</p>
                  </Link>
                </li>
              )}
              <li>
                <Link to="/profile/tenders" className={styles.navLink}>
                  <img src="/my-tenders.svg" alt="my-tenders" />
                  <p>Мои тендеры</p>
                </Link>
              </li>
            </ul>
          </nav>
          {!userInfoStorage.isLoggedIn && (
            <div className={styles.loginRegister}>
              <Link to="/login" className={styles.loginLink}>
                <img src="/login.svg" alt="login" />
                <p className={styles.loginText}>Вход</p>
              </Link>
              {widthR.current ? (
                ''
              ) : (
                <Link to="/register" className={styles.registrationLink}>
                  <p className={styles.registrationText}>Регистрация</p>
                </Link>
              )}
            </div>
          )}
          {userInfoStorage.isLoggedIn && (
            <div className={styles.notifContainer}>
              <Link to="/profile" className={styles.profileLink}>
                <div className={styles.orgInfo}>
                  <p className={styles.organizationText}>
                    {userInfoStorage.user.organization.short_name}
                  </p>
                  <p className={styles.organizationText}>
                    ИНН {userInfoStorage.user.organization.inn}
                  </p>
                </div>
                <Avatar
                  src={userInfoStorage.user.avatar}
                  classNames={avatarStyle}
                  name={userInfoStorage.user.first_name}
                />
              </Link>
              <Notifications />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
