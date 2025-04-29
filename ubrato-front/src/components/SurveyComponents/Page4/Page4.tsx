import { useSurveyStore } from '@/store/surveyStore';
import { RadioGroup, Radio } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../MainPart.module.css';

export const Page4: FC = () => {
  const radioStyle = {
    base: styles.radioNumberBase,
    wrapper: styles.radioWrapper,
    control: styles.radioControl,
  };

  const radioGroupStyle = {
    wrapper: styles.radioGroupNumbersWrapper,
  };
  
  const rateArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const surveyStore = useSurveyStore();
  const navigate = useNavigate();

  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');

  const handleGoNext = () => {
    let error = true;
    if (!surveyStore.question9.rate) {
      setError1('Это обязательный вопрос');
      error = true;
    } else {
      error = false;
    }
    if (!surveyStore.question10.rate) {
      setError2('Это обязательный вопрос');
      error = true;
    } else {
      error = false;
    }
    if (
      !surveyStore.question11.response ||
      !surveyStore.question11.priceNDS ||
      !surveyStore.question11.chat ||
      !surveyStore.question11.winnerInfo ||
      !surveyStore.question11.readyConfirm
    ) {
      setError3('Ответьте на все вопросы');
      error = true;
    } else {
      error = false;
    }
    if (!error) {
      surveyStore.setIsPage4Completed(true);
      navigate('/survey/5');
    }
  };

  useEffect(() => {
    if (
      !(
        !surveyStore.question11.response ||
        !surveyStore.question11.priceNDS ||
        !surveyStore.question11.chat ||
        !surveyStore.question11.winnerInfo ||
        !surveyStore.question11.readyConfirm
      )
    ) {
      setError3('');
    }
  }, [
    surveyStore.question11.chat,
    surveyStore.question11.priceNDS,
    surveyStore.question11.readyConfirm,
    surveyStore.question11.response,
    surveyStore.question11.winnerInfo,
  ]);

  useEffect(() => {
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
    }
  }, [
    navigate,
    surveyStore.isPage1Completed,
    surveyStore.isPage2Completed,
    surveyStore.isPage3Completed,
  ]);

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
            Оцените удобство работы с тендерами
          </p>
        </div>
      </div>

      <ol className={styles.questionsContainer}>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <p className={styles.bold}>Пожалуйста, оцените удобства поиска тендеров *</p>
          <p>1 - совсем непонятный и неудобный поиск тендеров, 10 - все понял, все удобно</p>
          <RadioGroup
            value={surveyStore.question9.rate}
            onValueChange={(v) => {
              surveyStore.setQuestion9(v);
              setError1('');
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
            {error1 && <p className={styles.errorText}>{error1}</p>}
          </RadioGroup>
          <div className={`${styles.yourVariant} ${styles.comment}`}>
            <p>Ваш комментарий</p>
            <input
              type="text"
              value={surveyStore.question9.comment}
              onChange={(e) => {
                surveyStore.setQuestion9comment(e.target.value);
              }}
              className={styles.input}
            />
          </div>
        </li>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <p className={styles.bold}>Пожалуйста, оцените полноту данных о тендере для отклика *</p>
          <p>
            1 - совсем мало данных о тендере, чтобы сделать отклик, 10 - данных о тендере достаточно
            для отклика
          </p>
          <RadioGroup
            value={surveyStore.question10.rate}
            onValueChange={(v) => {
              surveyStore.setQuestion10(v);
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
              value={surveyStore.question10.comment}
              onChange={(e) => {
                surveyStore.setQuestion10comment(e.target.value);
              }}
              className={styles.input}
            />
          </div>
        </li>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <div className="font-bold flex justify-between mb-5">
            <p className="text-accent">Элементы</p>
            <div className="flex gap-10 mr-10">
              <p className="text-accent">Удобно</p>
              <p className="text-accent">Не удобно</p>
            </div>
          </div>
          <RadioGroup
            value={surveyStore.question11.response}
            onValueChange={(v) => surveyStore.setQuestion11response(v)}
          >
            <div className="flex justify-between items-center rounded-xl w-full px-5 bg-[#F5FAFE] h-[60px]">
              <p>Отклик в целом</p>
              <div className="flex gap-[120px] mr-16">
                <Radio classNames={radioStyle} value={'Удобно'}></Radio>
                <Radio classNames={radioStyle} value={'Не удобно'}></Radio>
              </div>
            </div>
          </RadioGroup>
          <RadioGroup
            value={surveyStore.question11.priceNDS}
            onValueChange={(v) => surveyStore.setQuestion11priceNDS(v)}
          >
            <div className="flex justify-between items-center rounded-xl w-full px-5 bg-[#F5FAFE] h-[60px]">
              <p>Указание в отклике стоимости и работы с НДС</p>
              <div className="flex gap-[120px] mr-16">
                <Radio classNames={radioStyle} value={'Удобно'}></Radio>
                <Radio classNames={radioStyle} value={'Не удобно'}></Radio>
              </div>
            </div>
          </RadioGroup>
          <RadioGroup
            value={surveyStore.question11.chat}
            onValueChange={(v) => surveyStore.setQusetion11chat(v)}
          >
            <div className="flex justify-between items-center rounded-xl w-full px-5 bg-[#F5FAFE] h-[60px]">
              <p>Чат с заказчиком</p>
              <div className="flex gap-[120px] mr-16">
                <Radio classNames={radioStyle} value={'Удобно'}></Radio>
                <Radio classNames={radioStyle} value={'Не удобно'}></Radio>
              </div>
            </div>
          </RadioGroup>
          <RadioGroup
            value={surveyStore.question11.winnerInfo}
            onValueChange={(v) => surveyStore.setQuestion11winnerInfo(v)}
          >
            <div className="flex justify-between items-center rounded-xl w-full px-5 bg-[#F5FAFE] h-[60px]">
              <p>Информирование о выборе победителя</p>
              <div className="flex gap-[120px] mr-16">
                <Radio classNames={radioStyle} value={'Удобно'}></Radio>
                <Radio classNames={radioStyle} value={'Не удобно'}></Radio>
              </div>
            </div>
          </RadioGroup>
          <RadioGroup
            value={surveyStore.question11.readyConfirm}
            onValueChange={(v) => surveyStore.setQuestion11readyConfirm(v)}
          >
            <div className="flex justify-between items-center rounded-xl w-full px-5 bg-[#F5FAFE] h-[60px]">
              <p>Процедура подтверждения готовности выполнить работы</p>
              <div className="flex gap-[120px] mr-16">
                <Radio classNames={radioStyle} value={'Удобно'}></Radio>
                <Radio classNames={radioStyle} value={'Не удобно'}></Radio>
              </div>
            </div>
            {error3 && <p className={styles.errorText}>{error3}</p>}
          </RadioGroup>
          <div className={`${styles.yourVariant} ${styles.comment}`}>
            <p>Ваш комментарий</p>
            <input
              type="text"
              value={surveyStore.question11.comment}
              onChange={(e) => {
                surveyStore.setQuestion11comment(e.target.value);
              }}
              className={styles.input}
            />
          </div>
        </li>
      </ol>
      <div className={styles.btnsContainer}>
        <Link className={`${styles.survey__button} ${styles.backBtn}`} to="/survey/3">
          Назад
        </Link>
        <button className={`${styles.survey__button} ${styles.nextBtn2}`} onClick={handleGoNext}>
          Далее
        </button>
      </div>
    </div>
  );
};
