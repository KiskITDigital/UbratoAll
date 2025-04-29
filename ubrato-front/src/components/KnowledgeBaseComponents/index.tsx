import { FC, useEffect, useRef } from "react";
import s from "./styles.module.css";
import { Link } from "react-router-dom";

export const KnowledgeBaseComponent: FC = () => {
  const startRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 200, behavior: "smooth" });
    }, 0);
  }, []);

  return (
    <div ref={startRef} className={s.main_bgc}>
      <div className={s.main_content}>
        <div className={s.main_header}>
          <h1 className={s.main_header__text}>База знаний <span className={s.accent}>Ubrato</span></h1>
          <p className={s.main_header__paragraph}>Список терминов и определений, применяемых на сайте Ubrato</p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>U</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>Ubrato (Убрато)</span>  — агрегатор клининговых и других смежных услуг,
            электронная торговая площадка, сервис для поиска заказов клининговых
            и смежных услуг и поиска исполнителей этих услуг. На сайте
            Исполнители откликаются на Тендеры, размещенные заказчиками, а
            Заказчики выбирают Исполнителей по их Откликам. Сервис Ubrato
            доступен в интернете по ссылке ubrato.ru. Термины “агрегатор”,
            “интернет-площадка”, “сайт”, “веб-сайт” и “сервис” являются
            равнозначными на веб-сайте Ubrato, если отсутствует специальная
            оговорка.
          </p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>А</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>Агрегатор</span> — сервис, который собирает данные по определенной тематике
            из разных источников (чаще всего — информацию о товарах и услугах
            разных компаний) или же соединяет заказчиков и исполнителей услуг.
            Агрегатор представляет собой каталог, где можно найти нужные позиции
            по определённым характеристикам и сравнить их между собой.
          </p>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>Администрация Ubrato</span> — орган управления сайтом Ubrato. Юридически
            значимая информация, касающаяся администрации сайта, содержится в
            разделе “<Link className={s.block_link} to='/rights'>Правовая информация</Link>“.
          </p>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}> Аккаунт</span> — учетная запись (совокупность данных) Пользователя,
            необходимая для его авторизации и предоставления доступа к его
            личным данным и настройкам на сайте Ubrato.
          </p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>В</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>Верификация</span> — процедура проверки достоверности данных внесенных
            пользователем. Администрация сайта Ubrato проверяет загруженные
            заказчиками и исполнителями документы: выписку из ЕГРЮЛ, приказ о
            назначении генерального директора, карточку и первую страницу устава
            компании. Страница для загрузки документов доступна в "Личном кабинете" во вкладке <Link className={s.block_link} to={'/profile/documents'}>"Документы"</Link>.
            После проверки достоверности документов администрацией Ubrato, пользователь
            получает доступ ко всем сервисам сайта.
          </p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>З</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>Заказ</span> — информация о необходимых Заказчику клининговых и смежных
            услугах, которая адресована исполнителю (победителю) тендера.
          </p>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>Заказчик</span> — юридическое лицо, заинтересованное в выполнении
            Исполнителем услуг Клининга или смежных услуг.
          </p>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}> Заявка</span> — информация Заказчика о необходимых ему клининговых и
            смежных услугах, с учетом временных данных и иных требований,
            необходимых для выполнения заказа, которую он отправляет на
            Модерацию для публикации Тендера.
          </p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>И</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>  Исполнитель</span>— юридическое лицо, оказывающее клининговые и смежные
            услуги Заказчику на основании договора и/или иных документов. См.
            также термин Победитель тендера.
          </p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>К</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}> Клининг (Услуги клининга)</span> — термин клининг от английского «clean»,
            что в переводе означает - убирать, чистить. Клининг — это
            профессиональная уборка помещений, зданий и прилегающих территорий
            силами специализированных компаний.
          </p>
          <div className={s.gost_block}>
            <h3 className={s.gost_header}>Выдержка из ГОСТа Р 51870-2014 “Клининговые услуги”</h3>
            <p>
              «Профессиональная уборка — клининг: Совокупность организационных
              мероприятий и технологических процессов, являющихся частью
              эксплуатации объектов недвижимости, территорий, транспорта, и
              направленных на обеспечение безопасного для человека уровня
              чистоты и санитарного состояния. <br />
              <span className={s.gost_block_inter}>Услуги профессиональной уборки —
                клининговые услуги: Деятельность по поддержанию, сохранению и
                восстановлению эстетических и эксплуатационных свойств различных
                поверхностей объектов недвижимости, территорий, транспорта,
                удалению загрязнений и поддержанию санитарного состояния объектов
                в соответствии с потребностями потребителей услуг.»</span>
            </p>
          </div>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>Л</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}> Личный кабинет</span> — страница Пользователя (страница компании Заказчика
            или компании Исполнителя) на сайте Ubrato, доступ к которой есть у
            представителя компании. В Личном кабинете расположен публичный
            Профиль компании, функционал для взаимодействия Пользователя с
            Администрацией сайта и другие разделы.
          </p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>М</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>  Менеджер по работе с клиентами </span> — сотрудник отдела по работе с
            клиентами сервиса Ubrato. Менеджер по работе с клиентами является
            представителем Администрации Ubrato при взаимодействии с Заказчиками
            и Исполнителями.
          </p>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}> Модерация</span>  — действия сотрудников Администрации сайта Ubrato по
            контролю соблюдения пользователями сайта норм и правил сервиса
            Ubrato.
          </p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>П</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}> Период приема откликов на тендер</span> — временной интервал, в который
            Заказчик получает отклики потенциальных исполнителей.
          </p>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>  Период проведения тендера</span> — временной интервал, который включает
            период приема откликов на тендер и период выбора победителя.
          </p>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>Период проведения работ</span> — временной интервал, в который Исполнитель
            выполняет Заявку Заказчика, оказывает ему услуги клининга или
            сопутствующие услуги.
          </p>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}> Победитель тендера</span> — Участник Тендера, которого Заказчик выбрал для
            выполнения услуг. Победитель тендера является Исполнителем Услуг.
          </p>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}> Пользователь сайта</span> — любой посетитель веб-сайта Ubrato. Юридически
            значимая информация, касающаяся порядка использования сервиса,
            содержится в “<Link className={s.block_link} to={'/rights?document=2'}>Пользовательском соглашении</Link>”.
          </p>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}> Правовая информация</span> — информация о нормах и правилах сервиса Ubrato,
            закрепленная в утвержденных Администрацией сайта Ubrato документах.
          </p>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>  Профиль</span> — публичная страница Пользователя (страница компании
            Заказчика или компании Исполнителя) на сайте Ubrato, доступ к
            которой есть у других пользователей сайта. Пользователь заполняет
            данные Профиля в Личном кабинете.
          </p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>О</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>  Отклик на тендер</span>  — сообщение участника Тендера о его готовности
            выполнить Заявку Заказчика. Исполнитель указывает в Отклике
            Стоимость, за которую он готов оказать услуги.
          </p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>Р</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>  Регистрация</span> — процедура, которую должен пройти Пользователь, чтобы
            воспользоваться сервисами сайта Ubrato. Страница для регистрации
            доступна по этой ссылке (ссылка на https://ubrato.ru/registration).
            В результате прохождения процедуры Регистрации автоматически
            создается уникальная учетная запись. При Регистрации Пользователь
            выступает от имени юридического лица. Он указывает ИНН этого
            юрлица, а также свои контактные данные - фамилию, имя, отчество,
            адрес электронной почты и номер телефона. Юридически значимая
            информация, касающаяся персональных данных пользователя, содержится
            в “Пользовательском соглашении”, в “Согласии на обработку
            персональных данных” и в “Политика обработки персональных данных”
            (ссылки на соответствующие вкладки).
          </p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>С</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>Стоимость</span> — цена Услуги клининга. Заказчик указывает в Заявке
            Стоимость, которую он готов заплатить за выполнение услуг.
            Исполнитель указывает в Отклике Стоимость, за которую он готов
            оказать услуги. Стороны согласовывают Стоимость в Чате.
          </p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>Т</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>Тендер</span> — конкурентная форма отбора предложений (торги) на оказание
            услуг по заранее объявленным в Заявке условиям, на принципах
            состязательности, справедливости и эффективности. Заказчик объявляет
            условия, по которым будет покупать товары, услуги или работы. А
            поставщики с учетом требований предлагают свои варианты. Заказчик
            заключает контракт с поставщиком, у которого условия лучше.
          </p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>У</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>Уборка</span> — комплекс действий Исполнителя, необходимый для обеспечения
            чистоты в промышленных, коммерческих и бытовых помещениях Заказчика.
          </p>
          <p className={s.block_paragraph}><span className={s.accent_block}> Услуги клининга</span> — см. Клининг.</p>
          <p className={s.block_paragraph}><span className={s.accent_block}> Участник тендера</span> — Исполнитель, откликнувшийся на Тендер.</p>
        </div>
        <div className={s.content_block}>
          <h2 className={s.block_header}>Э</h2>
          <p className={s.block_paragraph}>
            <span className={s.accent_block}>  Электронная торговая площадка (ЭТП)</span> — это программно-аппаратный
            комплекс информационных, организационных и технических решений,
            которые обеспечивают взаимодействие через электронные каналы связи
            поставщика (продавца товаров работ, услуг) и заказчика (покупателя).
            В настоящее время электронной торговой площадкой принято называть
            интернет-ресурсы, с помощью которых происходит заключение сделок
            купли-продажи товаров (работ, услуг) между организациями -
            продавцами и предприятиями - покупателями.
          </p>
        </div>
      </div>
    </div>
  );
};
