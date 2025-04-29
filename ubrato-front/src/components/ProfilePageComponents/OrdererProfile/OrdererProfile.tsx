import { FC, useEffect, useRef, useState } from 'react';
import styles from './ordererprofile.module.css';
import { fetchOrdererProfile, getCities, putOrdererProfile, updateToken } from '@/api';
import { useUserInfoStore } from '@/store/userInfoStore';
import { Link } from 'react-router-dom';
import { Textarea } from "@nextui-org/react";

export const OrdererProfile: FC = () => {
  const userInfoState = useUserInfoStore()

  const [textareaValue, setTextareaValue] = useState<string>('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [citiesArr, setSitiesArr] = useState<{ id: number; name: string; region: string }[]>([]);
  const [locations, setLocations] = useState<{ id: number; name: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isEqual, setIsEqual] = useState(true);
  // const [isOpen, setOpen] = useState(false);

  const area = useRef<HTMLTextAreaElement>(null);
  const initalData = useRef<{ description: string; locations: { id: number; name: string }[] }>();

  useEffect(() => {
    if (
      textareaValue !== initalData.current?.description ||
      JSON.stringify(locations) !== JSON.stringify(initalData.current.locations)
    ) {
      setIsEqual(false);
    } else {
      setIsEqual(true);
    }
  }, [locations, textareaValue]);

  useEffect(() => {
    (async () => {
      const res = await updateToken(fetchOrdererProfile, null);
      setTextareaValue(res.description);
      initalData.current = res;
      setTimeout(() => {
        area.current!.style.height = `${Math.floor((area.current!.scrollHeight - 29) / 22) * 22 + 51
          }px`;
      }, 10);
      setLocations(res.locations);
    })();
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest('.dropdown')) {
        setIsListOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isListOpen]);
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Профиль Заказчика</h2>
      <div className={styles.infoContainer}>
        <img src="/info-blue-ic.svg" alt="" />
        <p className={styles.infoText}>
          Информация о вашей компании будет доступна компаниям-исполнителям после подведения итогов
          тендера.
        </p>
      </div>
      <p className={styles.text}>
        Нажмите на кнопку “<Link className={styles.link} to={`/organization/${userInfoState.user.organization.id}`}>Смотреть</Link>”, чтобы посмотреть, как эту информацию увидят ваши партнеры.
      </p>
      <div className={styles.borderedContainer}>
        <div className={styles.infoContainer}>
          <img src="/info-blue-ic.svg" alt="" />
          <p className={styles.infoTextBig}>Укажите подробное описание и локации вашей компании</p>
        </div>
      </div>
      <div className={styles.description}>
        <p>Описание компании</p>
        <Textarea
          className="border rounded-2xl border-gray-200 outline-none w-[490px]"
          classNames={{
            input: "outline-none"
          }}
          minRows={2}
          value={textareaValue}
          ref={area}
          maxLength={600}
          onChange={(e) => {
            setTextareaValue(e.target.value);
          }}
          name="description"
          id="description"
        />
      </div>
      <div className={styles.locations}>
        <p className={styles.partHeader}>Локации</p>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            value={inputValue}
            placeholder='введите город'
            onChange={(e) => {
              (async () => {
                setInputValue(e.target.value);
                const res = await getCities(e.target.value);
                // console.log(res.data);
                setSitiesArr(res.data);
                setIsListOpen(true);
              })();
            }}
          />

          {locations.length !== 0 && (
            <div className={styles.locationsList} >
              {locations.map((e) => (
                <div className={styles.locationItem} key={e.id} >
                  {e.name}
                  <button
                    onClick={() => {
                      setLocations(locations.filter((i) => i.id !== e.id));
                    }}
                    className={styles.deleteBtn}
                  >
                    <img src="/x-icon-white.svg" alt="" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {citiesArr.length !== 0 && isListOpen && (
            <div className={styles.citiesList}>
              {citiesArr.map((e) => (
                <div
                  className={styles.city}
                  onClick={() => {
                    setIsListOpen(false);
                    setInputValue('');
                    const newLocations = [...locations];
                    if (!newLocations.find((i) => i.name === e.name)) {
                      newLocations.push({ id: e.id, name: e.name });
                    }
                    setLocations(newLocations);
                  }}
                  key={e.id}
                >
                  {e.name}
                  <span className={styles.region}>{e.region}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        disabled={isEqual}
        onClick={() => {
          (async () => {
            await updateToken(putOrdererProfile, {
              description: textareaValue ?? '',
              locations: locations.map((e) => e.id),
            });
            const res = await updateToken(fetchOrdererProfile, null);
            setTextareaValue(res.description);
            initalData.current = res;
            setLocations(res.locations);
          })();
        }}
        className={styles.save}
      >
        Сохранить изменения
      </button>
    </div>
  );
};
