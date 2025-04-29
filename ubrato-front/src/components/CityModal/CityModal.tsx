import { FC, useEffect, useState } from 'react';
import styles from './citymodal.module.css';
import { getCities } from '@/api';

const mockCities = [
  { id: 0, name: "Москва", region: "Москва и Московская область" },
  { id: 1, name: "Санкт-Петербург", region: "Санкт-Петербург и Ленинградская область" },
  { id: 2, name: "Нижний Новгород", region: "Нижегородская область" },
  { id: 3, name: "Казань", region: "Республика Татарстан" },
  { id: 4, name: "Екатеринбург", region: "Свердловская область" },
  { id: 5, name: "Краснодар", region: "Краснодарский край" },
  { id: 6, name: "Самара", region: "Самарская область" },
  { id: 7, name: "Новосибирск", region: "Новосибирская область" },
  { id: 8, name: "Красноярск", region: "Красноярский край" },
  { id: 9, name: "Ростов-на-Дону", region: "Ростовская область" },
]

export const CityModal: FC<{
  setConfirm: (a: boolean) => void;
  setModal: (a: boolean) => void;
  setCity: (newCity: string) => void;
}> = ({ setConfirm, setModal, setCity }) => {
  const [citiesArr, setCitiesArr] = useState<{ id: number; name: string; region: string }[]>([]);
  const [confirmedCity, setConfirmedCity] = useState<string>('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getCities("").then(response => {
      console.log(citiesArr)
      setCitiesArr(response.data)
      setIsListOpen(true)
    })
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <input
          className={styles.input}
          type="text"
          placeholder="Начните вводить название города"
          value={inputValue}
          onChange={(e) => {
            (async () => {
              setInputValue(e.target.value);
              const res = await getCities(e.target.value);
              // console.log(res);
              setCitiesArr(res.data);
              setIsListOpen(true);
            })();
          }}
        />
        {mockCities.length !== 0 && isListOpen && (
          <>
            {mockCities?.filter(filterCity => filterCity.name.toLowerCase().includes(inputValue.toLowerCase())).length ?
              <div className={styles.citiesList}>
                {mockCities?.filter(filterCity => filterCity.name.toLowerCase().includes(inputValue.toLowerCase()))?.map((city) => (
                  <div
                    className={styles.city}
                    onClick={() => {
                      setIsListOpen(false);
                      setConfirmedCity(city.name);
                      setInputValue('');
                    }}
                    key={city.id}
                  >
                    {city.name}
                    <span className={`${styles.region} truncate`}>{city.region}</span>
                  </div>
                ))}
              </div>
              : <></>
            }
          </>
        )}
        {confirmedCity && (
          <p className={styles.newCity}>{confirmedCity}</p>
        )}
        <div className={styles.btns}>
          <button
            disabled={!isListOpen && confirmedCity.length === 0}
            onClick={() => {
              setConfirm(true);
              setModal(false);
              setCity(confirmedCity);
              document.body.style.overflow = 'scroll';
            }}
            className={styles.btn}
          >
            Подтвердить
          </button>
          <button
            onClick={() => {
              setModal(false);
              setConfirm(true);
              document.body.style.overflow = 'scroll';
            }}
            className={styles.cancelBtn}
          >
            Отмена
          </button>
        </div>
      </div>
    </div >
  );
};
