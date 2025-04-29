import { FC, FormEvent, Ref, useEffect, useRef } from "react";
import styles from './contacts-page.module.css'
import { Checkbox, Input, Textarea } from "@nextui-org/react";
import { useFormik } from "formik";
import { helpSchema } from "@/validation/helpSchema";
import { useIMask } from "react-imask";
import { Link, useLocation } from "react-router-dom";

interface HelpFormValuesT {
  name: string;
  phone: string;
  question: string;
  confirm: boolean;
  previousPage: string;
}


const ContactsPage: FC = () => {
  const location = useLocation()

  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: `${styles.checkText} ${styles.infoText}`,
  };

  const itemClasses = {
    input: styles.input,
    innerWrapper: styles.innerWrapper,
    base: styles.base,
    label: styles.label,
    errorMessage: styles.errorMessage,
    helperWrapper: styles.helperWrapper,
  };

  const initialValues: HelpFormValuesT = {
    name: '',
    phone: '',
    question: '',
    confirm: false,
    previousPage: location.state?.previousPage
  };

  const formik = useFormik<HelpFormValuesT>({
    initialValues: initialValues,
    onSubmit(values) {
      console.log(values);
    },
    validationSchema: helpSchema,
  });

  const { ref, value, setValue } = useIMask({ mask: '+{7}(900)000-00-00' });

  const startRef = useRef<HTMLHeadingElement>(null)

  const helpRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // console.log(location.state);
    if (location.state && 'isHelp' in location.state && location.state.isHelp || location.hash === "#contact-form") {
      helpRef.current!.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        const elementTop = helpRef.current!.getBoundingClientRect().top;
        window.scrollBy({ top: elementTop - 100, behavior: "smooth" });
      }, 0);
    } else {
      startRef.current!.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        const elementTop = startRef.current!.getBoundingClientRect().top;
        window.scrollBy({ top: elementTop - 300, behavior: "smooth" });
      }, 0);
    }
  }, [location.state]);

  return (
    <section ref={startRef} className={`${styles.container} container`}>
      <p className={styles.title}>Контакты <span>Ubrato (Убрато)</span></p>
      <div className={styles.infos}>
        <div className={styles.info}>
          <p className={styles.infoTitle}>8 800-775-67-57</p>
          <p className={styles.infoText}>Горячая линия доступна с 9:00 до 18:00 по московскому времени</p>
        </div>
        <div className={styles.info}>
          <p className={styles.infoTitle}>info@ubrato.ru</p>
          <p className={styles.infoText}>Электронная почта</p>
        </div>
        <div className={styles.info}>
          <p className={styles.infoTitle}>Москва, метро Румянцево</p>
          <p className={styles.infoText}>Адрес</p>
        </div>
      </div>
      <div style={{ overflow: "hidden", position: "relative" }}><a href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: 12, position: "absolute", top: 0 }}></a><a href="https://yandex.ru/maps/213/moscow/stops/station__10105315/?ll=37.466102%2C55.645837&tab=overview&utm_medium=mapframe&utm_source=maps&z=13.35" style={{ color: "#eee", fontSize: 12, position: "absolute", top: 14 }}></a><iframe src="https://yandex.ru/map-widget/v1/?ll=37.466102%2C55.645837&masstransit%5BstopId%5D=station__10105315&mode=masstransit&tab=overview&z=13.35" width="100%" height="380" allowFullScreen={true} style={{ position: "relative", borderRadius: 20, marginTop: 20 }}></iframe></div>
      <div ref={helpRef} id="contact-form" className={styles.contact}>
        <p className={styles.contactText}>
          Нашли ошибку или у вас есть предложение? Напишите нам
        </p>
        <form className="flex flex-col gap-5 bg-white p-5 rounded-[20px]" onSubmit={formik.handleSubmit}>
          <p className="text-[20px] font-bold">Обратная связь c <span className="text-accent">Ubrato</span></p>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Имя"
            label="Как к вам обращаться? *"
            value={formik.values.name}
            onChange={formik.handleChange}
            isInvalid={Boolean(formik.errors.name)}
            errorMessage={formik.errors.name}
            classNames={itemClasses}
          />
          <Input
            ref={ref as Ref<HTMLInputElement>}
            id="phone"
            name="phone"
            placeholder="+7 (900) 000 00 00"
            label="Ваш номер телефона: *"
            type="phone"
            value={value}
            onChange={formik.handleChange}
            onInput={(e: FormEvent<HTMLInputElement>) => {
              setValue(e.currentTarget.value);
              formik.handleChange(e);
            }}
            isInvalid={Boolean(formik.errors.phone)}
            errorMessage={formik.errors.phone}
            classNames={itemClasses}
          />
          <Textarea
            id="question"
            name="question"
            type="text"
            maxLength={1000}
            label="Какой вопрос у вас возник?"
            value={formik.values.question}
            onChange={formik.handleChange}
            classNames={itemClasses}
          />
          <Checkbox
            id="confirm"
            name="confirm"
            isSelected={formik.values.confirm}
            onChange={formik.handleChange}
            classNames={checkStyle}
          >
            Соглашаюсь с <Link className={styles.link} target="_blank" to="/rights?document=1">Политикой обработки персональных данных ООО “ИНТЕГРАЦИЯ”</Link> и даю <Link className={styles.link} target="_blank" to="/rights?document=3">Согласие на обработку персональных данных</Link>.
            <p className={`${styles.errorMessage} ${styles.checkErr}`}>{formik.errors.confirm}</p>
          </Checkbox>
          <button type="submit" className={styles.submit}>
            Заказать звонок
          </button>
        </form>
      </div>
      <div className={styles.data}>
        <p className={styles.dataTitle}>Данные компании</p>
        <div className={styles.dataBlock}>
          <p className={styles.dataBlockTitle}>Полное наименование организации: </p>
          <p className={styles.dataBlockText}>Общество с ограниченной ответственностью
            «ИНТЕГРАЦИЯ»</p>
        </div>
        <div className={styles.dataBlock}>
          <p className={styles.dataBlockTitle}>Сокращенное наименование организации:</p>
          <p className={styles.dataBlockText}>ООО «ИНТЕГРАЦИЯ»</p>
        </div>
        <div className={styles.dataBlock}>
          <p className={styles.dataBlockTitle}>Юридический адрес:</p>
          <p className={styles.dataBlockText}>107140, г. Москва, вн.тер.г. Муниципальный округ Красносельский, ул. Краснопрудная, д. 12/1, стр. 1, помещ. 1/6</p>
        </div>
        <div className={styles.dataBlock}>
          <p className={styles.dataBlockTitle}>ИНН</p>
          <p className={styles.dataBlockText}>7708421320</p>
        </div>
        <div className={styles.dataBlock}>
          <p className={styles.dataBlockTitle}>ОГРН</p>
          <p className={styles.dataBlockText}>1237700454815</p>
        </div>
        <div className={styles.dataBlock}>
          <p className={styles.dataBlockTitle}>Телефон</p>
          <p className={styles.dataBlockText}>+7-499-372-23-00</p>
        </div>
      </div>
    </section>
  );
}

export default ContactsPage;