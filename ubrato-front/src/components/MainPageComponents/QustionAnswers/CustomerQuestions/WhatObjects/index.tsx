import { FC } from 'react';
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import { Link } from 'react-router-dom';

const WhatObjects: FC = () => {
  return (
    <div className={qstyles.container}>
      <p className={qstyles.startText}>
        Для удобства формирования заявки можно указать объект, которым управляет ваша компания.
        Сейчас в каталоге Ubrato есть 14 типов объектов:
      </p>
      <ul className={qstyles.mb20}>
        <li className={qstyles.li}>Офисные объекты;</li>
        <li className={qstyles.li}>Производственные объекты;</li>
        <li className={qstyles.li}>Складские объекты;</li>
        <li className={qstyles.li}>Торговые объекты;</li>
        <li className={qstyles.li}>Жилые объекты;</li>
        <li className={qstyles.li}>Природные объекты;</li>
        <li className={qstyles.li}>Спортивно-оздоровительные объекты;</li>
        <li className={qstyles.li}>Объекты образования;</li>
        <li className={qstyles.li}>Объекты здравоохранения;</li>
        <li className={qstyles.li}>Объекты культурного наследия;</li>
        <li className={qstyles.li}>Объекты группы HoReCa (гостиницы, рестораны и кафе);</li>
        <li className={qstyles.li}>Территории;</li>
        <li className={qstyles.li}>Транспорт;</li>
        <li className={qstyles.li}>Транспортная инфраструктура.</li>
      </ul>
      <p className={qstyles.text}>
        На сайте зарегистрированы исполнители, работающие как локально — в одном городе или регионе,
        так и в нескольких регионах или по всей территории России. Укажите в заявке, где расположен
        ваш объект.
      </p>
      <div className={qstyles.seeAlso}>
        <p className={qstyles.title}>Смотрите также:</p>
        <Link to="/faq?page=3&number=4#q3_4" className={`${qstyles.link} ${qstyles.ml20}`}>
          Как создать тендер?
        </Link>
      </div>
    </div>
  );
};

export default WhatObjects;
