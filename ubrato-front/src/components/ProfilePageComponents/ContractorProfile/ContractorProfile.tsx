import { FC, useEffect, useRef, useState } from 'react';
import styles from '../OrdererProfile/ordererprofile.module.css';
import { getCities, updateToken, putContractorProfile, fetchContractorProfile } from '@/api';
import { contractorProfileData } from '@/api/profileOrganization';
import { useCleaningTypeStore } from '@/store/cleaningTypeStore';
import { useTypesObjectsStore } from '@/store/objectsStore';
import { Accordion, AccordionItem, Textarea } from '@nextui-org/react';
import ArrowIC from './arrow.svg?react';
import { ServiceCard } from '../ServiceCard/ServiceCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserInfoStore } from '@/store/userInfoStore';
import { Portfolio } from '../Portfolio/Portfolio';

type locations = {
  id: number;
  name: string;
  types: { isChecked: boolean; id: number; name: string }[];
}[];

type services = {
  id: number;
  name: string;
  types: { isChecked: boolean; id: number; name: string; price: number | undefined | null }[];
}[];

export const ContractorProfile: FC = () => {
  const userInfoState = useUserInfoStore()

  const [textareaValue, setTextareaValue] = useState<string>('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [citiesArr, setSitiesArr] = useState<{ id: number; name: string; region: string }[]>([]);
  const [locations, setLocations] = useState<{ id: number; name: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [objectsList, setObjectsList] = useState<locations>([]);
  const [services, setServices] = useState<services>([]);
  const [isServicesShown, setIsServicesShown] = useState(false);
  const [isObjectsShown, setIsObjectsShown] = useState(false);
  const [isDataEqual, setIsDataEqual] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const locationsListRef = useRef<HTMLDivElement>(null);
  const [portfolioList, setPortfolioList] = useState<
    { id: string; name: string; description: string; links: string[]; selected: boolean }[]
  >([]);

  const [areAllLocations, setAreAllLocations] = useState(true);

  const portfolioRef = useRef<HTMLHeadingElement>(null)

  const location = useLocation();

  const navigate = useNavigate();
  const userStore = useUserInfoStore();

  const area = useRef<HTMLTextAreaElement>(null);
  const initalData = useRef<contractorProfileData>();

  const objectsStore = useTypesObjectsStore();
  const servicesStore = useCleaningTypeStore();
  const fetchCleaningTypes = servicesStore.fetchCleaningTypes;
  const fetchObjects = objectsStore.fetchObjects;

  const addNewPortfolio = (portfolio: {
    id: string;
    name: string;
    description: string;
    links: string[];
    selected: boolean;
  }) => {
    setPortfolioList([...portfolioList, portfolio]);
  };

  const itemClasses = {
    base: `${styles.accordionItem}`,
    title: styles.accordionTitle,
    heading: styles.accordionHeading,
    indicator: styles.accordionIndicator,
    trigger: styles.accordionTrigger,
    content: styles.accordionContent,
    titleWrapper: styles.accordionTitleWrapper,
  };

  const handleServiceCheckbox = (id: number) => {
    let newServices = [...services];
    newServices = newServices.map((e) => {
      return {
        name: e.name,
        id: e.id,
        types: e.types.map((t) => {
          if (t.id === id) {
            return {
              isChecked: !t.isChecked,
              name: t.name,
              price: t.price === undefined && t.price !== null ? 100 : undefined,
              id: t.id,
            };
          } else {
            return t;
          }
        }),
      };
    });
    setServices(newServices);
  };

  const handleObjectsCheckbox = (id: number) => {
    let newObjects = [...objectsList];
    newObjects = newObjects.map((e) => {
      return {
        name: e.name,
        id: e.id,
        types: e.types.map((t) => {
          if (t.id === id) {
            return {
              isChecked: !t.isChecked,
              name: t.name,
              id: t.id,
            };
          } else {
            return t;
          }
        }),
      };
    });
    setObjectsList(newObjects);
  };

  const handleServicePrice = (id: number, price: string) => {
    let newServices = [...services];
    newServices = newServices.map((e) => {
      return {
        name: e.name,
        id: e.id,
        types: e.types.map((t) => {
          if (t.id === id) {
            return {
              isChecked: t.isChecked,
              name: t.name,
              price: price ? parseFloat(price) : null,
              id: t.id,
            };
          } else {
            return t;
          }
        }),
      };
    });
    setServices(newServices);
  };

  useEffect(() => {
    if (!userStore.user.is_contractor) {
      navigate('..');
    }
  }, [navigate, userStore.user.is_contractor]);

  useEffect(() => {
    const newObjects: { id: number; name: string }[] = [];
    const newServices: { id: number; name: string; price: number }[] = [];
    objectsList.forEach((e) => {
      e.types
        .filter((t) => t.isChecked)
        .forEach((t) => {
          newObjects.push({ id: t.id, name: t.name });
        });
    });
    services.forEach((e) => {
      e.types
        .filter((t) => t.isChecked)
        .forEach((t) => {
          newServices.push({ id: t.id, name: t.name, price: t.price ?? 0 });
        });
    });
    if (
      JSON.stringify(newServices) !== JSON.stringify(initalData.current?.services) ||
      JSON.stringify(newObjects) !== JSON.stringify(initalData.current?.objects) ||
      textareaValue !== initalData.current?.description ||
      JSON.stringify(locations) !== JSON.stringify(initalData.current.locations)
    ) {
      setIsDataEqual(false);
    } else {
      setIsDataEqual(true);
    }
  }, [locations, objectsList, services, textareaValue, dataChanged]);

  useEffect(() => {
    (async () => {
      const res = await updateToken(fetchContractorProfile, null);
      // console.log(res);
      setLocations(res.locations);
      setTextareaValue(res.description);
      if (objectsStore.apiObjects.length === 0) {
        await fetchObjects();
      }
      if (servicesStore.apiCleaningTypes.length === 0) {
        await fetchCleaningTypes();
      }
      const newServices = servicesStore.apiCleaningTypes.map((e) => {
        return {
          name: e.name,
          id: e.id,
          types: e.types.map((t) => {
            const price = res.services.find((i) => i.id === t.id);
            return { isChecked: price ? true : false, name: t.name, id: t.id, price: price?.price };
          }),
        };
      });
      const newObjects = objectsStore.apiObjects.map((e) => {
        return {
          name: e.name,
          id: e.id,
          types: e.types.map((t) => {
            const isChecked = res.objects.find((i) => i.id === t.id);
            return { isChecked: isChecked ? true : false, name: t.name, id: t.id };
          }),
        };
      });
      setServices(newServices);
      setObjectsList(newObjects);
      setPortfolioList(
        res.portfolio.map((e) => {
          return { ...e, selected: false };
        })
      );
      initalData.current = res;
    })();
  }, [fetchCleaningTypes, fetchObjects, objectsStore.apiObjects, servicesStore.apiCleaningTypes]);
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     // if (
  //     //   locationsListRef.current
  //     //   // !locationsListRef.current.contains(event.target as Node)
  //     // ) {
  //     //   setIsListOpen(false);
  //     // }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   // return () => {
  //   //   document.removeEventListener('mousedown', handleClickOutside);
  //   // };
  // }, [locationsListRef]);

  useEffect(() => {
    setTimeout(() => {
      if (location.state?.refTo === "portfolio" && portfolioRef.current) {
        portfolioRef.current.scrollIntoView({ behavior: "smooth" })
        const elementTop = portfolioRef.current!.getBoundingClientRect().top;
        window.scrollBy({ top: elementTop - 100, behavior: "smooth" });
      }
    }, 300);
  }, [location.state?.refTo, portfolioRef]);

  // useEffect(() => {
  //   if (!inputValue) setTimeout(() => setIsListOpen(false), 0)
  // }, [inputValue]);

  const changeCities = async (text: string) => {
    setInputValue(text);
    const res = await getCities(text);
    setSitiesArr(res.data);
    text ? setIsListOpen(true) : setIsListOpen(false)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Профиль исполнителя</h2>
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
        <p>Локации</p>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            value={inputValue}
            placeholder='введите город'
            onChange={(e) => changeCities(e.target.value)}
          />
          {locations.length !== 0 && (
            <div className={styles.locationsList} ref={locationsListRef}>
              {(areAllLocations && locations.length > 6 ? locations.slice(0, 6) : locations).map((e) => (
                <div className={styles.locationItem} key={e.id}>
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
              {locations.length > 6 && <>
                {!areAllLocations && <br />}
                <button onClick={() => setAreAllLocations(prev => !prev)} className={styles.areAllLocationsButton}>Показать {areAllLocations ? "все локации" : "меньше"}</button>
              </>}
            </div>
          )}
          {citiesArr.length !== 0 && isListOpen && (
            <div className={styles.citiesList}>
              {citiesArr.map((e) => (
                <div
                  className={styles.city}
                  onClick={() => {
                    const newLocations = [...locations];
                    if (!newLocations.find((i) => i.name === e.name)) newLocations.unshift({ id: e.id, name: e.name })
                    setLocations(newLocations);
                    setIsListOpen(false);
                    setInputValue('');
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
      <div className="border-b border-dashed border-[rgba(0,0,0,0.15)] pb-[16px]">
        <div className={styles.infoContainer}>
          <img src="/info-blue-ic.svg" alt="" />
          <p className={styles.infoText}>Укажите услуги, которые оказывает ваша компания</p>
        </div>
        <div className={styles.listContainer}>
          <h3 className="text-[16px] text-[var(--color-black-60)] h-[40px] flex items-center">
            Услуги
          </h3>
          <div className={styles.wrapper}>
            <Accordion
              showDivider={false}
              className={styles.accordionWrapper}
              selectionMode="multiple"
              itemClasses={itemClasses}
            >
              {services.map((e, ix) => (
                <AccordionItem
                  className={`${ix < 9 || isServicesShown ? 'flex' : 'hidden'}`}
                  indicator={<ArrowIC />}
                  title={e.name}
                  key={e.id}
                >
                  <div className={styles.subList}>
                    {e.types.map((o) => (
                      <ServiceCard
                        isChecked={o.isChecked}
                        name={o.name}
                        setCheacked={handleServiceCheckbox}
                        setPrice={handleServicePrice}
                        id={o.id}
                        key={o.id}
                        price={o.price}
                      />
                    ))}
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
            <button
              onClick={() => setIsServicesShown(!isServicesShown)}
              className="underline py-2 px-[15px] bg-[var(--color-gray)] rounded-[13px] w-full text-left"
            >
              {isServicesShown ? 'Скрыть часть услуги' : 'Показать все услуги'}
            </button>
          </div>
        </div>
      </div>
      <div className="border-b border-dashed border-[rgba(0,0,0,0.15)] pb-[30px]">
        <div className={styles.infoContainer}>
          <img src="/info-blue-ic.svg" alt="" />
          <p className={styles.infoText}>
            Укажите объекты, на которых оказывает услуги ваша компания
          </p>
        </div>
        <div className={styles.listContainer}>
          <h3 className="text-[16px] text-[var(--color-black-60)] h-[40px] flex items-center">
            Объекты
          </h3>
          <div className={styles.wrapper}>
            <Accordion
              showDivider={false}
              className={styles.accordionWrapper}
              selectionMode="multiple"
              itemClasses={itemClasses}
            >
              {objectsList.map((e, ix) => (
                <AccordionItem
                  className={`${ix < 9 || isObjectsShown ? 'flex' : 'hidden'}`}
                  indicator={<ArrowIC />}
                  title={e.name}
                  key={e.id}
                >
                  <div className={styles.subList}>
                    {e.types.map((o) => (
                      <ServiceCard
                        isChecked={o.isChecked}
                        name={o.name}
                        setCheacked={handleObjectsCheckbox}
                        id={o.id}
                        key={o.id}
                      />
                    ))}
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
            <button
              onClick={() => setIsObjectsShown(!isObjectsShown)}
              className="underline py-2 px-[15px] bg-[var(--color-gray)] rounded-[13px] w-full text-left"
            >
              {isObjectsShown ? 'Скрыть часть объектов' : 'Показать все объекты'}
            </button>
          </div>
        </div>
        <button
          disabled={isDataEqual}
          onClick={() => {
            (async () => {
              const newObjects: number[] = [];
              const newServices: { id: number; price: number }[] = [];
              objectsList.forEach((e) => {
                e.types
                  .filter((t) => t.isChecked)
                  .forEach((t) => {
                    newObjects.push(t.id);
                  });
              });
              services.forEach((e) => {
                e.types
                  .filter((t) => t.isChecked)
                  .forEach((t) => {
                    newServices.push({ id: t.id, price: t.price ?? 0 });
                  });
              });
              const params = {
                description: textareaValue ?? '',
                locations: locations.map((e) => e.id),
                services: newServices,
                objects: newObjects,
              };
              await updateToken(putContractorProfile, params);
              const res = await updateToken(fetchContractorProfile, null);
              setLocations(res.locations);
              setTextareaValue(res.description);
              initalData.current = res;
              const newServices2 = servicesStore.apiCleaningTypes.map((e) => {
                return {
                  name: e.name,
                  id: e.id,
                  types: e.types.map((t) => {
                    const price = res.services.find((i) => i.id === t.id);
                    return {
                      isChecked: price ? true : false,
                      name: t.name,
                      id: t.id,
                      price: price?.price,
                    };
                  }),
                };
              });
              const newObjects2 = objectsStore.apiObjects.map((e) => {
                return {
                  name: e.name,
                  id: e.id,
                  types: e.types.map((t) => {
                    const isChecked = res.objects.find((i) => i.id === t.id);
                    return { isChecked: isChecked ? true : false, name: t.name, id: t.id };
                  }),
                };
              });

              setServices(newServices2);
              setObjectsList(newObjects2);
              setDataChanged(!dataChanged);
            })();
          }}
          className={styles.save}
        >
          Сохранить изменения
        </button>
      </div>
      <span ref={location.state?.refTo === "portfolio" ? portfolioRef : undefined}></span>
      <Portfolio
        setPortfolio={addNewPortfolio}
        portfolio={portfolioList}
        setPortfolioList={setPortfolioList}
      />
    </div>
  );
};
