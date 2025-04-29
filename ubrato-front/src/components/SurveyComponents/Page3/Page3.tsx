import { useSurveyStore } from '@/store/surveyStore';
import { RadioGroup, Radio, CheckboxGroup, Checkbox } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../MainPart.module.css';

export const Page3: FC = () => {
  const radioStyle = {
    base: styles.radioNumberBase,
    wrapper: styles.radioWrapper,
    control: styles.radioControl,
  };

  const radioGroupStyle = {
    wrapper: styles.radioGroupNumbersWrapper,
  };

  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: `${styles.checkText} ${styles.infoText}`,
  };

  const rateArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const surveyStore = useSurveyStore();
  const navigate = useNavigate();

  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');

  const handleGoNext = () => {
    let error = true;
    if (!surveyStore.question6.answers.length) {
      setError1('Выберите один или несколько вариантов');
      error = true;
    } else {
      error = false;
    }
    if (!surveyStore.question7.rate) {
      setError2('Это обязательный вопрос');
      error = true;
    } else {
      error = false;
    }
    if (!surveyStore.question8.answers.length) {
      setError3('Выберите один или несколько вариантов');
      error = true;
    } else {
      error = false;
    }
    if (!error) {
      surveyStore.setIsPage3Completed(true);
      navigate('/survey/4');
    }
  };

  useEffect(() => {
    if (!surveyStore.isPage2Completed) {
      if (!surveyStore.isPage1Completed) {
        navigate('/survey/1');
      } else {
        navigate('/survey/2');
      }
    }
  }, [navigate, surveyStore.isPage1Completed, surveyStore.isPage2Completed]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
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
            Оцените полноту информации на сайте Ubrato
          </p>
        </div>
      </div>

      <ol className={styles.questionsContainer}>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <p className={styles.bold}>
            Выберете один или несколько вариантов, как вам удобнее получать уведомления от нашего
            сайта
          </p>
          <CheckboxGroup
            value={surveyStore.question6.answers}
            onChange={(e) => {
              if (e instanceof Array) {
                setError1('');
                surveyStore.setQuestion6answers(e);
              }
            }}
            className={styles.checkGroup}
          >
            <div className={styles.checkContainer}>
              <p>Уведомления в “шапке” сайта (в правом верхнем углу) в “Колокольчике”</p>
              <Checkbox value="в колокольчике" classNames={checkStyle} />
            </div>
            <div className={styles.checkContainer}>
              <p>Push-уведомления (всплывающие окна) в правом нижнем углу</p>
              <Checkbox value="пуш уведомления" classNames={checkStyle} />
            </div>
            <div className={styles.checkContainer}>
              <p>Уведомления на почту</p>
              <Checkbox value="уведомления на почту" classNames={checkStyle} />
            </div>
            <div className={styles.checkContainer}>
              <p>Уведомления в мессенджер</p>
              <Checkbox value="уведомления в мессенджер" classNames={checkStyle} />
            </div>
            <div className={styles.checkContainer}>
              <p>Уведомления в звонке от менеджера сайта</p>
              <Checkbox value="уведомления от менеджера" classNames={checkStyle} />
            </div>
            {error1 && <p className={styles.errorText}>{error1}</p>}
          </CheckboxGroup>
          <div className={`${styles.yourVariant} ${styles.comment}`}>
            <p>Ваш комментарий</p>
            <input
              type="text"
              value={surveyStore.question6.comment}
              onChange={(e) => {
                surveyStore.setQuestion6comment(e.target.value);
              }}
              className={styles.input}
            />
          </div>
        </li>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <p className={styles.bold}>Пожалуйста, оцените, насколько информативны уведомления *</p>
          <p>
            1 - совсем непонятные и неинформативные уведомления, 10 - все понял, все информативно
          </p>
          <RadioGroup
            value={surveyStore.question7.rate}
            onValueChange={(v) => {
              surveyStore.setQuestion7(v);
              setError2('');
            }}
            classNames={radioGroupStyle}
          >
            <div className="flex gap-3">
              {rateArr.map((e) => {
                return (
                  <Radio key={e} classNames={radioStyle} value={e.toString()}>
                    {e}
                  </Radio>
                );
              })}
            </div>
            {error2 && <p className={styles.errorText}>{error2}</p>}
          </RadioGroup>
          <div className={`${styles.yourVariant} ${styles.comment}`}>
            <p>Ваш комментарий</p>
            <input
              type="text"
              value={surveyStore.question7.comment}
              onChange={(e) => {
                surveyStore.setQuestion7comment(e.target.value);
              }}
              className={styles.input}
            />
          </div>
        </li>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <p className={styles.bold}>Какие новости вы хотели бы видеть на Ubrato *</p>
          <CheckboxGroup
            value={surveyStore.question8.answers}
            onChange={(e) => {
              if (e instanceof Array) {
                surveyStore.setQuestion8answers(e);
                setError3('');
              }
            }}
            className={styles.checkGroup}
          >
            <div className={styles.checkContainer}>
              <p>Динамика рынка клининга, информация об активности заказчиков</p>
              <Checkbox value="Динамика рынка клининга" classNames={checkStyle} />
            </div>
            <div className={styles.checkContainer}>
              <p>Слияния и поглощения игроков рынка клининга</p>
              <Checkbox value="Слияния и поглощения игроков рынка клининга" classNames={checkStyle} />
            </div>
            <div className={styles.checkContainer}>
              <p>Новости о регулировании рынка клининга</p>
              <Checkbox value="Новости о регулировании рынка клининга" classNames={checkStyle} />
            </div>
            <div className={styles.checkContainer}>
              <p>Информация о новинках оборудования, инструментов и чистящих средств</p>
              <Checkbox value="Информация о новинках оборудования" classNames={checkStyle} />
            </div>
            <div className={styles.checkContainer}>
              <p>Все ключевые отраслевые новости</p>
              <Checkbox value="Все ключевые новости" classNames={checkStyle} />
            </div>
            <div className={styles.checkContainer}>
              <p>Хочу сфокусироваться на работе с тендерами, не отвлекаясь на отраслевые новости</p>
              <Checkbox value="Хочу сфокусироваться на работе с тендерами" classNames={checkStyle} />
            </div>
            {error3 && <p className={styles.errorText}>{error3}</p>}
          </CheckboxGroup>
          <div className={`${styles.yourVariant} ${styles.comment}`}>
            <p>Какую еще информацию вы хотели бы видеть на Ubrato? (Ваш комментарий)</p>
            <input
              type="text"
              value={surveyStore.question8.comment}
              onChange={(e) => {
                surveyStore.setQuestion8comment(e.target.value);
              }}
              className={styles.input}
            />
          </div>
        </li>
      </ol>
      <div className={styles.btnsContainer}>
        <Link className={`${styles.survey__button} ${styles.backBtn}`} to="/survey/2">
          Назад
        </Link>
        <button className={`${styles.survey__button} ${styles.nextBtn2}`} onClick={handleGoNext}>
          Далее
        </button>
      </div>
    </div>
  );
};
