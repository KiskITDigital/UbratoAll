import { FC, useEffect, useState } from 'react';
import styles from './style.module.css';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export const AboutHeader: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ playOnInit: false, delay: 3000 }),
  ]);

  const [isPlaying, setIsPlaying] = useState(true);

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

  return (
    <div className={`container ${styles.mobileContainer}`}>
      <div className={` ${styles.container}`}>
        <div>
          <h1 className={styles.header}>
            {/* <span className={styles.blueText}>Весь рынок</span> клининга на одной площадке */}
            О сервисе <span className={styles.blueText}>Ubrato</span>
          </h1>
          <p className={styles.agregator}> <span className={styles.blueText}>Ubrato</span> — площадка для заказчиков и исполнителей клининговых услуг. <span className={styles.span_marginBlock}></span>
            Мы создали <span className={styles.blueText}>профильный агрегатор</span>, чтобы рынок клининга стал чище, а поиск партнёров быстрее и легче. Чтобы быть уверенными в опыте партнёров и качестве услуг, мы работаем только с юридическими лицами.</p>
        </div>
        <img className={styles.image} src="./muzhik.png" alt="big-muzhik" />
        {/* muzhik */}
      </div>
    </div>
  );
};
