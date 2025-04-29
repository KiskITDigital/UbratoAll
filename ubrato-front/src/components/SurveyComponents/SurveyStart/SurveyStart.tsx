import Modal from '@/components/Modal';
import ContactModal from '@/components/Modal/ContactModal';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

export const SurveyStart: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center pt-10">
      <h1 className="font-bold text-[60px]">
        Тест-драйв <span className="text-accent">Ubrato</span>
      </h1>
      <div className="flex bg-[#F5FAFE] w-full justify-center max-w-screen h-[380px] my-10">
        <div className="max-w-[1130px] w-full px-[40px] xl:px-0 flex justify-center lg:justify-between">
          <div className="flex items-center">
            <div className="flex flex-col font-black text-[30px]">
              <div className="flex gap-2 items-center">
                <img className="size-20" src="/survey/check-mark.svg" alt="" />
                <p>Примите участие в опросе</p>
              </div>
              <div className="flex gap-2 items-center">
                <img className="size-20" src="/survey/arrow-down.svg" alt="" />
                <p>Получите исследование в подарок*</p>
              </div>
              <div className="flex gap-2 items-center">
                <img className="size-20" src="/survey/heart.svg" alt="" />
                <p>
                  Давайте улучшим <span className="text-accent">Ubrato</span> вместе!
                </p>
              </div>
            </div>
          </div>
          <img className="h-full w-fit hidden lg:flex" src="/survey/laptop.png" alt="" />
        </div>
      </div>
      <div className="flex flex-col text-[26px] max-w-[1130px] px-[40px] xl:px-0 w-full gap-8 font-medium">
        <p className="text-[26px] font-bold">
          Предлагаем пользователям сервиса Ubrato, зарегистрированным в качестве{' '}
          <Link to="/knowledge-base" className="text-accent hover:underline">
            Исполнителей
          </Link>
          , принять участие в тест-драйве сайта ubrato.ru и заполнить анкету.
        </p>
        <div className="pl-10 w-full">
          <p className="">
            <span className="text-accent">Ubrato</span> – это платформа для корпоративных клиентов,
            которые ищут профессиональные услуги уборки и сопутствующие услуги. Платформа работает
            по принципу электронной торговой площадки, где заказчики публикуют свои запросы, а
            исполнители предлагают им свои услуги. Все взаимодействия на платформе основаны на
            принципах открытости, честности и профессионализма.
          </p>
        </div>

        <div>
          <p className="font-bold">Преимущества участникам анкетирования</p>
          <p>
            За ответы на вопросы анкеты Ubrato предоставит доступ к материалу об исследовании рынка
            клининговых и смежных услуг. Исследование было проведено в формате опроса более 150
            представителей клининговых компаний России в 2023-2024 годах. Участники анкетирования
            станут ключевыми партнерами** сервиса Ubrato.
          </p>
          <ul>
            <li className="list-disc">Вы получите доступ ко всем решениям сервиса.</li>
            <li className="list-disc">
              За каждым участником тест-драйва будет закреплен персональный менеджер, который
              ответит в случае возникновения вопросов.
            </li>
          </ul>
        </div>

        <p>Участники анкетирования станут ключевым партнерами площадки.</p>
        <ul className="w-full pl-10">
          <li className="w-full list-disc list-inside">
            Вы получите доступ ко всем сервисам площадки.
          </li>
          <li className="w-full list-disc list-inside">
            За каждым участником тест-драйва будет закреплен персональный менеджер, который ответит
            в случае возникновения вопросов.
          </li>
        </ul>
        <p>
          Уже есть вопросы?{' '}
          <span className="text-accent underline cursor-pointer" onClick={() => setOpenModal(true)}>
            Напишите телефон
          </span>{' '}
          и мы перезвоним.
        </p>
        <p className="font-bold">Как принять участие</p>
        <ul className="w-full pl-16">
          <li className="w-full list-decimal list-outside">
            <Link to="/register" className="text-accent hover:underline">
              Зарегистрируйтесь
            </Link>{' '}
            на площадке Ubrato в качестве Исполнителя.
          </li>
          <li className="w-full list-decimal list-outside">
            Ознакомьтесь с возможностями площадки и примите участие в торгах. На сайте создано
            несколько тестовых тендеров, отмеченных в начале описания тендера заголовком “Тестовый
            тендер”.
          </li>
          <li className="w-full list-decimal list-outside">
            Заполните{' '}
            <Link to="/survey/1" className="text-accent hover:underline">
              анкету
            </Link>{' '}
            участника в личном кабинете.
          </li>
          <li className="w-full list-decimal list-outside">
            Получите в подарок от нас Исследование рынка клининговых услуг за 2023-2024 годы.
            Материал станет доступен для скачивания после заполнения анкеты.
          </li>
        </ul>
        <Link
          to="1"
          className="w-[600px] self-center bg-accent text-white text-center h-[70px] items-center flex justify-center rounded-2xl"
        >
          Участвовать
        </Link>

        <div>
          <p className="text-[18px] font-light">
            * Под словом «подарок» подразумевается предоставление доступа к информационному
            материалу об исследовании рынка клининговых и смежных услуг, не являющимся стимулирующим
            мероприятием в соответствии со статьей 9 Федерального закона «О рекламе» от 13.03.2006 №
            38-ФЗ
          </p>
          <p className="text-[18px] font-light">
            ** Под словом «партнер» подразумевается взаимовыгодное сотрудничество между Оператором
            Сайта и участниками анкетирования в сфере клининговых и смежных услуг.
          </p>
        </div>
        <p className="text-[18px] font-bold italic">
          Обращаем Ваше внимание, на то, что предложение о принятии участия в тест-драйве носит
          информационный характер и не является публичной офертой в соответствии со ст. 437 ГК РФ.
          Администрация площадки Ubrato.ru вправе вносить изменения в условия тест-драйва без
          предварительного уведомления пользователей.
        </p>
      </div>
      <Modal isOpen={openModal}>
        <ContactModal onClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
};
