import Switcher from "@/components/Favorite/Switcher/Switcher";
import { FC, useEffect, useRef, useState } from "react";
import styles from './favorite-page.module.css'
import { getAllFavoriteExecutors, removeFavoriteExecutor } from "@/api";
import { generateTypesenseClient, getExecutorList } from "@/components/FindExecutorComponents/generateSearchclient";
import { executorList } from "@/types/app";
import ExecutorList from "@/components/FindExecutorComponents/ExecutorList/ExecutorList";
import OfferTender from "@/components/FindExecutorComponents/OfferTender/OfferTender";
import Modal from "@/components/Modal";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@nextui-org/react";
import { FavouriteTendersList } from "@/components/FavouriteTenders/FavouriteTendersList/FavouriteTendersList";
import { getAllFavoriteTenders } from "@/api/favouriteTenders";
import { useFindExecutorState } from "@/store/findExecutorStore";

const DEFAULT_PER_PAGE = 15

const FavoritePage: FC = () => {
  const findExecutorState = useFindExecutorState();

  const startRef = useRef<HTMLHeadingElement>(null)

  const navigate = useNavigate();

  const [switcher, setSwitcher] = useState<'Тендеры' | 'Исполнители'>('Тендеры');
  // const [executorList, setExecutorList] = useState<executorList[]>([]);


  const [executorIdToOfferTender, setExecutorIdToOfferTender] = useState<
    null | string
  >(null);
  const [executorNameToOfferTender, setExecutorNameToOfferTender] = useState<
    null | string
  >(null);

  const [paginationPage, setPaginationPage] = useState(1);
  const [paginationPerPage, setPaginationPerPage] = useState(DEFAULT_PER_PAGE);
  const [paginationTotal, setPaginationTotal] = useState(0);

  const favoriteExecutorsHandler = async (executor: executorList) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const res = executor.isFavorite && await removeFavoriteExecutor(executor.id, token) || { data: { status: false } }
      const resStatus = res.data.status;
      if (resStatus) updateFavoriteExecutors()
    }
  }

  const updateFavoriteExecutors = async () => {
    const token = localStorage.getItem('token')
    if (!token) return;
    const favoriteExecutors = (await getAllFavoriteExecutors(token)).data
    const filters = `id:=[${favoriteExecutors.map((executor: { id: string }) => executor.id)}]`
    const hits = await generateTypesenseClient("contractor_index", { filter_by: filters, page: paginationPage, per_page: paginationPerPage })
    const totalHits = await generateTypesenseClient("contractor_index", { filter_by: filters })
    const newExecutorList = await getExecutorList(hits)
    setPaginationTotal(totalHits?.length || 0)
    findExecutorState.handleExecutorList(newExecutorList)
    // setTenderList(new)
  }

  const updateFavoriteTenders = async () => {
    const token = localStorage.getItem('token')
    if (!token) return;
    const favoriteTenders = (await getAllFavoriteTenders(token)).data
    const filters = `id:=[${favoriteTenders.map((executor: { id: string }) => executor.id)}]`
    const hits = await generateTypesenseClient("contractor_index", { filter_by: filters, page: paginationPage, per_page: paginationPerPage })
    const totalHits = await generateTypesenseClient("contractor_index", { filter_by: filters })
    const newExecutorList = await getExecutorList(hits)
    setPaginationTotal(totalHits?.length || 0)
    findExecutorState.handleExecutorList(newExecutorList)
  }

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 200, behavior: "smooth" });
    }, 0);

    updateFavoriteExecutors()
    updateFavoriteTenders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationPage, paginationPerPage]);

  const paginationClassNames = {
    base: styles.paginationBase,
    wrapper: styles.wrapper,
    cursor: styles.cursor,
    prev: styles.prev,
    item: styles.item,
    next: styles.next,
  };

  return (
    <section ref={startRef} className={styles.container}>
      {!!executorIdToOfferTender && !!executorNameToOfferTender && (
        <Modal isOpen={!!executorIdToOfferTender}>
          <OfferTender
            closeModal={setExecutorIdToOfferTender}
            executorId={executorIdToOfferTender}
            executorName={executorNameToOfferTender}
          />
        </Modal>
      )}
      <p className={styles.title}>Избранное</p>
      <Switcher state={switcher} setState={setSwitcher} />
      {
        switcher === 'Тендеры' ?
          <>
            <FavouriteTendersList myTender={false} />
          </>
          :
          findExecutorState.executorList.length ?
            <>
              <ExecutorList
                executorList={findExecutorState.executorList}
                setExecutorList={findExecutorState.handleExecutorList}
                setExecutorIdToOfferTender={setExecutorIdToOfferTender}
                setExecutorNameToOfferTender={setExecutorNameToOfferTender}
                favoriteExecutorsHandler={favoriteExecutorsHandler}
              />
              {!!paginationTotal && (
                <div className={styles.paginationBlock}>
                  {(paginationPerPage < 250 && paginationPerPage < paginationTotal) &&
                    <Pagination
                      classNames={paginationClassNames}
                      total={Math.ceil(paginationTotal / paginationPerPage)}
                      showControls
                      initialPage={1}
                      page={paginationPage}
                      onChange={setPaginationPage}
                    />
                  }
                  {paginationTotal > 2 && <button onClick={() => { paginationPerPage < 250 ? setPaginationPerPage(250) : setPaginationPerPage(2); setPaginationPage(1) }} className={styles.paginationPerPageButton}>{paginationPerPage < 250 ? 'Показать все' : 'Показать меньше'}</button>}
                </div>
              )}
            </>
            :
            <p className={styles.empty}>У вас пока нет избранных исполнителей</p>
      }
    </section>
  );
}

export default FavoritePage;