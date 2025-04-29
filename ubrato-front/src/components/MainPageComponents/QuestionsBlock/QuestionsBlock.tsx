import { FC, useEffect, useRef, useState } from 'react';
import styles from './questionsblock.module.css';
import { ExpandButton } from '@/components';
import { executorQustions, generalQuestions, ordererQustions } from '@/textData/questionsData';
import { useLocation, useNavigate } from 'react-router-dom';
import { Accordion, AccordionItem, Selection } from '@nextui-org/react';
import { useIsOrdererState } from '@/store/isOrdererStore';
import { useUserInfoStore } from '@/store/userInfoStore';

export const QuestionsBlock: FC = () => {
  const questions = useRef<HTMLDivElement>(null);
  const isOrdererState = useIsOrdererState();
  const userInfoStore = useUserInfoStore();

  const location = useLocation();

  // const questionsRef = useRef(null);

  const [questionNumber, setQuestionNumber] = useState('');
  const [pageNumber, setPageNumber] = useState('1');
  const [qustionsArr, setQuestionArr] = useState(generalQuestions);

  const itemClasses = {
    base: `${styles.accordionItem}`,
    title: styles.accordionTitle,
    heading: styles.accordionHeading,
    indicator: styles.accordionIndicator,
    trigger: styles.accordionTrigger,
    content: styles.accordionContent,
    titleWrapper: styles.accordionTitleWrapper,
  };

  const width: number | null = null;
  const widthR = useRef<number | null>(width);

  const navigate = useNavigate()

  useEffect(() => {
    if (window.outerWidth <= 450) {
      widthR.current = window.outerHeight;
    }
  }, []);

  useEffect(() => {
    if (userInfoStore.isLoggedIn) {
      if (isOrdererState.role === 'orderer') {
        setPageNumber('2');
      } else {
        setPageNumber('3');
      }
    }
  }, [isOrdererState.role, userInfoStore.isLoggedIn]);

  useEffect(() => {
    if (location.search) {
      setQuestionNumber(location.search.slice(-1));
      setPageNumber(location.search.slice(6, 7));
    } else if (location.pathname === '/faq') {
      window.scrollTo(0, questions.current!.offsetTop - 116);
    }
    setTimeout(() => {
      if (location.hash) {
        const question = document.getElementById(location.hash.slice(1));
        if (question) {
          if (question.previousElementSibling instanceof HTMLElement) {
            window.scrollTo(
              0,
              question.previousElementSibling.offsetTop - (widthR.current ? -55 : 16)
            );
          } else {
            window.scrollTo(0, question.offsetTop - (widthR.current ? 75 : 116));
          }
        }
      }
    }, 100);
  }, [location]);

  useEffect(() => {
    if (pageNumber === '1') {
      setQuestionArr(generalQuestions);
    } else if (pageNumber === '2') {
      setQuestionArr(executorQustions);
    } else if (pageNumber === '3') {
      setQuestionArr(ordererQustions);
    }
  }, [pageNumber]);

  return (
    <div ref={questions} className={`container ${styles.container}`} id="faq">
      <h2 className={styles.header}>
        Частые вопросы про <span className={styles.blueText}>Ubrato</span>
      </h2>
      <p className={styles.greytext}>
        {' '}
        Мы постоянно пополняем базу знаний, основываясь на Ваших вопросах.{' '}
      </p>
      <div className={styles.btnsblock} id="faq-default">
        <button
          disabled={pageNumber === '1'}
          onClick={() => {
            setPageNumber('1');
            setQuestionNumber('');
            setQuestionArr(generalQuestions);
          }}
          className={`${styles.button}`}
        >
          Общие вопросы
        </button>
        <button
          onClick={() => {
            setPageNumber('2');
            setQuestionNumber('');
            setQuestionArr(executorQustions);
          }}
          disabled={pageNumber === '2'}
          className={`${styles.button}`}
        >
          Исполнителю
        </button>
        <button
          onClick={() => {
            setPageNumber('3');
            setQuestionNumber('');
            setQuestionArr(ordererQustions);
          }}
          disabled={pageNumber === '3'}
          className={`${styles.button}`}
        >
          Заказчику
        </button>
      </div>
      <div id="hey" className={styles.pageQuestion}>
        {/* ССЫЛКА ВОТ НА ЭТОТ АККОРДЕОН */}

        <Accordion
          showDivider={false}
          className={styles.accordionWrapper}
          selectionMode="multiple"
          selectedKeys={[questionNumber]}
          itemClasses={itemClasses}
          onSelectionChange={(e: Selection) => {
            if (e instanceof Set) {
              if (e.size != 0) {
                setQuestionNumber(Array.from(e)[1].toString());
                navigate(`#q${pageNumber}_${Array.from(e)[1].toString()}`)
              } else {
                setQuestionNumber('0');
                navigate('#faq-default')
              }
            }
          }}
        >
          {qustionsArr.map((e, index) => {
            return (
              <AccordionItem
                id={`q${pageNumber}_${index + 1}`}
                indicator={<ExpandButton isActive={questionNumber === (index + 1).toString()} />}
                key={index + 1}
                title={e.title}
              >
                {e.textComponent}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};
