import { useSurveyStore } from '@/store/surveyStore';
import { CheckboxGroup, Checkbox, Textarea } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../MainPart.module.css';
import { sendAnswers } from '@/api';
import * as Dialog from '@radix-ui/react-dialog';

export const Page5: FC = () => {
  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: `${styles.checkText} ${styles.infoText}`,
  };

  const surveyStore = useSurveyStore();
  const navigate = useNavigate();

  const [completed, setCompleted] = useState<boolean>(false);

  const handleGoNext = () => {
    const answers: string[] = [
      surveyStore.question1.answer,
      surveyStore.question1.comment,
      surveyStore.question2.rate,
      surveyStore.question2.comment,
      surveyStore.question3.rate,
      surveyStore.question3.comment,
      surveyStore.question4.naviagtion,
      surveyStore.question4.companyInfoChanging,
      surveyStore.question4.contactInfoChanging,
      surveyStore.question4.portfolioCreating,
      surveyStore.question4.comment,
      surveyStore.question5.rate,
      surveyStore.question5.comment,
      JSON.stringify(surveyStore.question6.answers),
      surveyStore.question6.comment,
      surveyStore.question7.rate,
      surveyStore.question7.comment,
      JSON.stringify(surveyStore.question8.answers),
      surveyStore.question8.comment,
      surveyStore.question9.rate,
      surveyStore.question9.comment,
      surveyStore.question10.rate,
      surveyStore.question10.comment,
      surveyStore.question11.response,
      surveyStore.question11.priceNDS,
      surveyStore.question11.chat,
      surveyStore.question11.winnerInfo,
      surveyStore.question11.readyConfirm,
      surveyStore.question11.comment,
      JSON.stringify(surveyStore.question12.answers),
      surveyStore.question12.comment,
      JSON.stringify(surveyStore.question13.answers),
      surveyStore.question13.comment,
      JSON.stringify(surveyStore.question14.answers),
      surveyStore.question15,
    ];
    // console.log(answers);
    const token = localStorage.getItem('token');
    if (token) {
      setCompleted(true)
      try {
        (async () => {
          const res = await sendAnswers(token, answers);
          if (res === 200) {
            setCompleted(true)
          }
        })();
      } catch (error) {
        // console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!surveyStore.isPage4Completed) {
      if (!surveyStore.isPage3Completed) {
        if (!surveyStore.isPage2Completed) {
          if (!surveyStore.isPage1Completed) {
            navigate('/survey/1');
          } else {
            navigate('/survey/2');
          }
        } else {
          navigate('/survey/3');
        }
      } else {
        navigate('/survey/4');
      }
    }
  }, [
    navigate,
    surveyStore.isPage1Completed,
    surveyStore.isPage2Completed,
    surveyStore.isPage3Completed,
    surveyStore.isPage4Completed,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="text-[26px] font-medium w-full">
        <h1 className="font-bold text-[60px] text-center">
          Тест-драйв <span className="text-accent">Ubrato</span> Анкета
        </h1>

        <div className="flex bg-[#F5FAFE] w-full justify-center max-w-screen py-10 mb-[40px]">
          <div className="max-w-[1130px] w-full px-[40px] xl:px-0 flex flex-col gap-[20px]">
            <p className="font-bold">
              Агрегатор клининговых услуг Ubrato предлагает участникам сервиса, зарегистрированным в
              качестве <Link to="/knowledge-base" className="text-accent hover:underline">Исполнителей</Link>, принять участие в тест-драйве
              сайта.
            </p>
            <div className="flex flex-col">
              <p className="font-bold">
                Пожалуйста, ответьте на вопросы анкеты.
              </p>
              <p>
                * Звездочкой отмечены обязательные для ответов
              </p>
            </div>
          </div>
        </div>

        <div className="flex bg-[#F5FAFE] w-full justify-center max-w-screen py-10">
          <div className="max-w-[1130px] w-full px-[40px] xl:px-0 flex flex-col">
            <p className="font-bold">
              Ubrato и ваш бизнес
            </p>
          </div>
        </div>

        <ol className={styles.questionsContainer}>
          <li className={`${styles.questionItem} ${styles.text}`}>
            <p className={styles.bold}>
              Какие услуги платформы Ubrato были бы интересны и востребованы для вашего бизнеса?
            </p>
            <CheckboxGroup
              value={surveyStore.question12.answers}
              onChange={(e) => {
                if (e instanceof Array) {
                  surveyStore.setQuestion12answers(e);
                }
              }}
              className={styles.checkGroup}
            >
              <div className={styles.checkContainer}>
                <p>Поиск заказа</p>
                <Checkbox value="Поиск заказа" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p>Согласование объема и стоимости услуг</p>
                <Checkbox value="Согласование объема и стоимости услуг" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p>Проверка контрагента</p>
                <Checkbox value="Проверка контрагента" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p>Возможность загружать примеры работ (кейсы)</p>
                <Checkbox value="Возможность загружать примеры работ" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p>Наличие отзывов</p>
                <Checkbox value="Наличие отзывов" classNames={checkStyle} />
              </div>
            </CheckboxGroup>
            <div className={`${styles.yourVariant} ${styles.comment}`}>
              <p>Ваш комментарий</p>
              <input
                type="text"
                value={surveyStore.question12.comment}
                onChange={(e) => {
                  surveyStore.setQuestion12comment(e.target.value);
                }}
                className={styles.input}
              />
            </div>
          </li>
          <li className={`${styles.questionItem} ${styles.text}`}>
            <p className={styles.bold}>
              Какие услуги платформы Ubrato были бы интересны и востребованы для вашего бизнеса?
            </p>
            <CheckboxGroup
              value={surveyStore.question13.answers}
              onChange={(e) => {
                if (e instanceof Array) {
                  surveyStore.setQuestion13answers(e);
                }
              }}
              className={styles.checkGroup}
            >
              <div className={styles.checkContainer}>
                <p>
                  Режим одного окна (договор, акт сдачи-приемки работ, арбитраж, привлечение эксперта
                  на любом из этапов взаимодействия сторон, в т.ч. с выездом на объект)
                </p>
                <Checkbox value="Режим одного окна" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p>Гарантия получения оплаты по процедуре “Безопасная сделка”</p>
                <Checkbox
                  value="Гарантия получения оплаты по процедуре “Безопасная сделка”"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p>Заключение договора через площадку</p>
                <Checkbox value="Заключение договора через площадку" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p>Подписание акта выполненных работ через площадку</p>
                <Checkbox
                  value="Подписание акта выполненных работ через площадку"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p>Разрешение споров с помощью процедуры арбитража</p>
                <Checkbox
                  value="Разрешение споров с помощью процедуры арбитража"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p>Аренда/продажа уборочной техники, расходных материалов и экипировки</p>
                <Checkbox
                  value="Аренда/продажа уборочной техники, расходных материалов и экипировки"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p>Аутсорсинг персонала</p>
                <Checkbox value="Аутсорсинг персонала" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p>
                  Финансовые услуги (страхование, помощь в получении кредита, банковской гарантии)
                </p>
                <Checkbox
                  value="Финансовые услуги (страхование, помощь в получении кредита, банковской гарантии)"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p>
                  Продвижение компании на сайте (баннерная реклама, выделенная карточка профиля,
                  приоритетное размещение в выдаче каталога и др.)
                </p>
                <Checkbox value="Продвижение компании на сайте" classNames={checkStyle} />
              </div>
            </CheckboxGroup>
            <div className={`${styles.yourVariant} ${styles.comment}`}>
              <p>Что еще можно добавить на сайт Ubrato? (Ваш комментарий)</p>
              <input
                type="text"
                value={surveyStore.question13.comment}
                onChange={(e) => {
                  surveyStore.setQuestion13comment(e.target.value);
                }}
                className={styles.input}
              />
            </div>
          </li>
          <li className={`${styles.questionItem} ${styles.text}`}>
            <p className={styles.bold}>
              Если площадка Ubrato станет платной, то какие услуги вы готовы оплачивать?
            </p>
            <CheckboxGroup
              value={surveyStore.question14.answers}
              onChange={(e) => {
                if (e instanceof Array) {
                  surveyStore.setQuestion14answers(e);
                }
              }}
              className={styles.checkGroup}
            >
              <div className={styles.checkContainer}>
                <p>Участие в тендерах (абонентская плата)</p>
                <Checkbox value="Участие в тендерах (абонентская плата)" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p>Доступ к базе текущих тендеров (единовременная плата за пакет услуг)</p>
                <Checkbox value="Доступ к базе текущих тендеров" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p>
                  Доступ к базе текущих тендеров и продвижение компании (единовременная плата за пакет
                  услуг)
                </p>
                <Checkbox
                  value="Доступ к базе текущих тендеров и продвижение компании"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p>Комиссия за победу в тендере</p>
                <Checkbox value="Комиссия за победу в тендере" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p>
                  Раскрытие контактных данных вашей организации в каталоге Исполнителей (абонентская
                  плата)
                </p>
                <Checkbox
                  value="Раскрытие контактных данных вашей организации в каталоге Исполнителей"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p>
                  Размещение и оформление профиля, продвижение компании (единовременная плата за пакет
                  услуг)
                </p>
                <Checkbox
                  value="Размещение и оформление профиля, продвижение компании"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p>
                  Смс-уведомления о публикации новых тендеров в вашем сегменте (абонентская плата)
                </p>
                <Checkbox
                  value="Смс-уведомления о публикации новых тендеров в вашем сегменте"
                  classNames={checkStyle}
                />
              </div>
            </CheckboxGroup>
          </li>
          <li>
            <div className={`${styles.yourVariant} ${styles.comment}`}>
              <p className={styles.text}>
                Что еще вы хотели бы улучшить или добавить на сайте Ubrato?
              </p>
              <Textarea
                value={surveyStore.question15}
                onChange={(e) => {
                  surveyStore.setQuestion15(e.target.value);
                }}
                variant='faded'
                disableAutosize
                disableAnimation
                className={styles.textarea + ' border-4 rounded-3xl '}
              />
            </div>
          </li>
        </ol>
        <div className={styles.btnsContainer}>
          <Link className={`${styles.survey__button} ${styles.backBtn}`} to="/survey/2">
            Назад
          </Link>
          <button className={`${styles.survey__button} ${styles.nextBtn2}`} onClick={handleGoNext}>
            Завершить!
          </button>
        </div>
      </div>
      <Dialog.Root open={completed}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <div className="bg-white flex justify-center items-center h-[400px] px-20 border-gray-300 border-2 rounded-xl">
              <p>Благодарим за участие в тест-драйве площадки Ubrato</p>
            </div>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <img src="/x-icon.svg" className="size-5" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
