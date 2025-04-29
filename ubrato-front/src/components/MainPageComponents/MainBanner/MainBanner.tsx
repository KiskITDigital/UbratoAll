import { FC, useEffect, useState } from 'react';
import styles from './mainbanner.module.css';
import styles2 from './mainbanner2.module.css';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useUserInfoStore } from '@/store/userInfoStore';
import { useCreateTenderState } from '@/store/createTenderStore';

export const MainBanner: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ playOnInit: false, delay: 3000 }),
  ]);

  const [isPlaying, setIsPlaying] = useState(true);

  const userStore = useUserInfoStore();

  const [showNotification, setShowNotification] = useState(false);

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (window.outerWidth <= 450) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    if (isPlaying) {
      if (typeof autoplay.play === 'function') {
        autoplay.play();
      }
    } else {
      if (typeof autoplay.stop === 'function') {
        autoplay.stop();
      }
    }
  }, [emblaApi, isPlaying]);

  const [newTenderName, setNewTenderName] = useState('');

  const createTenderState = useCreateTenderState()

  return (
    <div className={`container ${styles.mobileContainer}`}>
      {(!(userStore.isLoggedIn && userStore.user.is_contractor) || userStore.passedSurvey) && (
        <div className={` ${styles.container}`}>
          <div>
            <h1 className={styles.header}>
              <span className={styles.blueText}>Весь рынок</span> клининга на одной площадке
            </h1>
            <p className={styles.agregator}>Агрегатор клининга</p>
            <div className={styles.createTender}>
              <input
                onFocus={() => {
                  setIsPlaying(false);
                  if (!userStore.isLoggedIn) {
                    setShowNotification(true);
                  }
                }}
                onBlur={() => {
                  setIsPlaying(true);
                }}
                value={newTenderName}
                onChange={(e) => setNewTenderName(e.currentTarget.value)}
                className={styles.createTenderInput}
                id="tender_text"
                type="text"
                name="tender_text"
                placeholder={mobile ? 'Создать тендер' : 'Опишите задачу или объект'}
              />
              {userStore.isLoggedIn ? (<Link
                onClick={() => {
                  createTenderState.handleSimpleInput('name', newTenderName);
                  setNewTenderName('');
                }}
                to="/create-tender"
              >
                <button className={styles.createTenderBtn}>
                  {mobile ? <img src="/arrow-with-line-right-white.svg" /> : 'Создать тендер'}
                </button>
              </Link>) : (
                <button
                  onClick={() => {
                    if (!userStore.isLoggedIn) {
                      setShowNotification(true);
                    }
                  }}
                  className={styles.createTenderBtn}>
                  {mobile ? <img src="./arrow-with-line-right-white.svg" /> : 'Создать тендер'}
                </button>)}
              {showNotification && (
                <div className={styles.notification}>
                  <p>Чтобы создать тендер, <Link to={'/login'}><span className={`${styles.blueText} ${styles.text_underline} `}>войдите на сайт.</span></Link></p>
                  <Link to={'/faq?page=3&number=4#q3_4'}>
                    <p className={`${styles.blueText} ${styles.text_underline} `}>
                      Узнать, как создать тендер
                    </p>
                  </Link>
                  <button
                    className={styles.closeButton}
                    onClick={() => setShowNotification(false)}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            <div className={styles.exampleSearchContainer}>
              <p className={styles.exampleSearch}>Например, </p>
              <p className={`${styles.exampleSearch}`}>
                генеральная уборка
              </p>
            </div>
          </div>
          <img className={styles.image} src="./banner-image.png" alt="big-man" />
        </div>
      )}
      {userStore.isLoggedIn && userStore.user.is_contractor && !userStore.passedSurvey && (
        <div className={`${styles.embla}`}>
          <div className={`${styles.embla__viewport}`} ref={emblaRef}>
            <div className={styles.embla__container}>
              <div className={`${styles.embla__slide} ${styles.container}`}>
                <div>
                  <h1 className={styles.header}>
                    <span className={styles.blueText}>Весь рынок</span> клининга на одной площадке
                  </h1>
                  <p className={styles.agregator}>Агрегатор клининга</p>
                  <div className={styles.createTender}>
                    <input
                      onFocus={() => {
                        setIsPlaying(false);
                        if (!userStore.isLoggedIn) {
                          setShowNotification(true);
                        }
                      }}
                      onBlur={() => {
                        setIsPlaying(true);
                      }}
                      value={newTenderName}
                      onChange={(e) => setNewTenderName(e.currentTarget.value)}
                      className={styles.createTenderInput}
                      type="text"
                      id="tender_text"
                      name="tender_text"
                      placeholder={mobile ? 'Создать тендер' : 'Опишите задачу или объект'}
                    />

                    {userStore.isLoggedIn ? (<Link
                      onClick={() => {
                        createTenderState.handleSimpleInput('name', newTenderName);
                        setNewTenderName('');
                      }}
                      to="/create-tender"
                    >
                      <button className={styles.createTenderBtn}>
                        {mobile ? <img src="/arrow-with-line-right-white.svg" /> : 'Создать тендер'}
                      </button>
                    </Link>) : (
                      <button
                        onClick={() => {
                          if (!userStore.isLoggedIn) {
                            setShowNotification(true);
                          }
                        }}
                        className={styles.createTenderBtn}>
                        {mobile ? <img src="./arrow-with-line-right-white.svg" /> : 'Создать тендер'}
                      </button>)}
                    {showNotification && (
                      <div className={styles.notification}>
                        <Link to={'/login'}> <p>Чтобы создать тендер, <span className={`${styles.blueText} ${styles.text_underline} `}>войдите на сайт.</span></p></Link>
                        <Link to={'/'}><p className={`${styles.blueText} ${styles.text_underline} `}>Узнать, как создать тендер</p></Link>
                        <button
                          className={styles.closeButton}
                          onClick={() => setShowNotification(false)}
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={styles.exampleSearchContainer}>
                    <p className={styles.exampleSearch}>Например, </p>
                    <p className={`${styles.exampleSearch}`}>
                      генеральная уборка
                    </p>
                  </div>
                </div>
                <img className={styles.image} src="./banner-image.png" alt="big-man" />
              </div>
              <div className={`${styles.embla__slide} ${styles2.slide2}`}>
                <div className={styles2.textBlock}>
                  <h2 className={`${styles2.surveyTitle} ${styles2.blueText}`}>Онлайн опрос</h2>
                  <div className={styles2.survey__pair}>
                    <img
                      className={styles2.survey__pair__image}
                      src="./survey/check-mark.svg"
                      alt=""
                    />
                    <p className={styles2.survey__pair__text}>Примите участие в опросе</p>
                  </div>
                  <div className={styles2.survey__pair}>
                    <img
                      className={styles2.survey__pair__image}
                      src="./survey/arrow-down.svg"
                      alt=""
                    />
                    <p className={styles2.survey__pair__text}>Получите исследование в подарок</p>
                  </div>
                  <div className={styles2.survey__pair}>
                    <img className={styles2.survey__pair__image} src="./survey/heart.svg" alt="" />
                    <p className={styles2.survey__pair__text}>
                      Давайте улучшим <span className={styles2.blueText}>Ubrato</span> вместе!
                    </p>
                  </div>
                  <Link to="survey">
                    <button className={styles2.survey__button}>
                      Участвовать!{' '}
                      <img
                        className={styles2.survey__button__image}
                        src="./survey/arrow-right.svg"
                        alt=""
                      />
                    </button>
                  </Link>
                </div>
                <img className={styles2.image} src="./survey/laptop.png" alt="laptop" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


