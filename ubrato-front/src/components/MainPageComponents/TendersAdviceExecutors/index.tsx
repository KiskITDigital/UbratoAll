import Modal from '@/components/Modal';
import OfferTender from '@/components/FindExecutorComponents/OfferTender/OfferTender';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExecutorItem from '@/components/FindExecutorComponents/ExecutorItem';
import itemStyles from './tender-advice-item.module.css'
import {
  addFavoriteExecutor,
  // fetchContractorProfile,
  removeFavoriteExecutor,
  // updateToken,
} from "@/api/index";
import { executorList } from '@/types/app';
import { generateTypesenseClient, getExecutorList } from '@/components/FindExecutorComponents/generateSearchclient';
import { useFindExecutorState } from '@/store/findExecutorStore';
import styles from './tenders-advice-executors.module.css'
// import { useUserInfoStore } from '@/store/userInfoStore';

const TendersAdviceExecutors: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  const navigate = useNavigate();

  const findExecutorState = useFindExecutorState();

  // const userInfoState = useUserInfoStore()

  const [executorList, setExecutorList] = useState<(executorList | true)[][]>([]);

  const [executorIdToOfferTender, setExecutorIdToOfferTender] = useState<
    null | string
  >(null);
  const [executorNameToOfferTender, setExecutorNameToOfferTender] = useState<
    null | string
  >(null);

  const favoriteExecutorsHandler = async (executor: executorList) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const res = executor.isFavorite
        ? removeFavoriteExecutor(executor.id, token)
        : addFavoriteExecutor(executor.id, token);
      const resStatus = (await res).data.status;
      findExecutorState.handleExecutorList(findExecutorState.executorList.map((executorItem) =>
        executorItem.id === executor.id
          ? {
            ...executorItem,
            isFavorite: resStatus
              ? !executorItem.isFavorite
              : executorItem.isFavorite,
          }
          : executorItem
      ));
    }
  }

  const updateExecutorList = async (newExecutorList: executorList[]) => {
    // console.log(newExecutorList);
    const city = JSON.parse(localStorage.getItem("сity") || "{}")

    newExecutorList = newExecutorList.map(executor => ({
      ...executor, text: executor.text ? executor.text.length > 63 ? executor.text.slice(0, 60) + "..." : executor.text : "", isTextHidden: false, regions: (
        executor.regions.length ?
          city ? [executor.regions.find(region => region.name === city) || executor.regions[0]] : [executor.regions[0]]
          : []
      )
    }))

    console.log(newExecutorList);

    // if (localStorage.getItem("token") && userInfoState.is_contractor) {
    //     const res = await updateToken(fetchContractorProfile, null);
    //     console.log(res.locations);
    // }
    // newExecutorList = newExecutorList.map(executor => {
    //     console.log(" ");

    //     console.log(executor.regions.length, city);
    //     console.log(executor.regions);
    //     console.log([executor.regions.find(region => region.name === city) || executor.regions[0] || []])
    //     return executor
    // })


    const changedNewExecutorList: (executorList | true)[][] = []
    for (let i = 0; i < newExecutorList.length; i += (isMobile ? 1 : 4)) {
      const chunk: (executorList | true)[] = newExecutorList.slice(i, i + (isMobile ? 1 : 4));
      if (chunk.length < 4) {
        for (let i = 0; i < 4 - chunk.length; i++) {
          chunk.push(true)
        }
      }
      changedNewExecutorList.push(chunk);
    }

    setExecutorList(changedNewExecutorList)
  }

  useEffect(() => {
    (async () => {
      const hits = await generateTypesenseClient("contractor_index", { per_page: 250 })
      const newExecutorList = await getExecutorList(hits)
      findExecutorState.handleExecutorList(newExecutorList)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateExecutorList(findExecutorState.executorList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findExecutorState.executorList]);

  return (
    <div className={styles.embla__container}>
      {!!executorIdToOfferTender && !!executorNameToOfferTender && (
        <Modal isOpen={!!executorIdToOfferTender}>
          <OfferTender
            closeModal={setExecutorIdToOfferTender}
            executorId={executorIdToOfferTender}
            executorName={executorNameToOfferTender}
          />
        </Modal>
      )}
      {
        executorList
          // .map(executorBlock => executorBlock.length < 4 ? executorBlock.map((executorList: executorList) => new Array(4).fill(true).map((_, ind: number) => executorList[ind] ? executorList : true)) : executorBlock)
          .map((executorBlock: (executorList | true)[], ind: number) => (
            <div key={ind} className={styles.embla__slide}>
              {
                executorBlock.map((executor: executorList | true, ind) => (
                  executor !== true ?
                    <ExecutorItem
                      key={executor.id}
                      executor={executor}
                      additionalStyles={itemStyles}
                      favoriteExecutorsHandler={favoriteExecutorsHandler}
                      setExecutorIdToOfferTender={setExecutorIdToOfferTender}
                      setExecutorNameToOfferTender={setExecutorNameToOfferTender}
                      servicesNumber={3}
                    /> :
                    <div key={ind}></div>
                ))
              }
            </div>
          ))
      }
    </div >
  );
}

export default TendersAdviceExecutors;