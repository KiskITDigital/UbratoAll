import s from './styles.module.css'
import { FC, useEffect, useState } from "react";
import { useFindExecutorState } from "@/store/findExecutorStore";

export const TenderListCustomSearch: FC = () => {
    const findExecutorState = useFindExecutorState()
    const [inputFilter, setInputFilter] = useState('');
    const [filters, setFilters] = useState<string[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        setFilters([...filters, inputFilter])
        setInputFilter('')
    };

    useEffect(() => {
        findExecutorState.handleFastFilterTexts(filters)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.length]);
 
    return (
        <div className={`${s.container}`}>
            <label className={s.inputFilterLabel}>
                <img className={s.inputFilterLabelImg} src="/find-executor/loupe.svg" alt="loupe" />
                <input
                    className={s.inputFilter}
                    type="text"
                    value={inputFilter}
                    onChange={(e) => setInputFilter(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setInputFilter('')}
                    placeholder="Например, услуга, объект, населенный пункт" />
            </label>
            {!!filters.length && <div className={s.filters}>
                {
                    <>
                        {filters.map((filter, ind) => <div key={ind} className={s.filter}>
                            <p className={s.filterName}>{filter}</p>
                            <img onClick={() => setFilters(prev => prev.filter(el => el !== filter))} className={s.removeFilter} src="/create-tender/create-tender-close.svg" alt="delete icon" />
                        </div>)}
                        <button onClick={() => setFilters([])} className={s.removeAllFilters}>Сброcить все</button>
                    </>
                }
            </div>}
        </div>
    );
}

