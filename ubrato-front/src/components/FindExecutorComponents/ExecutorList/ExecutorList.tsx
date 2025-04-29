import { Dispatch, FC } from "react";
import styles from './executor-list.module.css'
import { executorList } from "@/types/app";
import { useFindExecutorState } from "@/store/findExecutorStore";
import ExecutorItem from "../ExecutorItem";

const ExecutorList: FC<{
  executorList: executorList[],
  setExecutorList: (newExecutorList: executorList[]) => void,
  setExecutorNameToOfferTender: Dispatch<React.SetStateAction<string | null>>,
  setExecutorIdToOfferTender: Dispatch<React.SetStateAction<string | null>>,
  favoriteExecutorsHandler: (executor: executorList) => void
}> = ({ executorList, setExecutorList, setExecutorIdToOfferTender, setExecutorNameToOfferTender, favoriteExecutorsHandler }) => {
  const findExecutorState = useFindExecutorState();


  const showAllExecutorServices = (id: string) => {
    setExecutorList(findExecutorState.executorList.map((executor) =>
      executor.id === id
        ? { ...executor, areServicesHidden: false }
        : executor
    )
    );
  };

  const showAllExecutorText = (id: string) => {
    setExecutorList(findExecutorState.executorList.map((executor) =>
      executor.id === id
        ? { ...executor, isTextHidden: false }
        : executor
    ));
  }

  return (
    <div className={styles.executors}>
      {executorList.map((executor: executorList) => (
        <ExecutorItem
          key={executor.id}
          executor={executor}
          setExecutorIdToOfferTender={setExecutorIdToOfferTender}
          setExecutorNameToOfferTender={setExecutorNameToOfferTender}
          showAllExecutorServices={showAllExecutorServices}
          showAllExecutorText={showAllExecutorText}
          favoriteExecutorsHandler={favoriteExecutorsHandler}
        />
      ))}
    </div>
  );
}

export default ExecutorList;