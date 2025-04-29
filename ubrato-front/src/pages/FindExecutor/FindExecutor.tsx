import FastFilter from "@/components/FindExecutorComponents/FastFilter/FastFilter";
import styles from './FindExecutor.module.css'
import { FC } from "react";
import MainFilter from "@/components/FindExecutorComponents/MainFilter/MainFilter";
import Executors from "@/components/FindExecutorComponents/Executors/Executors";
import { QuestionsBlock, Seo } from "@/components";
import { useFindExecutorState } from "@/store/findExecutorStore";

// import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "@/store/userInfoStore";

const FindExecutor: FC = () => {
    const findExecutorState = useFindExecutorState()
    // const userInfoStore = useUserInfoStore();
    useUserInfoStore
    // const navigate = useNavigate()

    // useEffect(() => {
    //     if (!userInfoStore.isLoggedIn) {
    //         navigate('/register');
    //       }
    // }, [navigate]);
    return (
        <section>
            <FastFilter title="исполнителя" values={findExecutorState.fastFilterTexts} setValues={findExecutorState.handleFastFilterTexts} />
            <div className={`container ${styles.mainBlock}`}>
                <MainFilter />
                <Executors />
            </div>
            <QuestionsBlock />
            <Seo />
        </section>
    );
}

export default FindExecutor;