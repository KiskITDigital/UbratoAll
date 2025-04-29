import { FC } from "react"
import s from './styles.module.css'

export const  TenderListHedaerComp: FC = () => {
    return(
        <div className={s.list_header_container}>
            <h1 className={s.list_header}><span className={s.span_nigger}>Поиск</span> тендера</h1>
        </div>
    );
};