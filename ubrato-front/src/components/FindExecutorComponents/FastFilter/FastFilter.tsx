import { FC, Fragment, useEffect, useState } from "react";
import styles from './fast-filter.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import Typesense from 'typesense';

const FastFilterBlock: FC<{ title: string, values: string[], setValues: (newFastFilterTexts: string[]) => void }> = ({ title, values, setValues }) => {
  const [inputFilter, setInputFilter] = useState("");
  const [querySuggestions, setQuerySuggestions] = useState<any[]>([]);
  // const preDefinedValues: string[] = ['Уборка офиса', 'Уборка ТЦ', 'Уборка склада', 'Уборка территории', 'Зимняя уборка']

  const location = useLocation()
  const navigate = useNavigate()

  const [breadCrumbs, setBreadCrumbs] = useState<{ name: string, onClick?: () => void }[]>([{ name: 'главная', onClick: () => { navigate('/') } }]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    if (values.find((el) => el === inputFilter) || inputFilter.length === 0) {
      return
    }
    else {
      setValues([...values, inputFilter])
      setInputFilter('')
    }
  };

  const client = new Typesense.Client({
    apiKey: `${import.meta.env.VITE_TYPESENSE_API_KEY}`,
    nodes: [
      {
        host: `${import.meta.env.VITE_TYPESENSE_API_URI}`,
        port: import.meta.env.VITE_TYPESENSE_API_PORT,
        protocol: "https",
        path: "",
      },
    ],
  });

  useEffect(() => {
    if (location.pathname === '/find-executor') {
      client
        .collections("contractor_index")
        .documents()
        .search({
          q: inputFilter,
          query_by: "name",
        })
        .then(async (response) => {
          if (response.hits)
            setQuerySuggestions([...response.hits]);
        })
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    }
    if (location.pathname === '/alltenders') {
      client
        .collections("tender_index")
        .documents()
        .search({
          q: inputFilter,
          query_by: "name, description, wishes",
        })
        .then(async (response) => {
          if (response.hits)
            setQuerySuggestions([...response.hits]);
        })
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    }
  }, [inputFilter]);

  // const filterByPreDefinedValues = (filter: string) => {
  //     if (values.find((el) => el === filter)) {
  //         return
  //     }
  //     else {
  //         setValues([...values, filter])
  //     }
  // }

  useEffect(() => {
    setBreadCrumbs(prev => [prev[0], prev[1], ...values.map(filter => ({ name: filter }))])
    // console.log(values)
  }, [values.length, values]);

  useEffect(() => {
    if (location.pathname === '/find-executor') {
      setBreadCrumbs(prev => prev.map((crumb: {
        name: string,
        onClick?: () => void
      }, ind: number) => ind === 1 ? {
        name: 'найти исполнителя',
        onClick: () => { setValues([]) }
      } : crumb))
    }

    if (location.pathname === '/alltenders') {
      setBreadCrumbs(prev =>
        prev.map((crumb: {
          name: string,
          onClick?: () => void
        }, ind: number) => ind === 1 ? {
          name: 'найти тендер',
          onClick: () => { setValues([]) }
        } : crumb)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}><span>Поиск</span> {title}</h1>
      <div className="w-full relative">
        <label className={styles.inputFilterLabel}>
          <img className={styles.inputFilterLabelImg} src="/find-executor/loupe.svg" alt="loupe" />
          <input
            className={styles.inputFilter}
            type="text"
            value={inputFilter}
            onChange={(e) => setInputFilter(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => setInputFilter('')}
            placeholder={location.pathname === "/alltenders" ? "Например, название, описание, услуга" : "Например, наименование или ИНН компании"} />
        </label>
        {querySuggestions && inputFilter &&
          <div className="absolute flex flex-col w-full h-fit max-h-[400px] rounded-[10px] bg-white z-20 p-3 overflow-y-auto">
            {querySuggestions.map((item, itemIndex) =>
              <div
                key={"suggestion-" + itemIndex}
                className="border-b-2 last:border-none border-gray-200 py-3 cursor-pointer"
                onMouseDown={() => {
                  setValues([...values, item.document.name])
                }}
              >
                {item.document.name}
              </div>
            )}
          </div>
        }
      </div>

      {!!values.length && <div className={styles.filters}>
        <>
          {values.map((filter, ind) => <div key={ind} className={styles.filter}>
            <p className={styles.filterName}>{filter}</p>
            <img onClick={() => setValues(values.filter(el => el !== filter))} className={styles.removeFilter} src="/create-tender/create-tender-close.svg" alt="delete icon" />
          </div>)}
          <button onClick={() => setValues([])} className={styles.removeAllFilters}>Сброcить все</button>
        </>

      </div>}
      {breadCrumbs.length > 1 &&
        <div className={styles.breadCrumbs}>
          {breadCrumbs.map((crumb: { name: string, onClick?: () => void }, ind: number, breadCrumbsArr: { name: string, onClick?: () => void }[]) => (<Fragment key={ind}>
            <p className={`${styles.breadCrumb} ${crumb?.onClick ? '' : styles.breadCrumbInActive}`} onClick={() => crumb?.onClick && crumb.onClick()}>{crumb?.name}</p>
            {ind < breadCrumbsArr.length - 1 &&
              <img className={`${styles.breadCrumbImg} ${crumb.onClick ? '' : styles.breadCrumbImgInActive}`} src="/find-executor/arrow-right-black.svg" alt="->" />}
          </Fragment>))}
        </div>}
    </div>
  );
}

export default FastFilterBlock;