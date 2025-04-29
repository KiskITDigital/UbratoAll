import { FC, useEffect, useRef, useState } from 'react';
import styles from './companyinfo.module.css';
import { fetchOrganizationInfo, fetchFileInfo, updateToken, uploadFile } from '@/api';
import { Link } from 'react-router-dom';
import { contacntsT, orgInfoT, putBrandContacts, putBrandData } from '@/api/profileOrganization';
import { Avatar, Checkbox } from '@nextui-org/react';
import { InputPhone } from '../inputPhone/InputPhone';
import { InputContact } from '../InputContact/InputContact';
import Modal from '@/components/Modal';
import ContactModal from "@/components/Modal/ContactModal";

export const CompanyInfo: FC = () => {
  const [companyInfo, setCompanyInfo] = useState<orgInfoT>();
  const [brandName, setBrandName] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isBrandEqual, setIsBrandEqual] = useState(true);
  const [avatarDate, setAvatarDate] = useState<Date>();
  // const [avatarInfo, setAvatarInfo] = useState<{
  //   name: string;
  //   format: string;
  //   size: number;
  //   ctime: string;
  // }>(null);
  const [avatarInfo, setAvatarInfo] = useState<null | { name: string; format: string; size: number; ctime: string; }>(null);

  const [emails, setEmails] = useState<{ contact: string; info: string }[]>([]);
  const [phones, setPhones] = useState<{ contact: string; info: string }[]>([]);
  const [messengers, setMessengers] = useState<{ contact: string; info: string }[]>([]);
  const [isContactsEqual, setIsContactsEqual] = useState(true);
  const [checkValue, setCheckValue] = useState(false);
  const [error, setError] = useState('');
  const [dataChanged, setDataChanged] = useState(false);

  const initialBrandInfo = useRef<{ brand_name: string; avatar: string }>();
  const initialContacts = useRef<{
    phones: { contact: string; info: string }[];
    emails: { contact: string; info: string }[];
    messengers: { contact: string; info: string }[];
  }>();

  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: styles.checkText,
  };

  const avatarStyle = {
    base: styles.base,
    img: styles.img,
    icon: styles.icon,
  };

  useEffect(() => {
    if (
      JSON.stringify(phones.filter((e) => e.contact.length !== 0)) !==
      JSON.stringify(initialContacts.current?.phones) ||
      JSON.stringify(emails.filter((e) => e.contact.length !== 0)) !==
      JSON.stringify(initialContacts.current?.emails) ||
      JSON.stringify(messengers.filter((e) => e.contact.length !== 0)) !==
      JSON.stringify(initialContacts.current?.messengers)
    ) {
      setIsContactsEqual(false);
    } else {
      setIsContactsEqual(true);
    }
  }, [emails, messengers, phones, dataChanged]);

  useEffect(() => {
    if (
      initialBrandInfo.current?.avatar !== avatar ||
      initialBrandInfo.current.brand_name !== brandName
    ) {
      setIsBrandEqual(false);
    } else {
      setIsBrandEqual(true);
    }
    (async () => {
      if (avatar !== null) {
        const avatarInfoRes = await fetchFileInfo(avatar.replace('https://cdn.ubrato.ru/s3', ''));
        setAvatarDate(new Date(avatarInfoRes.ctime));
        setAvatarInfo(avatarInfoRes);
      }
    })();
  }, [avatar, brandName, dataChanged]);

  useEffect(() => {
    (async () => {
      const res = await updateToken(fetchOrganizationInfo, null);
      setBrandName(res.brand_name);
      setAvatar(res.avatar);
      if (res.avatar) {
        (async () => {
          const avatarInfoRes = await fetchFileInfo(
            res.avatar.replace('https://cdn.ubrato.ru/s3', '')
          );
          setAvatarDate(new Date(avatarInfoRes.ctime));
          setAvatarInfo(avatarInfoRes);
        })();
      }
      if (res.email.length > 0) {
        setEmails([...res.email]);
      } else {
        setEmails([...res.email, { contact: '', info: '' }]);
      }
      if (res.phone.length > 0) {
        setPhones([...res.phone]);
      } else {
        setPhones([...res.email, { contact: '', info: '' }]);
      }
      if (res.messenger.length > 0) {
        setMessengers([...res.messenger]);
      } else {
        setMessengers([...res.messenger, { contact: '', info: '' }]);
      }
      setCompanyInfo(res);
      initialBrandInfo.current = { brand_name: res.brand_name, avatar: res.avatar };
      initialContacts.current = {
        phones: JSON.parse(JSON.stringify(res.phone)),
        emails: JSON.parse(JSON.stringify(res.email)),
        messengers: JSON.parse(JSON.stringify(res.messenger)),
      };
    })();
  }, []);

  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Публичная информация о компании</h2>
      <div className={styles.infoContainer}>
        <img src="/info-ic.svg" alt="" />
        <p className={styles.infoText}>
          Вся информация с этой страницы будет опубликована в публичном профиле вашей компании за
          исключением контактов. Их ваши контрагенты увидят после подведения итогов тендера.
        </p>
      </div>
      <div className={styles.brandInfo}>
        <h3 className={styles.blockHeader}>Бренд</h3>
        <div className={styles.brandGrid}>
          <p className={styles.gridHeader}>Наименование бренда</p>
          <input
            value={brandName}
            onChange={(e) => {
              setBrandName(e.target.value);
            }}
            className={styles.input}
            type="text"
          />
          <p className={styles.gridHeader}>Логотип компании</p>
          <div className={styles.avatarContainer}>
            <Avatar src={avatar ?? ''} classNames={avatarStyle} />
            <div className={styles.avatarInfo}>
              {avatar && (
                <>
                  <div className={styles.flexText}>
                    <p className={styles.text}>{avatarInfo?.format.slice(1)}</p>
                    <p className={styles.text}>
                      {avatarInfo ? (avatarInfo?.size / 1024).toFixed(1) : ''}kb
                    </p>
                  </div>
                  <p className={styles.text}>
                    Загружен{' '}
                    {avatarDate?.toLocaleString('default', { day: 'numeric', month: 'long' })}{' '}
                    {avatarDate?.getFullYear()}
                  </p>
                </>
              )}
              <label htmlFor="brand_avatar">
                <input
                  onChange={async (e) => {
                    const rawData = e.target.files![0];
                    const token = localStorage.getItem('token');
                    const parameters = {
                      file: rawData,
                      private: false,
                    };
                    if (token) {
                      const link = await updateToken<string, { file: File; private: boolean }>(
                        uploadFile,
                        parameters
                      );
                      const avatar = `https://cdn.ubrato.ru/s3${link?.replace('/files', '')}`;
                      setAvatar(avatar);
                    }
                  }}
                  className={styles.baseInput}
                  id="brand_avatar"
                  accept="image/png, image/jpeg"
                  type="file"
                />
                <p className={styles.avatarInput}>
                  <img src="/change-ic.svg" alt="" /> Заменить
                </p>
              </label>
              {avatar && (
                <p
                  onClick={() => {
                    setAvatar('');
                    setAvatarInfo(null);
                  }}
                  className={`${styles.avatarInput} ${styles.deleteAvatar}`}
                >
                  <img src="/trash-bin.svg" alt="" />
                  Удалить
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              const params = { name: brandName, avatar: avatar ?? '' };
              (async () => {
                await updateToken(putBrandData, params);
                const res = await updateToken(fetchOrganizationInfo, null);
                initialBrandInfo.current = { brand_name: res.brand_name, avatar: res.avatar };
                setBrandName(res.brand_name);
                setAvatar(res.avatar);
                setCompanyInfo(res);
                setDataChanged(!dataChanged);
              })();
            }}
            className={styles.brandBtn}
            disabled={isBrandEqual}
          >
            Сохранить изменения
          </button>
        </div>
      </div>
      <div className={styles.contacts}>
        <h3 className={styles.blockHeader}>Контакты</h3>
        <div className={styles.brandGrid}>
          <p className={styles.gridHeader}>Номер телефона</p>
          <div className={styles.inputs}>
            {phones.length ?
              <>
                {phones.map((_, ix) => (
                  <InputPhone
                    phones={phones}
                    setPhones={setPhones}
                    ix={ix}
                    key={ix}
                  />
                ))}
              </>
              :
              <InputPhone
                phones={phones}
                setPhones={setPhones}
                ix={0}
                key={0}
              />
            }
            <button
              onClick={() => {
                const newPhones = [...phones];
                newPhones.push({ contact: '', info: '' });
                setPhones(newPhones);
              }}
              className={styles.addContact}
            >
              Добавить еще один номер телефона
            </button>
          </div>
          <p className={styles.gridHeader}>Электронная почта</p>
          <div className={styles.inputs}>
            {emails.length ?
              <>
                {emails.map((_, ix) => (
                  <InputContact
                    data={emails}
                    setData={setEmails}
                    ix={ix}
                    id="email"
                    key={ix}
                  />
                ))}
              </>
              :
              <InputContact
                data={emails}
                setData={setEmails}
                ix={0}
                id="email"
                key={0}
              />
            }
            <button
              onClick={() => {
                const newMails = [...emails];
                newMails.push({ contact: '', info: '' });
                setEmails(newMails);
              }}
              className={styles.addContact}
            >
              Добавить еще один адрес электронной почты
            </button>
          </div>
          <p className={styles.gridHeader}>Мессенджер</p>
          <div className={styles.inputs}>
            {messengers.length ?
              <>
                {messengers.map((_, ix) => (
                  <InputContact
                    data={messengers}
                    setData={setMessengers}
                    ix={ix}
                    id="messenger"
                    key={ix}
                  />
                ))}
              </>
              :
              <InputContact
                data={messengers}
                setData={setMessengers}
                ix={0}
                id="messenger"
                key={0}
              />
            }
            <button
              onClick={() => {
                const newMessengers = [...messengers];
                newMessengers.push({ contact: '', info: '' });
                setMessengers(newMessengers);
              }}
              className={styles.addContact}
            >
              Добавить еще один мессенджер
            </button>
          </div>
          {!isContactsEqual && (
            <>
              <div className={`${styles.dataChanged}`}>
                <img src="/info-blue-ic.svg" alt="" />
                <p>Вы изменили данные</p>
              </div>
              <div>
                <Checkbox
                  isSelected={checkValue}
                  onValueChange={(e) => {
                    setCheckValue(e);
                    setError('');
                  }}
                  classNames={checkStyle}
                >
                  Соглашаюсь с{' '}
                  <Link className={styles.link} target="_blank" to="/rights?document=1">Политикой обработки персональных данных ООО “ИНТЕГРАЦИЯ”</Link> и даю{' '}
                  <Link className={styles.link} target="_blank" to="/rights?document=3">Согласие на обработку персональных данных</Link>
                  <p className={styles.errorMessage}>{error}</p>
                </Checkbox>
              </div>
            </>
          )}
          <button
            onClick={() => {
              if (checkValue) {
                (async () => {
                  const params: contacntsT = {
                    phones: phones.filter((e) => e.contact.length !== 0),
                    emails: emails.filter((e) => e.contact.length !== 0),
                    messengers: messengers.filter((e) => e.contact.length !== 0),
                  };
                  await updateToken(putBrandContacts, params);
                  const res = await updateToken(fetchOrganizationInfo, null);
                  setEmails(res.email);
                  setPhones(res.phone);
                  setMessengers(res.messenger);
                  initialContacts.current = {
                    phones: JSON.parse(JSON.stringify(res.phone)),
                    emails: JSON.parse(JSON.stringify(res.email)),
                    messengers: JSON.parse(JSON.stringify(res.messenger)),
                  };
                  setDataChanged(!dataChanged);
                })();
              } else {
                setError('Обязательное поле');
              }
            }}
            className={styles.brandBtn}
            disabled={isContactsEqual}
          >
            Сохранить изменения
          </button>
        </div>
      </div>
      <div className={styles.egrulData}>
        <h3 className={styles.blockHeader}>Данные из ЕГРЮЛ</h3>
        <div className={styles.infoContainer}>
          <img src="/info-ic.svg" alt="" />
          <p className={styles.infoText}>
            Данные компании получены из Единого государственного реестра юридических лиц
            автоматически на основе идентификационного номера налогоплательщика. Если вы заметили
            ошибку,{' '}
            <span className="underline cursor-pointer" onClick={() => setOpenModal(true)}>
              свяжитесь
            </span>{' '}
            с администрацией Ubrato.
          </p>
        </div>
        <div className="grid grid-cols-2 w-full items-center mt-[20px] gap-[16px]">
          <p className={`text-base ${styles.rowName}`}>Сокращенное наименование</p>
          <p className={styles.rowData}>{companyInfo?.short_name}</p>
          <p className={`text-base ${styles.rowName}`}>Полное наименование</p>
          <p className={styles.rowData}>{companyInfo?.full_name}</p>
          <p className={`text-base ${styles.rowName}`}>ИНН</p>
          <p className={`${styles.rowData} w-[222px]`}>{companyInfo?.inn}</p>
          <p className={`text-base ${styles.rowName}`}>ОКПО</p>
          <p className={`${styles.rowData} w-[222px]`}>{companyInfo?.okpo}</p>
          <p className={`text-base ${styles.rowName}`}>ОГРН</p>
          <p className={`${styles.rowData} w-[222px]`}>{companyInfo?.ogrn}</p>
          <p className={`text-base ${styles.rowName}`}>КПП</p>
          <p className={`${styles.rowData} w-[222px]`}>{companyInfo?.kpp}</p>
          <p className={`text-base ${styles.rowName}`}>Код налогового органа</p>
          <p className={`${styles.rowData} w-[222px]`}>{companyInfo?.tax_code}</p>
        </div>
      </div>
      <Modal isOpen={openModal}>
        <ContactModal onClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
};
