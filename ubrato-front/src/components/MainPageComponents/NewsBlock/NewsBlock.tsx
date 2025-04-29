import { FC } from 'react';
import styles from './newsblock.module.css';

interface NewsItemProps {
  date: string;
  text: string;
  imageSrc: string;
}

const NewsItem: FC<NewsItemProps> = ({ date, text }) => (
  <div className={styles.newsItem}>
    {/* <img src={imageSrc} alt="News" className={styles.newsImage} /> */}
    <div className={styles.blockcontent}>
      <div className={styles.blockdate}>{date}</div>
      <div className={styles.blocktext}>{text}</div>
    </div>
  </div>
);

export const NewsBlock: FC = () => (
  <div className={`container ${styles.container}`}>
    <div className={styles.newsBlock}>
      <h2 className={styles.header}>
        Новости <span className={styles.blueText}>Ubrato</span>
      </h2>
      <div className={styles.newsItems}>
        <NewsItem
          date="13.12.2023 в 13:00"
          text="Новые тендеры на клининговые услуги: возможности для роста бизнеса в условиях пандемии"
          imageSrc="./newsimg1.png"
        />
        <NewsItem
          date="11.12.2023 в 9:00"
          text="Государственные и муниципальные учреждения увеличивают спрос на услуги клининга: анализ текущих тендеров и перспективы"
          imageSrc="./newsimg2.png"
        />
        <NewsItem
          date="9.12.2023 в 21:40"
          text="Эко-тенденции в клининговой индустрии: как забота о природе может стать конкурентным преимуществом на рынке"
          imageSrc="./newsimg3.png"
        />
      </div>
    </div>
  </div>
);
