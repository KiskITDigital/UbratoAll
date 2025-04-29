import { FC, useEffect, useRef, useState } from 'react';
import styles from './executors.module.css';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Pagination,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { executorList } from '@/types/app';
import { useFindExecutorState } from '@/store/findExecutorStore';
import OfferTender from '../OfferTender/OfferTender';
import Modal from '@/components/Modal';
import { generateTypesenseClient, getExecutorList } from '../generateSearchclient';
import ExecutorList from '../ExecutorList/ExecutorList';
import { addFavoriteExecutor, removeFavoriteExecutor } from '@/api/index';
import { useNavigate } from 'react-router-dom';
import Typesense from 'typesense';

const Executors: FC = () => {
  const findExecutorState = useFindExecutorState();
  // const [executorList, setExecutorList] = useState<executorList[]>([]);
  const [allExecutorListLength, setAllExecutorListLength] = useState(0);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [paginationPage, setPaginationPage] = useState(1);
  const [defaultPerPage, setDefaultPerPage] = useState<number>(20);
  const [paginationPerPage, setPaginationPerPage] = useState(defaultPerPage);
  const [sortingValue, setSortingValue] = useState<'' | 'name:asc' | 'name:desc'>('');
  const [executorIdToOfferTender, setExecutorIdToOfferTender] = useState<null | string>(null);
  const [executorNameToOfferTender, setExecutorNameToOfferTender] = useState<null | string>(null);

  const startRef = useRef<HTMLHeadingElement>(null);

  const navigate = useNavigate();

  const dropDownClassNames = {
    trigger: styles.trigger,
    base: styles.base,
    list: styles.list,
  };

  const paginationClassNames = {
    base: styles.paginationBase,
    wrapper: styles.wrapper,
    cursor: styles.cursor,
    prev: styles.prev,
    item: styles.item,
    next: styles.next,
  };

  const generateTypesenseFilters = () => {
    const filters = [];
    if (findExecutorState.locationId)
      filters.push(`$contractor_city(city_id:=${findExecutorState.locationId})`);
    if (findExecutorState.objectTypesId.length)
      findExecutorState.objectTypesId.forEach((object) =>
        filters.push(`$contractor_object(object_type_id:=${object})`)
      );
    if (findExecutorState.servicesTypesId.length)
      findExecutorState.servicesTypesId.forEach((service) =>
        filters.push(`$contractor_service(service_type_id:=${service})`)
      );
    if (findExecutorState.fastFilterTexts)
      findExecutorState.fastFilterTexts.forEach((filter) =>
        filters.push(
          `(inn:=*${filter}* || name:=*${filter}* || name:=*${filter.toLocaleLowerCase()}* || name:=*${filter.toLocaleUpperCase()}*)`
        )
      );
    return filters.join(' && ');
  };

  const client = new Typesense.Client({
    apiKey: `${import.meta.env.VITE_TYPESENSE_API_KEY}`,
    nodes: [
      {
        host: `${import.meta.env.VITE_TYPESENSE_API_URI}`,
        port: import.meta.env.VITE_TYPESENSE_API_PORT,
        protocol: 'https',
        path: '',
      },
    ],
  });

  const [objectSearchValues, setObjectSearchValues] = useState<
    {
      name: string;
      id: number;
    }[]
  >([]);
  const [serviceSearchValues, setServiceSearchValues] = useState<
    {
      name: string;
      id: number;
    }[]
  >([]);
  const [locationSearchValue, setLocationSearchValue] = useState<string>();

  useEffect(() => {
    const locationSearchParameters = {
      q: '*',
      query_by: 'name',
      filter_by: findExecutorState.locationId ? `id:${findExecutorState.locationId}` : '',
    };

    if (findExecutorState.locationId)
      client
        .collections('city_index')
        .documents()
        .search(locationSearchParameters)
        .then((response) => {
          if (response.hits?.length)
            // @ts-expect-error
            setLocationSearchValue(response.hits[0].document?.name);
        })
        .catch((error) => {
          console.error('Ошибка:', error);
        });
  }, [findExecutorState.locationId]);

  useEffect(
    () => {
      // setObjectSearchValues([])
      // setServiceSearchValues([])
      // setLocationSearchValue("")
      const objectSearchParameters = {
        q: '*',
        query_by: 'name',
        per_page: 250,
        // filter_by: findExecutorState.objectTypesId.length ? `id:${findExecutorState.objectTypesId}` : ""
      };

      const serviceSearchParameters = {
        q: '*',
        query_by: 'name',
        per_page: 250,
        // filter_by: findExecutorState.servicesTypesId.length ? `id:${findExecutorState.servicesTypesId}` : ""
      };

      // const locationSearchParameters = {
      //   q: "*",
      //   query_by: "name",
      //   filter_by: findExecutorState.locationId ? `id:${findExecutorState.locationId}` : ""
      // };

      client
        .collections('object_type_index')
        .documents()
        .search(objectSearchParameters)
        .then((response) => {
          if (response.hits?.length)
            setObjectSearchValues([
              ...response.hits.map((hit: any) => {
                return {
                  name: hit.document?.name,
                  id: hit.document?.id,
                };
              }),
            ]);
        })
        .catch((error) => {
          console.error('Ошибка:', error);
        });

      client
        .collections('service_type_index')
        .documents()
        .search(serviceSearchParameters)
        .then((response) => {
          if (response.hits?.length)
            setServiceSearchValues([
              ...response.hits.map((hit: any) => {
                return {
                  name: hit.document?.name,
                  id: hit.document?.id,
                };
              }),
            ]);
        })
        .catch((error) => {
          console.error('Ошибка:', error);
        });
    },
    [
      // findExecutorState.locationId,
      // findExecutorState.objectTypesId,
      // findExecutorState.servicesTypesId,
    ]
  );

  const favoriteExecutorsHandler = async (executor: executorList) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const res = executor.isFavorite
        ? removeFavoriteExecutor(executor.id, token)
        : addFavoriteExecutor(executor.id, token);
      const resStatus = (await res).data.status;
      findExecutorState.handleExecutorList(
        findExecutorState.executorList.map((executorItem) =>
          executorItem.id === executor.id
            ? {
                ...executorItem,
                isFavorite: resStatus ? !executorItem.isFavorite : executorItem.isFavorite,
              }
            : executorItem
        )
      );
    }
  };

  useEffect(() => {
    const filters = generateTypesenseFilters();

    (async () => {
      const hitsWithoutPagination = await generateTypesenseClient('contractor_index', {
        filter_by: filters,
        per_page: 250,
      });

      setAllExecutorListLength(hitsWithoutPagination?.length || 0);
      setPaginationTotal(
        hitsWithoutPagination?.length
          ? Math.ceil(hitsWithoutPagination.length / paginationPerPage)
          : 0
      );
      // console.log(allExecutorListLength);
      const hits = await generateTypesenseClient('contractor_index', {
        per_page: paginationPerPage,
        page: paginationPage,
        filter_by: filters,
        sort_by: sortingValue,
      });
      if (hits?.length === 0 && paginationPage > 1) {
        setPaginationPage(1);
        return;
      }

      const newExecutorList = await getExecutorList(hits);
      findExecutorState.handleExecutorList(newExecutorList);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    paginationPage,
    paginationPerPage,
    sortingValue,
    findExecutorState.locationId,
    findExecutorState.objectTypesId.length,
    findExecutorState.servicesTypesId.length,
    findExecutorState.fastFilterTexts,
  ]);

  useEffect(() => {
    setPaginationPerPage(defaultPerPage);
  }, [defaultPerPage]);

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 300, behavior: 'smooth' });
    }, 0);
  }, [
    findExecutorState.objectTypesId,
    paginationPage,
    sortingValue,
    findExecutorState.locationId,
    findExecutorState.servicesTypesId,
    findExecutorState.servicesTypesId.length,
    findExecutorState.fastFilterTexts,
    findExecutorState.fastFilterTexts.length,
  ]);

  return (
    <div ref={startRef} className={`container ${styles.container}`}>
      {!!executorIdToOfferTender && !!executorNameToOfferTender && (
        <Modal isOpen={!!executorIdToOfferTender}>
          <OfferTender
            closeModal={setExecutorIdToOfferTender}
            executorId={executorIdToOfferTender}
            executorName={executorNameToOfferTender}
          />
        </Modal>
      )}
      <div className="flex flex-wrap gap-3">
        {findExecutorState.objectTypesId.length > 0 &&
          objectSearchValues
            .filter((object) => {
              return findExecutorState.objectTypesId.includes(Number(object.id));
            })
            .map((value) => (
              <div
                className="flex gap-1 items-center cursor-pointer"
                onClick={() => {
                  const arrayCopy = findExecutorState.objectTypesId;
                  arrayCopy.splice(
                    arrayCopy.findIndex((object) => object === Number(value.id)),
                    1
                  );
                  findExecutorState.handleObjectTypesId(arrayCopy);
                }}
              >
                {value.name}
                <img src="/x-icon.svg" className="size-5" />
              </div>
            ))}
        {findExecutorState.servicesTypesId.length > 0 &&
          serviceSearchValues
            .filter((service) => {
              return findExecutorState.servicesTypesId.includes(Number(service.id));
            })
            .map((value) => (
              <div
                className="flex gap-1 items-center cursor-pointer"
                onClick={() => {
                  const arrayCopy = findExecutorState.servicesTypesId;
                  arrayCopy.splice(
                    arrayCopy.findIndex((object) => object === Number(value.id)),
                    1
                  );
                  findExecutorState.handleServicesTypesId(arrayCopy);
                }}
              >
                {value.name}
                <img src="/x-icon.svg" className="size-5" />
              </div>
            ))}
        {findExecutorState.locationId && (
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => findExecutorState.handleLocation(null)}
          >
            {locationSearchValue}
            <img src="/x-icon.svg" className="size-5" />
          </div>
        )}
      </div>
      <div className={styles.amount}>
        <div className="flex justify-between w-full">
          <p className="text-[24px]">Исполнители: {allExecutorListLength}</p>
          <div className="w-fit flex items-center gap-2">
            <p className="whitespace-nowrap">Показывать на странице</p>
            <Select
              aria-label="Показывать на странице"
              defaultSelectedKeys={[20]}
              onChange={(e) => {
                console.log(Number(e.target.value));
                setDefaultPerPage(Number(e.target.value));
              }}
              onOpenChange={(e) => {
                console.log(e);
              }}
              classNames={{
                mainWrapper:
                  'flex bg-red p-[5px] w-[70px] pt-[5px] border-solid border-accent border-[2px] rounded-[6px]',
                trigger: 'flex justify-between p-0',
                selectorIcon: 'z-10 relative data-[open]:rotate-180 duration-300 transition-all',
                popoverContent:
                  'p-[5px] pt-[10px] ml-[-7px] mt-[-5px] w-[70px] border-solid border-accent border-[2px] border-t-0 rounded-b-[6px] bg-white',
              }}
            >
              <SelectItem key={20}>20</SelectItem>
              <SelectItem key={50}>50</SelectItem>
              <SelectItem key={100}>100</SelectItem>
            </Select>
          </div>
          <Dropdown classNames={dropDownClassNames}>
            <DropdownTrigger>
              <Button disableRipple variant="bordered">
                Рекомендуем <img src="/find-executor/drop-down.svg" alt="" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem onClick={() => setSortingValue('name:asc')}>
                По наименованию
              </DropdownItem>
              <DropdownItem onClick={() => setSortingValue('name:desc')}>
                По популярности
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <ExecutorList
        executorList={findExecutorState.executorList}
        setExecutorList={findExecutorState.handleExecutorList}
        setExecutorIdToOfferTender={setExecutorIdToOfferTender}
        setExecutorNameToOfferTender={setExecutorNameToOfferTender}
        favoriteExecutorsHandler={favoriteExecutorsHandler}
      />
      {allExecutorListLength > findExecutorState.executorList.length ? (
        <>
          {paginationPerPage < allExecutorListLength && (
            <button
              onClick={() => {
                setPaginationPage(1);
                setPaginationPerPage((prev) => prev + defaultPerPage);
              }}
              className={styles.showMore}
            >
              Показать ещё
              <img src="/find-executor/arrow-down.svg" alt="" />
            </button>
          )}

          {!!paginationTotal && (
            <Pagination
              classNames={paginationClassNames}
              total={paginationTotal}
              showControls
              initialPage={1}
              page={paginationPage}
              onChange={setPaginationPage}
            />
          )}
        </>
      ) : (
        <button
          onClick={() => setPaginationPerPage((prev) => prev - 2)}
          className={styles.showMore}
        >
          Показать меньше
          <img className="rotate-180" src="/find-executor/arrow-down.svg" alt="" />
        </button>
      )}
    </div>
  );
};

export default Executors;
