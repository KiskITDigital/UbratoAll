import { FC, ReactNode, useEffect, useState } from 'react';
import styles from './main-filter.module.css'
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import { generateSearchClient, generateTypesenseClient } from '../generateSearchclient';
import { useFindExecutorState } from '@/store/findExecutorStore';
import { getCities } from '@/api';

const MainFilter: FC = () => {
  const findExecutorState = useFindExecutorState()
  const [isSearchClient, setIsSearchClient] = useState(false);

  const [areAllObjects, setAreAllObjects] = useState(false);
  const [areAllServices, setAreAllServices] = useState(false);

  const [chosenLocation, setChosenLocation] = useState<{ id: string, name: string, region_id: string } | null>(null);

  const [objectId, setObjectId] = useState<null | number>(null);
  const [objectTypesId, setObjectTypesId] = useState<number[]>([]);

  const [servicesId, setServicesId] = useState<number[]>([]);
  const [servicesTypesId, setServicesTypesId] = useState<number[]>([]);

  // const [searchCityParam, setSearchCityParam] = useState('');

  const reset = () => {
    setChosenLocation(null)
    setObjectId(null)
    setObjectTypesId([])
    setServicesId([])
    setServicesTypesId([])

    setAreAllObjects(false)
    setAreAllServices(false)

    findExecutorState.handleLocation(null)
    findExecutorState.handleObjectTypesId([])
    findExecutorState.handleServicesTypesId([])
  }

  const filter = () => {
    findExecutorState.handleLocation(chosenLocation ? +chosenLocation.id : null)
    findExecutorState.handleObjectTypesId(objectTypesId)
    findExecutorState.handleServicesTypesId(servicesTypesId)
  }

  const objectImages: {
    [key: string]: string;
  } = {
    'HoReCa': 'horeca',
    'Транспортная инфраструктура': 'road',
    'Транспорт': 'transport',
    'Торговая недвижимость': 'trading',
    'Территория': 'territory',
    'Спортивно-оздоровительные объекты': 'stadium',
    'Складская недвижимость': 'stock',
    'Производственная недвижимость': 'factory',
    'Природные объекты': 'nature',
    'Офисная недвижимость': 'office',
    'Объекты образования': 'school',
    'Объекты культурного наследия': 'museum',
    'Объект здравоохранения': 'pharmacy',
    'Жилая недвижимость': 'living-building',
  }

  const [cityList, setCityList] = useState<{ id: string, name: string, region_id: string }[]>([]);

  const getLocalCities = async (query: string) => {
    let cities: { id: string, name: string, region_id: string }[] = []
    if (query.trim()) {
      cities = (await getCities(query)).data.slice(0, 5) as { id: string, name: string, region_id: string }[]
    } else {
      const documents = await generateTypesenseClient('city_index', { filter_by: 'name:="Москва" || name:="Санкт-Петербург" || name:="Казань" || name:="Нижний Новгород" || name:="Екатеринбург"' })
      const newCities = documents ? documents.map(document => document.document) as { id: string, name: string, region_id: string }[] : []
      newCities.forEach((city) => {
        if (!("name" in city)) return;
        if (city.name === "Москва") cities[0] = city
        else if (city.name === "Санкт-Петербург") cities[1] = city
        else if (city.name === "Нижний Новгород") cities[2] = city
        else if (city.name === "Казань") cities[3] = city
        else if (city.name === "Екатеринбург") cities[4] = city
      })
    }
    setCityList(cities)
  }

  // const getObjects = async () => {
  //     const objects = (await generateTypesenseClient("object_group_index", { per_page: 250 }))?.map(hit => hit.document)
  //     console.log(objects)
  //     return objects
  // }

  useEffect(() => {
    setObjectTypesId(findExecutorState.objectTypesId)
    setServicesTypesId(findExecutorState.servicesTypesId)
    if (!findExecutorState.locationId)
      setChosenLocation(null)
  }, [
    findExecutorState.locationId,
    findExecutorState.objectTypesId,
    findExecutorState.servicesTypesId,
  ]);

  useEffect(() => {
    setIsSearchClient(true)
    getLocalCities("")
    // getObjects()
  }, []);

  return (
    <div className={`container ${styles.container}`}>
      <p className={styles.mainTitle}>Фильтры</p>
      <div className={styles.block}>
        <p className={styles.title}>Локации:</p>
        {
          chosenLocation ?
            <div className={styles.chosenLocations}>
              <p
                className={styles.chosenLocation}
              >
                {chosenLocation.name}
                <img onClick={() => { setChosenLocation(null); }} className={styles.removeChosenLocation} src="/create-tender/create-tender-close.svg" alt="delete icon" />
              </p>
            </div>
            :
            <>
              <label className={styles.inputFilterLabel}>
                <img className={styles.inputFilterLabelImg} src="/find-executor/loupe.svg" alt="loupe" />
                <input
                  className={styles.inputFilter}
                  type="text"
                  onChange={(e) => getLocalCities(e.currentTarget.value)}
                  placeholder="Поиск" />
              </label>
              {
                cityList.map(city => <div className={styles.hitList} key={city.id} onClick={() => setChosenLocation(city)}>
                  <p className={styles.location}>{city.name}</p>
                </div>)
              }
            </>
        }
      </div>
      {
        isSearchClient &&
        <div className={styles.block}>
          <InstantSearch indexName='object_group_index' searchClient={generateSearchClient(areAllObjects ? 250 : 5)}>
            <p className={styles.title}>Объекты:</p>
            <label className={styles.inputFilterLabel}>
              <img className={styles.inputFilterLabelImg} src="/find-executor/loupe.svg" alt="loupe" />
              <SearchBox
                className={styles.inputFilter}
                placeholder="Поиск" />
            </label>
            <Hits
              classNames={{
                list: styles.hitList,
              }}
              hitComponent={({ hit }: { hit: { id: number, name: string } }) => (
                <>
                  <p
                    className={styles.objectItem}
                    onClick={() => { setObjectId(hit.id === objectId ? null : hit.id as number); setObjectTypesId([]) }}>
                    <img className={styles.objectItemImage} src={`/find-executor/${objectImages[hit.name]}.svg`} alt='object image' />
                    {hit.name as ReactNode}
                  </p>
                  {
                    hit.id == objectId &&
                    <InstantSearch indexName='object_type_index' searchClient={generateSearchClient(250)}>
                      <Hits
                        classNames={{
                          list: styles.objectTypeList,
                        }} hitComponent={(props: { hit: { id: number, group_id: number, name: string } }) => {
                          const { hit: hitType } = props
                          return (
                            hitType.group_id === hit.id &&
                            <p
                              className={styles.objectTypeItem}
                              onClick={() => setObjectTypesId(prev => prev.includes(+hitType.id) ? [...prev.filter(el => el !== +hitType.id)] : [...prev, +hitType.id])}
                            // onClick={(e) => { console.log(objectTypesId, hitType.id, e); setObjectTypesId([+hitType.id]) }}
                            >
                              {
                                objectTypesId.includes(+hitType.id) ?
                                  <img src="/find-executor/checkmark.svg" alt="check-mark" />
                                  :
                                  <span></span>
                              }
                              {hitType.name as ReactNode}
                            </p>
                          )
                        }} />
                    </InstantSearch>
                  }
                </>

              )} />
            <button
              className={`${styles.showMore} ${areAllObjects ? styles.showLess : ''}`}
              onClick={() => setAreAllObjects(prev => !prev)}
            >
              <img src="/find-executor/arrow-down.svg" alt="" />
              Показать {areAllObjects ? 'меньше' : 'все'}
            </button>
          </InstantSearch>
        </div>
      }
      {
        isSearchClient &&
        <div className={styles.block}>
          <InstantSearch indexName='service_group_index' searchClient={generateSearchClient(areAllServices ? 250 : 5)}>
            <p className={styles.title}>Услуги:</p>
            <label className={styles.inputFilterLabel}>
              <img className={styles.inputFilterLabelImg} src="/find-executor/loupe.svg" alt="loupe" />
              <SearchBox
                className={styles.inputFilter}
                placeholder="Поиск" />
            </label>
            <Hits
              classNames={{
                list: styles.hitList,
              }}
              hitComponent={({ hit }: { hit: { id: number, name: string } }) => (
                <>
                  <p
                    className={styles.objectItem}
                    onClick={() => { setServicesId(prev => prev.includes(+hit.id) ? [...prev.filter(el => el !== +hit.id)] : [...prev, +hit.id]) }}>
                    <img className={styles.objectItemImage} src='/find-executor/service.svg' alt='service image' />
                    {hit.name as ReactNode}
                  </p>
                  {
                    servicesId.includes(+hit.id) &&
                    <InstantSearch indexName='service_type_index' searchClient={generateSearchClient(250)}>
                      <Hits
                        classNames={{
                          list: styles.objectTypeList,
                        }} hitComponent={(props: { hit: { id: number, group_id: number, name: string } }) => {
                          const { hit: hitType } = props
                          return (
                            hitType.group_id === hit.id &&
                            <p
                              className={styles.objectTypeItem}
                              onClick={() => setServicesTypesId(prev => prev.includes(+hitType.id) ? [...prev.filter(el => el !== +hitType.id)] : [...prev, +hitType.id])}
                            >
                              {
                                servicesTypesId.includes(+hitType.id) ?
                                  <img src="/find-executor/checkmark.svg" alt="check-mark" />
                                  :
                                  <span></span>
                              }
                              {hitType.name as ReactNode}
                            </p>
                          )
                        }} />
                    </InstantSearch>
                  }
                </>

              )} />
            <button
              className={`${styles.showMore} ${areAllServices ? styles.showLess : ''}`}
              onClick={() => setAreAllServices(prev => !prev)}
            >
              <img src="/find-executor/arrow-down.svg" alt="" />
              Показать {areAllServices ? 'меньше' : 'все'}
            </button>
          </InstantSearch>
        </div>
      }
      <div className={styles.block}>
        <button
          className={styles.makeFilters}
          onClick={filter}
        >
          Применить фильтры
        </button>
        <button
          onClick={reset}
          className={styles.resetFilters}
        >
          Сбросить
        </button>
      </div>
    </div>
  );
}

export default MainFilter;