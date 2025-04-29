import { FC, useState } from "react";
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import { Link } from "react-router-dom";
import Modal from "@/components/Modal";
import ContactModal from "@/components/Modal/ContactModal";

const HowToBecome: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div className={qstyles.container}>
      <p className={qstyles.startText}>
        В качестве заказчика на сайте Ubrato могут зарегистрироваться действующие юридические лица, не находящееся в процедуре банкротства, на стадии ликвидации или в процессе присоединения к другому лицу с последующей ликвидацией.
      </p>
      <p className={`${qstyles.text}`}>После <Link className={`${qstyles.link}`} to="/">верификации</Link> данных компании администрацией сайта представитель зарегистрированной компании получит возможность:</p>
      <ul>
        <li className={qstyles.li}>пользоваться личным кабинетом;</li>
        <li className={qstyles.li}>создавать тендеры на выполнение клининговых и смежных услуг;</li>
        <li className={qstyles.li}>изучать портфолио исполнителей;</li>
        <li className={qstyles.li}>отвечать на вопросы потенциальных исполнителей;</li>
        <li className={qstyles.li}>выбирать победителей тендеров;</li>
        <li className={qstyles.li}>оставлять отзывы об исполнителях и ставить им оценки (рейтинг) по итогам выполнения работ.</li>
      </ul>
      <div className={qstyles.seeAlso}>
        <p className={qstyles.title}>Смотрите также:</p>
        <Link to='/faq?page=1&number=3#q1_3' className={`${qstyles.link} ${qstyles.ml20}`}>
          Какие требования предъявляются на Ubrato к заказчикам и исполнителям при регистрации?
        </Link>
        <Link to='/faq?page=3&number=4#q3_4' className={`${qstyles.link} ${qstyles.ml20}`}>
          Как создать тендер?
        </Link>
        <Link to='/faq?page=3&number=5#q3_5' className={`${qstyles.link} ${qstyles.ml20}`}>
          Как найти и выбрать исполнителя?
        </Link>
      </div>
      <p className={`${qstyles.text}`}>Остались вопросы? <span className={`${qstyles.link} cursor-pointer`} onClick={() => setOpenModal(true)}>
        Напишите телефон
      </span> и мы перезвоним.</p>
      <Modal isOpen={openModal}>
        <ContactModal onClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
}

export default HowToBecome;
