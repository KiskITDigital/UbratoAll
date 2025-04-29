import { FC, useState } from 'react';
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import { Link } from 'react-router-dom';
import Modal from "@/components/Modal";
import ContactModal from "@/components/Modal/ContactModal";

export const HowToRegister: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div className={qstyles.container}>
      <p className={qstyles.startText}>
        Чтобы начать работу на площадке, пройдите процедуру регистрации. Подключение пользователей к
        сервису организовано в три этапа: Регистрация, Верификация, Модерация.
      </p>
      <p className={qstyles.title}>1. Регистрация</p>
      <p className={`${qstyles.text} ${qstyles.ml20}`}>
        Заполните{' '}
        <Link className={qstyles.link} to="/register">
          регистрационную форму
        </Link>
        . Зарегистрироваться могут только юридические лица. В качестве исполнителей могут
        регистрироваться только компании с видом деятельности, относящемся к клинингу или к смежным
        услугам.
      </p>
      <p className={qstyles.title}>2. Верификация</p>
      <p className={`${qstyles.text} ${qstyles.ml20}`}>
        Загрузите документы компании. Ссылка на форму для загрузки документов расположена в личном
        кабинете во вкладке Верификация.
      </p>
      <p className={qstyles.title}>3. Модерация</p>
      <p className={`${qstyles.text} ${qstyles.ml20}`}>
        Заявка на создание аккаунта будет оперативно рассмотрена модератором сайта. Не более чем в
        течение суток с момента подачи документов компании вы получите уведомление о результате
        рассмотрения по электронной почте и в личном кабинете. Если в заявке есть необходимые
        данные, вам будет доступен весь функционал сайта.
      </p>
      <div className={qstyles.seeAlso}>
        <p className={qstyles.title}>Смотрите также:</p>
        <Link to="/faq?page=1&number=3#q1_3" className={`${qstyles.link} ${qstyles.ml20}`}>
          Какие требования предъявляются на Ubrato к заказчикам и исполнителям при регистрации?
        </Link>
        <Link to="/faq?page=3&number=1#q3_1" className={`${qstyles.link} ${qstyles.ml20}`}>
          Как стать заказчиком?
        </Link>
        <Link to="/faq?page=2&number=1#q2_1" className={`${qstyles.link} ${qstyles.ml20}`}>
          Как стать исполнителем?
        </Link>
      </div>
      <p className={`${qstyles.text}`}>
        Остались вопросы?{' '}
        <span className={`${qstyles.link} cursor-pointer`} onClick={() => setOpenModal(true)}>
          Напишите телефон
        </span>{' '}
        и мы перезвоним.
      </p>
      <Modal isOpen={openModal}>
        <ContactModal onClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
};
