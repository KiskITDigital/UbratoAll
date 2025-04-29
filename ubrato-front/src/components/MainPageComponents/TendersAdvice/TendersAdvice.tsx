import { FC, useCallback, useEffect, useRef } from 'react';
import { ArrowControl } from '@/components';
import styles from './tendersadvice.module.css';
import { useIsOrdererState } from '../../../store/isOrdererStore';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import TendersAdviceExecutors from '../TendersAdviceExecutors';
import TendersAdvicesTenders from '../TendersAdviceTenders';

export const TendersAdvice: FC = () => {
  const ordererState = useIsOrdererState();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 22 });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const width: number | null = null;
  const widthR = useRef<number | null>(width);

  useEffect(() => {
    if (window.outerWidth <= 450) {
      widthR.current = window.outerHeight;
    }
  }, []);



  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>
          {/* {role === 'orderer' ? 'Исполнители' : 'Тендеры'}{' '} */}
          {ordererState.role === 'orderer' ? 'Исполнители' : 'Тендеры'}{' '}
          <span className={styles.blueText}>Ubrato</span>
        </h2>
        <p className={styles.headerText}>
          {ordererState.role === 'orderer'
            ? 'Исполнители проходят проверку администрацией сайта Ubrato и оцениваются заказчиками по итогам выполнения тендеров'
            : 'Найдите подходящий тендер, задайте уточняющий вопрос заказчику, согласуйте стоимость, откликнитесь и становитесь исполнителем'}
        </p>
      </div>
      {/* <div className={styles.btnsContainer}>
        <button
          onClick={handleInfo}
          disabled={role === 'orderer'}
          className={styles.button}
        >
          Для заказчика
        </button>
        <button
          onClick={handleInfo}
          disabled={role === 'contractor'}
          className={styles.button}
        >
          Для исполнителя
        </button>
      </div> */}
      <div className={styles.carouselContainer}>
        {!widthR.current && (
          <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={emblaRef}>
              {
                ordererState.role === 'orderer' ?
                  <TendersAdviceExecutors />
                  :
                  <TendersAdvicesTenders />
              }
            </div>
            <button className={styles.embla__prev} onClick={scrollPrev}>
              <ArrowControl image="./arrow-left.svg" />
            </button>
            <button className={styles.embla__next} onClick={scrollNext}>
              <ArrowControl image="./arrow-right.svg" />
            </button>
          </div>
        )}
        {widthR.current && (
          <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={emblaRef}>
              {ordererState.role === 'orderer' ?
                <TendersAdviceExecutors isMobile={true} />
                :
                <TendersAdvicesTenders isMobile={true} />
              }
            </div>
            <button className={styles.embla__prev} onClick={scrollPrev}>
              <ArrowControl image="./arrow-left.svg" />
            </button>
            <button className={styles.embla__next} onClick={scrollNext}>
              <ArrowControl image="./arrow-right.svg" />
            </button>
          </div>
        )}
      </div>
      <div className={styles.btnContainer}>
        <Link to={ordererState.role === 'orderer' ? "/find-executor" : "/alltenders"} className={styles.btn}>
          <p className={styles.btnText}>
            {ordererState.role === 'orderer' ? 'Найти исполнителя' : 'Найти тендер'}
          </p>
          <img src="./arrow-with-line-right-white.svg" alt="arrow" />
        </Link>
      </div>
    </div>
  );
};