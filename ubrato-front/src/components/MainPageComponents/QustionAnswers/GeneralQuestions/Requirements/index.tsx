import { FC, useState } from 'react';
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import styles from './requirements.module.css';
import { Accordion, AccordionItem, Selection } from '@nextui-org/react';
import { ExpandButton } from './ExpandButton';
import { categories } from './categories';
import { Link } from 'react-router-dom';

const Requirements: FC = () => {
  const itemClasses = {
    base: `${styles.accordionItem}`,
    title: styles.accordionTitle,
    heading: styles.accordionHeading,
    indicator: styles.accordionIndicator,
    trigger: styles.accordionTrigger,
    content: styles.accordionContent,
    titleWrapper: styles.accordionTitleWrapper,
  };

  const [questionNumber, setQuestionNumber] = useState('1');

  return (
    <div className={qstyles.container}>
      <p className={qstyles.title}>Юрлицо</p>
      <p className={`${qstyles.text} ${qstyles.ml20}`}>
        На сайте Ubrato могут зарегистрироваться только действующие юридические лица, не находящееся
        в процедуре банкротства, на стадии ликвидации и в процессе присоединения к другому лицу с
        последующей ликвидацией. В настоящее время пользователями не могут стать индивидуальные
        предприниматели и физические лица.
      </p>
      <p className={qstyles.title}>B2B</p>
      <p className={`${qstyles.text} ${qstyles.ml20}`}>
        Доступ к площадке предоставлен компаниям, работающим в корпоративном сегменте
        (business-to-business, B2B).
      </p>
      <p className={qstyles.title}>ОКВЭД</p>
      <p className={`${qstyles.text} ${qstyles.ml20}`}>
        Условием для исполнителей является наличие действующего юридического лица с видом
        деятельности, относящемся к клинингу или к смежным услугам. При этом исполнитель может
        участвовать только в тендерах, соответствующих его ОКВЭД. Ubrato регистрирует компании со
        следующими категориями ОКВЭД:
      </p>
      {
        <Accordion
          variant="splitted"
          itemClasses={itemClasses}
          className={styles.accordionWrapper}
          onSelectionChange={(e: Selection) => {
            if (e instanceof Set) {
              if (e.size != 0) {
                setQuestionNumber(Array.from(e)[0].toString());
              } else {
                setQuestionNumber('0');
              }
            }
          }}
          defaultSelectedKeys={['1']}
          selectedKeys={[questionNumber]}
        >
          {categories.map((category) => (
            <AccordionItem
              indicator={
                <ExpandButton isActive={category.id.toString() === questionNumber.toString()} />
              }
              key={category.id}
              aria-label={category.title}
              title={category.title}
            >
              {category.component}
            </AccordionItem>
          ))}
        </Accordion>
      }
      <div className={qstyles.seeAlso}>
        <p className={qstyles.title}>Смотрите также:</p>
        <Link to="/faq?page=1&number=2#q1_2" className={`${qstyles.link} ${qstyles.ml20}`}>
          Как зарегистрироваться на сайте Ubrato?
        </Link>
      </div>
    </div>
  );
};

export default Requirements;
