/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, forwardRef, useState } from "react";
import styles from '../../CreateTender.module.css'
import { useCreateTenderState } from "@/store/createTenderStore";


const City: FC<{ ref?: React.LegacyRef<HTMLDivElement>; }> = forwardRef<HTMLDivElement, { ref?: React.LegacyRef<HTMLDivElement>; }>((_, ref) => {
    const createTenderState = useCreateTenderState()
    const [isCitiesAutoComplete, setIsCitiesAutoComplete] = useState(false);

    return (
        <div ref={ref} className={`${styles.section}`}>
            <div className={`${styles.section__block} ${styles.city}`}>
                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Город и регион:</p>
                <div className={`${styles.services__block} ${styles.services__cities}`}>
                    {
                        (isCitiesAutoComplete || !createTenderState.city) ? <>
                            <input
                                // onClick={(e) => e.stopPropagation()}
                                onFocus={() => { createTenderState.removeError('city'); setIsCitiesAutoComplete(true) }}
                                onBlur={() => {
                                    setIsCitiesAutoComplete(false);
                                    if (!createTenderState.city) return;
                                    if (!createTenderState.cities.some(el => el.name === createTenderState.city)) {
                                        if (createTenderState.cities.length) {
                                            createTenderState.handleSimpleInput('city', createTenderState.cities[0].name)
                                        } else {
                                            createTenderState.addError('city');
                                            createTenderState.handleSimpleInput('city', '')
                                        }
                                    }
                                }}
                                value={createTenderState.city}
                                onChange={(e) => { createTenderState.handleSimpleInput('city', e.currentTarget.value); createTenderState.getCities(e.currentTarget.value) }}
                                type="text"
                                className={`${styles.input} ${styles.cities__input} ${createTenderState.errors.includes('city') ? styles.inputError : ''}`} />
                            {createTenderState.errors.includes('city') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextFloorSspace} ${styles.inputErrorTextCity}`}>Обязательно для заполнения</p>}
                            {
                                isCitiesAutoComplete && !!createTenderState.city.length && !!createTenderState.cities.length && <div className={styles.cities__autocomplete}>
                                    {
                                        createTenderState.cities.map((city) =>
                                            <p className={styles.cities__autocomplete__item}
                                                key={city.id}
                                                onMouseDown={(e) => {
                                                    e.stopPropagation();
                                                    createTenderState.handleSimpleInput('city', city.name)
                                                }}
                                            >
                                                {city.name}
                                                <span>{city.region}</span>
                                                <img src="/create-tender/create-tender-cities-autocomplete-checkmark.svg" alt="" />
                                            </p>)
                                    }
                                </div>
                            }
                        </>
                            : <p className={`${styles.services__block__service__type} ${styles.section__block__add__object__objectCategory} ${styles.city__autocomplete__chosen}`}>
                                {createTenderState.city}
                                <span className={`${styles.section__block__add__object__objectCategory__span}`}></span>
                                <img onClick={() => createTenderState.handleSimpleInput('city', '')} className={`${styles.section__block__add__object__objectCategory__img}`} src="/create-tender/create-tender-close-white.svg" alt="" />
                            </p>
                    }
                </div>
            </div>
        </div>
    );
})

export default City;