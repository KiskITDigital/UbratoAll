import { FC, useEffect, useState } from 'react';
import styles from '../MainPart.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Radio, RadioGroup } from '@nextui-org/react';
import { useSurveyStore } from '@/store/surveyStore';

export const Page1: FC = () => {
  const radioStyle = {
    base: styles.radioBase,
    wrapper: styles.radioWrapper,
    control: styles.radioControl,
  };

  const [error, setError] = useState('');
  const surveyStore = useSurveyStore();
  const navigate = useNavigate();

  const handleGoNext = () => {
    if (
      !surveyStore.question1.answer ||
      (surveyStore.question1.answer === 'свой вариант' && !surveyStore.question1.comment)
    ) {
      setError('Это обязательный вопрос');
    } else {
      surveyStore.setIsPage1Completed(true);
      navigate('/survey/2');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            Полезен ли <span className="text-accent">Ubrato</span> для бизнеса вашей компании?
          </p>
        </div>
      </div>

      <div className="max-w-[1130px] w-full px-[40px] xl:px-0 flex flex-col">
        <p className="font-bold">
          1. Помогает ли профильный агрегатор Ubrato в решении задач вашего бизнеса? *
        </p>
        <p>
          Чем полезен сайт Ubrato - смотрите на странице “<Link to="/" className="text-accent">О сервисе</Link>”.
        </p>
      </div>

      <div className="max-w-[1130px] w-full px-[40px] xl:px-0">
        <RadioGroup
          value={surveyStore.question1.answer}
          onValueChange={(v) => {
            surveyStore.setQuestion1(v);
            setError('');
          }}
        >
          <Radio classNames={radioStyle} value="да">
            Да
          </Radio>
          <Radio classNames={radioStyle} value="нет">
            Нет
          </Radio>
          <Radio classNames={radioStyle} value="не решил">
            Ещё не решил
          </Radio>
          <div className={styles.yourVariant}>
            <Radio classNames={radioStyle} value="свой вариант">
              Ваш комментарий
            </Radio>
            <input
              value={surveyStore.question1.comment}
              onChange={(e) => {
                surveyStore.setQuestion1comment(e.target.value);
              }}
              disabled={surveyStore.question1.answer !== 'свой вариант'}
              type="text"
              className={styles.input}
            />
          </div>
          {error && <p className={styles.errorText}>{error}</p>}
        </RadioGroup>
      </div>

      <button className="w-[220px] flex justify-between items-center h-[54px] bg-accent text-white px-4 rounded-2xl font-bold" onClick={handleGoNext}>
        Далее
        <img src="/arrow-with-line-right-white.svg" alt="" />
      </button>
    </div>
  );
};
