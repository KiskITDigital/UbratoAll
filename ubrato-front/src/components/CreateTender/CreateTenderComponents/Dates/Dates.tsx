import { FC, forwardRef, Ref, useEffect, useRef, useState } from 'react';
import styles from '../../CreateTender.module.css';
import datesStyles from './Dates.module.css';
import { useCreateTenderState } from '@/store/createTenderStore';
import { Checkbox, Switch } from '@nextui-org/react';
import { addTwoDots } from '../../funcs';
import DateRangePickerLocal from '../DateRangePickerLocal/DateRangePickerLocal';
import { useIMask } from 'react-imask';

const Dates: FC<{ ref2?: React.LegacyRef<HTMLDivElement> }> = forwardRef<
  HTMLDivElement,
  { ref2?: React.LegacyRef<HTMLDivElement> }
>((_, ref2) => {
  const createTenderState = useCreateTenderState();

  const calendarRef1 = useRef<HTMLDivElement>(null);
  const calendarRef2 = useRef<HTMLDivElement>(null);

  const spanRef = useRef<HTMLSpanElement>(null);

  const priceInputRef1 = useRef<HTMLInputElement>(null);
  const priceInputRef2 = useRef<HTMLInputElement>(null);

  const [calendar1, setCalendar1] = useState(false);
  const [calendar2, setCalendar2] = useState(false);

  const { ref, value, setValue } = useIMask({
    mask: Number,
    min: 0.01,
    max: 9999999999.99,
    thousandsSeparator: ' ',
    scale: 2,
    radix: ',',
    mapToRadix: ['.'],
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Node) {
        if (calendarRef1.current && !calendarRef1.current.contains(target)) {
          setCalendar1(false);
          calendar1 && spanRef.current?.focus();
        }
        if (calendarRef2.current && !calendarRef2.current.contains(target)) {
          setCalendar2(false);
          calendar2 && spanRef.current?.focus();
        }
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [calendar1, calendar2]);

  useEffect(() => {
    if (createTenderState.price === '') {
      setValue('');
    }
  }, [setValue, createTenderState.price]);

  return (
    <div ref={ref2} className={`${styles.firstSections}`}>
      <span ref={spanRef} tabIndex={-1}></span>
      <div className={`${styles.firstSections__div} ${styles.firstSections__responses}`}>
        <div className={`${styles.firstSections__div__title}`}>
          <p className={`${styles.firstSections__div__title__p}`}>Прием откликов</p>
        </div>
        <div
          ref={calendarRef1}
          className={`${styles.firstSections__div__main} ${styles.firstSections__div__mainWork} ${datesStyles.dateTimeContainer}`}
          onFocus={(event) => {
            const target = event.target;
            if (target instanceof Node) {
              if (priceInputRef1.current?.contains(target)) {
                priceInputRef1.current.focus();
              } else if (priceInputRef2.current?.contains(target)) {
                priceInputRef2.current.focus();
              } else {
                setCalendar1(true);
              }
            }
          }}
        >
          <p className={`${styles.firstSections__div__main__block__p}`}>Начало</p>
          <p className={`${styles.firstSections__div__main__block__p}`}>Окончание</p>
          <DateRangePickerLocal
            state={calendar1}
            setState={(newVal: boolean) => {
              setCalendar1(newVal);
              spanRef.current?.focus();
            }}
            timeToChangeStart="reception_start"
            timeToChangeEnd="reception_end"
          />
          <div className={datesStyles.dateTime}>
            <span className={styles.firstSections__responses__inputs__span}></span>
            <input
              // onClick={(e) => e.stopPropagation()}
              ref={priceInputRef1}
              placeholder="00:00"
              maxLength={5}
              value={createTenderState.reception_time_start}
              onChange={(e) =>
                createTenderState.handleSimpleInput(
                  'reception_time_start',
                  e.currentTarget.value,
                  addTwoDots
                )
              }
              type="text"
              className={`${styles.input} ${styles.firstSections__responses__inputs__input2}`}
            />
          </div>
          <div className={`${datesStyles.dateTime} ${datesStyles.dateTime2}`}>
            <span className={styles.firstSections__responses__inputs__span}></span>
            <input
              // onClick={(e) => e.stopPropagation()}
              ref={priceInputRef2}
              placeholder="00:00"
              maxLength={5}
              value={createTenderState.reception_time_end}
              onChange={(e) =>
                createTenderState.handleSimpleInput(
                  'reception_time_end',
                  e.currentTarget.value,
                  addTwoDots
                )
              }
              type="text"
              className={`${styles.input} ${styles.firstSections__responses__inputs__input2}`}
            />
          </div>
        </div>
      </div>
      <div className={`${styles.firstSections__div}`}>
        <div className={`${styles.firstSections__div__title}`}>
          <p className={`${styles.firstSections__div__title__p}`}>Стоимость</p>
          <Switch
            aria-hidden={false}
            className={`${styles.SwitchNextUI} ${
              createTenderState.is_NDS ? styles.SwitchNextUIOn : ''
            }`}
            isSelected={createTenderState.is_NDS}
            onValueChange={() =>
              createTenderState.handleSimpleInput('is_NDS', !createTenderState.is_NDS)
            }
          >
            вкл. НДС
          </Switch>
        </div>
        <div className={`${styles.firstSections__div__main}`}>
          <div className={`${styles.firstSections__div__main__block}`}>
            <p className={`${styles.firstSections__div__main__block__p}`}>Стоимость в рублях</p>
            <input
              // onClick={(e) => e.stopPropagation()}
              onFocus={() => createTenderState.removeError('price')}
              onBlur={() => {
                !createTenderState.price && createTenderState.addError('price');
                +createTenderState.price === 0 && createTenderState.handleSimpleInput('price', '');
              }}
              value={value}
              onChange={(e) => {
                if (/^0\d+/.test(e.currentTarget.value)) {
                  setValue(value.slice(1));
                } else {
                  setValue(e.currentTarget.value);
                }
                createTenderState.handleSimpleInput('price', e.currentTarget.value);
              }}
              className={`${styles.input} ${styles.firstSections__div__main__block__input} ${
                createTenderState.errors.includes('price') && !createTenderState.is_contract_price
                  ? styles.inputError
                  : ''
              }`}
              type="text"
              ref={ref as Ref<HTMLInputElement>}
            />
            {createTenderState.errors.includes('price') && !createTenderState.is_contract_price && (
              <p
                className={`${styles.inputErrorText} ${styles.inputErrorTextPrice} ${styles.inputErrorTenderPrice}`}
              >
                Обязательно для заполнения
              </p>
            )}
          </div>
          <div
            className={`${styles.firstSections__div__main__block} ${styles.CheckboxNextUI__block}`}
          >
            <span className={`${styles.CheckboxNextUI__block__span}`}></span>
            <Checkbox
              onValueChange={() =>
                createTenderState.handleSimpleInput(
                  'is_contract_price',
                  !createTenderState.is_contract_price
                )
              }
              className={`${styles.CheckboxNextUI} ${
                createTenderState.is_contract_price ? styles.CheckboxNextUIActive : ''
              } ${styles.CheckboxNextUIIsContract}`}
              isSelected={createTenderState.is_contract_price}
            >
              Договорная
            </Checkbox>
          </div>
        </div>
      </div>
      <div className={`${styles.firstSections__div} ${styles.firstSections__responses}`}>
        <div className={`${styles.firstSections__div__title}`}>
          <p className={`${styles.firstSections__div__title__p}`}>Оказание услуг</p>
        </div>
        <div
          className={`${styles.firstSections__div__main} ${styles.firstSections__div__mainWork}`}
          ref={calendarRef2}
          onFocus={(event) => {
            const target = event.target;
            if (target instanceof Node) {
              setCalendar2(true);
            }
          }}
        >
          <p className={`${styles.firstSections__div__main__block__p}`}>Начало</p>
          <p className={`${styles.firstSections__div__main__block__p}`}>Окончание</p>
          <DateRangePickerLocal
            state={calendar2}
            setState={(newVal: boolean) => {
              setCalendar2(newVal);
              spanRef.current?.focus();
            }}
            timeToChangeStart="work_start"
            timeToChangeEnd="work_end"
          />
        </div>
      </div>
    </div>
  );
});

export default Dates;
