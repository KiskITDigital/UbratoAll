import { Radio, RadioGroup } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../MainPart.module.css';
import { useSurveyStore } from '@/store/surveyStore';

export const Page2: FC = () => {
  const radioStyle = {
    base: styles.radioNumberBase,
    wrapper: styles.radioWrapper,
    control: styles.radioControl,
  };

  const rateArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const surveyStore = useSurveyStore();
  const navigate = useNavigate();

  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');

  const handleGoNext = () => {
    let error = true;
    if (!surveyStore.question2.rate) {
      setError1('Это обязательный вопрос');
      error = true;
    } else {
      error = false;
    }
    if (!surveyStore.question3.rate) {
      setError2('Это обязательный вопрос');
      error = true;
    } else {
      error = false;
    }
    if (!error) {
      surveyStore.setIsPage2Completed(true);
      navigate('/survey/3');
    }
  };

  useEffect(() => {
    if (!surveyStore.isPage1Completed) {
      navigate('/survey/1');
    }
  }, [navigate, surveyStore.isPage1Completed]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!surveyStore.isPage1Completed) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col items-center pt-10 text-[26px] gap-10 font-medium">
      <h1 className="font-bold text-[60px]">
        Тест-драйв <span className="text-accent">Ubrato</span> Анкета
      </h1>

      <div className="flex bg-[#F5FAFE] w-full justify-center max-w-screen py-10">
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
            Оцените элементы и сервисы сайта Ubrato
          </p>
        </div>
      </div>

      <div className="max-w-[1130px] w-full px-[40px]">
        <div className="gap-[40px] pb-[40px] border-b-2 border-gray-200 xl:px-0 flex flex-col">
          <div>
            <p className="font-bold">
              2. Удобно ли вам ориентироваться на нашем сайте и находить нужную вам информацию (ссылки, кнопки, переходы в разделы и другие страницы и тд) *
            </p>
            <p>
              1 - совсем непонятно и неудобно, 10 - все понял, удобно ориентироваться
            </p>
          </div>
          <div className="max-w-[1130px] w-full px-[40px] xl:px-0">
            <RadioGroup
              value={surveyStore.question2.rate}
              onValueChange={(v) => {
                surveyStore.setQuestion2(v);
                setError1('');
              }}
            >
              <div className="flex gap-3">
                {rateArr.map((e) => {
                  return (
                    <Radio key={e} classNames={radioStyle} value={e.toString()}>
                      {e}
                    </Radio>
                  );
                })}
                {error1 && <p className={styles.errorText}>{error1}</p>}
              </div>
            </RadioGroup>
            <div className={`${styles.yourVariant} ${styles.comment}`}>
              <p>Ваш комментарий</p>
              <input
                type="text"
                value={surveyStore.question2.comment}
                onChange={(e) => {
                  surveyStore.setQuestion2comment(e.target.value);
                }}
                className={styles.input}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1130px] w-full px-[40px]">
        <div className="gap-[40px] pb-[40px] border-b-2 border-gray-200 xl:px-0 flex flex-col">
          <div>
            <p className="font-bold">
              3. Пожалуйста, оцените процесс регистрации и верификации в целом *
            </p>
            <p>
              1 - неудобный, 10 - удобный
            </p>
          </div>
          <div className="max-w-[1130px] w-full px-[40px] xl:px-0">
            <RadioGroup
              value={surveyStore.question3.rate}
              onValueChange={(v) => {
                surveyStore.setQuestion3(v);
                setError2('');
              }}
            >
              <div className="flex gap-3">
                {rateArr.map((e) => {
                  return (
                    <Radio key={e} classNames={radioStyle} value={e.toString()}>
                      {e}
                    </Radio>
                  );
                })}
                {error2 && <p className={styles.errorText}>{error2}</p>}
              </div>
            </RadioGroup>
            <div className={`${styles.yourVariant} ${styles.comment}`}>
              <p>Ваш комментарий</p>
              <input
                type="text"
                value={surveyStore.question2.comment}
                onChange={(e) => {
                  surveyStore.setQuestion3comment(e.target.value);
                }}
                className={styles.input}
              />
            </div>
          </div>

          <div className="w-full justify-center items-center flex gap-3">
            <Link to="/survey/1">
              <button className="w-[175px] flex justify-center items-center h-[54px] bg-[#ECF0F3] rounded-2xl font-bold">
                Назад
              </button>
            </Link>
            <button className="w-[175px] flex justify-center items-center h-[54px] bg-accent text-white  rounded-2xl font-bold" onClick={handleGoNext}>
              Далее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
