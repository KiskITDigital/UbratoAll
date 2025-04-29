import { FC, useEffect, useState } from 'react';
import styles from './profiledocuments.module.css';
import { FileInput } from '../FileInput/FileInput';
import { useProfileDocumentsStore } from '@/store/profileDocumentsStore';
import { Checkbox } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { verifyUser } from "@/api/verification";
import Modal from "@/components/Modal";
import ContactModal from "@/components/Modal/ContactModal";

export const ProfileDocuments: FC = () => {
  const profileDocuments = useProfileDocumentsStore();
  const fetchDocuments = profileDocuments.fetchDocuments;

  const [disabled, setDisabled] = useState(true);
  const [checkBoxes, setCheckBoxes] = useState({
    1: false,
    2: false,
    3: false,
  });

  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: `${styles.checkText} ${styles.infoText}`,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDocuments();
  }, [fetchDocuments]);

  useEffect(() => {
    if (
      profileDocuments.documents.every(document => document.idFile && document.link) &&
      checkBoxes[1] &&
      checkBoxes[2] &&
      checkBoxes[3]
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [checkBoxes, profileDocuments.documents]);

  function handleUserVerify() {
    setDisabled(true)
    verifyUser(localStorage.getItem("token") || "").catch((error) => {
      console.log(error)
      setDisabled(false)
    })
  }

  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>Документы для верификации</h2>
        <p>Чтобы начать работу с тендерами пройдите верификацию.</p>
        <p>
          Загрузите выписку из ЕГРЮЛ, приказ о назначении генерального директора, карточку и устав
          компании.
        </p>
      </div>
      {profileDocuments.documents.map((e) => (
        <FileInput
          key={e.id}
          id={e.id}
          header={e.header}
          type={e.type}
          link={e.link}
          idFile={e.idFile}
        />
      ))}
      <div className={styles.checkContainer}>
        <Checkbox
          isSelected={checkBoxes[1]}
          onValueChange={() => {
            setCheckBoxes({ 1: !checkBoxes[1], 2: checkBoxes[2], 3: checkBoxes[3] });
          }}
          classNames={checkStyle}
        >
          Принимаю <Link className={styles.link} target="_blank" to="/rights?document=2">Пользовательское соглашение ООО «ИНТЕГРАЦИЯ»</Link>
        </Checkbox>
        <Checkbox
          isSelected={checkBoxes[2]}
          onValueChange={() => {
            setCheckBoxes({ 1: checkBoxes[1], 2: !checkBoxes[2], 3: checkBoxes[3] });
          }}
          classNames={checkStyle}
        >
          Соглашаюсь с <Link className={styles.link} target="_blank" to="/rights?document=1">Политикой обработки персональных данных ООО «ИНТЕГРАЦИЯ»</Link>
        </Checkbox>
        <Checkbox
          isSelected={checkBoxes[3]}
          onValueChange={() => {
            setCheckBoxes({ 1: checkBoxes[1], 2: checkBoxes[2], 3: !checkBoxes[3] });
          }}
          classNames={checkStyle}
        >
          Даю <Link className={styles.link} target="_blank" to="/rights?document=3">Согласие на обработку Персональных данных</Link>
        </Checkbox>
        <button disabled={disabled} className={styles.send} onClick={handleUserVerify}>
          Отправить на верификацию
        </button>
        <p className={styles.help}>Есть вопросы по верификации?</p>
        <p className={styles.help}>
          <span className={styles.link} onClick={() => setOpenModal(true)}>
            Напишите
          </span>{' '}
          телефон и мы перезвоним.
        </p>
      </div>
      <Modal isOpen={openModal}>
        <ContactModal onClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
};
