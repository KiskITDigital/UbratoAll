import { FC, useState } from 'react';
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import { Link } from 'react-router-dom';
import Modal from "@/components/Modal";
import ContactModal from "@/components/Modal/ContactModal";

const HowToBecome: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  return (
    <div className={qstyles.container}>
      <p className={`${qstyles.startText}`}>
        В качестве исполнителя на сайте Ubrato могут зарегистрироваться действующие юридические лица
        с видом деятельности, относящемся к клинингу или к смежным услугам, не находящееся в
        процедуре банкротства, на стадии ликвидации и в процессе присоединения к другому лицу с
        последующей ликвидацией. В настоящее время исполнителями не могут стать индивидуальные
        предприниматели и физические лица.
      </p>
      <p className={`${qstyles.startText}`}>
        Условием для исполнителей является наличие действующего юридического лица с видом
        деятельности, относящемся к клинингу или к смежным услугам. При этом, исполнитель может
        участвовать только в тендерах, соответствующих его ОКВЭД.{' '}
      </p>
      <p className={`${qstyles.title}`}>
        Ubrato регистрирует компании со следующими категориями ОКВЭД:
      </p>
      <p className={`${qstyles.text}`}>37 Сбор и обработка сточных вод</p>
      <p className={`${qstyles.text}`}>38 Сбор, обработка и утилизация отходов</p>
      <p className={`${qstyles.text}`}>
        39 Предоставление услуг в области ликвидации последствий загрязнений и прочих услуг,
        связанных с удалением отходов
      </p>
      <p className={`${qstyles.text}`}>43.39 Производство прочих отделочных и завершающих работ</p>
      <p className={`${qstyles.text}`}>
        43.99 Работы строительные специализированные прочие, не включенные в другие группировки
      </p>
      <p className={`${qstyles.text}`}>
        45.20 Техническое обслуживание и ремонт автотранспортных средств
      </p>
      <p className={`${qstyles.text}`}>
        68 Операции с недвижимым имуществом за вознаграждение или на договорной основе
      </p>
      <p className={`${qstyles.text}`}>77 Аренда и лизинг</p>
      <p className={`${qstyles.text}`}>81 Деятельность по обслуживанию зданий и территорий</p>
      <p className={`${qstyles.text}`}>82 Деятельность административно-хозяйственная</p>
      <p className={`${qstyles.text}`}>
        96 Деятельность по предоставлению прочих персональных услуг
      </p>
      <p className={`${qstyles.text}`}>
        96.01 Стирка и химическая чистка текстильных и меховых изделий
      </p>
      <p className={`${qstyles.title}`}>
        После верификации данных администрацией сайта компания получит возможность:
      </p>
      <ul>
        <li className={qstyles.li}>возможность создать портфолио</li>
        <li className={qstyles.li}>искать и откликаться на тендеры</li>
        <li className={qstyles.li}>общаться с потенциальными заказчиками в чате</li>
        <li className={qstyles.li}>
          оставлять отзывы о заказчиках и ставить им оценку (рейтинг) по итогам выполнения работ
        </li>
      </ul>
      <div className={qstyles.seeAlso}>
        <p className={qstyles.title}>Смотрите также:</p>
        <Link to="/faq?page=1&number=3#q1_3" className={`${qstyles.link} ${qstyles.ml20}`}>
          Какие требования предъявляются на Ubrato к заказчикам и исполнителям при регистрации?
        </Link>
        <Link to="/faq?page=2&number=2#q2_2" className={`${qstyles.link} ${qstyles.ml20}`}>
          Как и зачем оформлять профиль и портфолио?
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

export default HowToBecome;
