import { FC, Fragment, forwardRef, useEffect, useState } from "react";
import styles from '../../CreateTender.module.css'
import { useCreateTenderState } from "@/store/createTenderStore";
import { useCleaningTypeStore } from "@/store/cleaningTypeStore";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

const Services: FC<{ windowWidth: number, ref?: React.LegacyRef<HTMLDivElement>; }> = forwardRef<HTMLDivElement, Omit<{ windowWidth: number, ref?: React.LegacyRef<HTMLDivElement>; }, 'ref'>>((props, ref) => {
    const { windowWidth } = props
    const createTenderState = useCreateTenderState()
    const cleaningTypeStore = useCleaningTypeStore()

    const [isChoosingServiceToAdd, setIsChoosingServiceToAdd] = useState(false);
    const [chooseTypesNameToObjectToAddService, setChooseTypesNameToObjectToAddService] = useState<null | string>(null);
    const [chooseTypesTypesToObjectToAddService, setChooseTypesTypesToObjectToAddService] = useState<string[]>([]);

    const [isChoosingServiceToChange, setIsChoosingServiceToChange] = useState<null | number>(null);
    const [chooseTypesNameToObjectToChangeService, setChooseTypesNameToObjectToChangeService] = useState<null | string>(null);
    const [chooseTypesTypesToObjectToChangeService, setChooseTypesTypesToObjectToChangeService] = useState<string[]>([]);

    const [isChoosingNewServiceNameMobile, setIsChoosingNewServiceNameMobile] = useState(false);

    const fetchCleaningTypes = cleaningTypeStore.fetchCleaningTypes;

    useEffect(() => {
        if (!cleaningTypeStore?.apiCleaningTypes?.length) fetchCleaningTypes();
    }, [cleaningTypeStore?.apiCleaningTypes?.length, fetchCleaningTypes]);

    return (
        <div ref={ref} className={`${styles.section} ${styles.services}`}>
            <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Услуги:</p>
            {windowWidth <= 1050 ? (<>
                {
                    createTenderState.services.map(service =>
                        <Fragment key={service.id}>
                            <button onClick={() => { createTenderState.removeService(service.id) }} className={`${styles.section__block__button} ${styles.textRegular}`}><img src='/create-tender/create-tender-close.svg' alt="close" />{service.name}</button>
                            <CheckboxGroup
                                //  onChange={(e) => setObjectTypeChosen(e.currentTarget.value)} label=""
                                label=""
                                defaultValue={[]}
                                // className={styles.object__services__types__checkboxGroup}
                                className={`${styles.checkbox__mobile}`}
                                value={service.types.map(type => type.name)}
                                onValueChange={(newServiceTypes => {
                                    // console.log(newServiceTypes, service.types)
                                    createTenderState.changeService(service.id, service.name, newServiceTypes)
                                })}
                            // onValueChange={(newObjectTypes) => { console.log(newObjectTypes); createTenderState.addObject(createTenderState.objectName, newObjectTypes) }}
                            >
                                {
                                    cleaningTypeStore.apiCleaningTypes.find(ser =>
                                        ser.name === service.name)?.types.map(type =>
                                            <Checkbox
                                                // className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${chooseTypesTypesToObjectToChangeService.includes(type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`}
                                                className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${service.types.some(el => el.name === type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`}
                                                key={type.id} value={type.name}>{type.name}
                                            </Checkbox>)
                                }

                            </CheckboxGroup>
                        </Fragment>
                    )
                }
                <button
                    onClick={() => { setIsChoosingNewServiceNameMobile(prev => !prev) }}
                    className={`${styles.section__block__button} ${styles.textRegular} ${createTenderState.errors.includes('object') ? styles.section__block__buttonError : ''}`}
                >
                    <img src={(isChoosingNewServiceNameMobile) ? '/create-tender/create-tender-close.svg' : '/create-tender/create-tender-plus.svg'} alt="plus" />
                    Добавить услуги
                </button>
                {createTenderState.errors.includes('services') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextFloorSspace} ${styles.servicesError}`}>Обязательно для заполнения</p>}
                {
                    isChoosingNewServiceNameMobile && <div
                        // onBlur={() => setIsChoosingObjectNameMobile(false)}
                        className={`${styles.cities__autocomplete} ${styles.objectTypesSelectorMobile} ${styles.servicesTypesSelectorMobile}`}>
                        {
                            !!cleaningTypeStore?.apiCleaningTypes?.length && cleaningTypeStore.apiCleaningTypes.map((service) => !createTenderState.services.some(el => el.name === service.name) &&
                                <p
                                    onClick={() => { setIsChoosingNewServiceNameMobile(false); createTenderState.addService(service.name, []) }}
                                    className={styles.cities__autocomplete__item}
                                    key={service.id}
                                >
                                    {service.name} <img src="/create-tender/create-tender-cities-autocomplete-checkmark.svg" alt="" />
                                </p>
                            )
                        }
                    </div>
                }
            </>) :
                <div className={`${styles.services__block}`}>
                    {createTenderState.services.length > 0 && <div className={styles.services__block__services}>
                        {
                            createTenderState.services.map(service =>
                                <div className={styles.services__block__serviceToChange} key={service.id}>
                                    <div key={service.id} className={`${styles.services__block__service}`}>
                                        <p className={`${styles.service__name}`}>{service.name}</p>
                                        <img className={`${styles.service__name__img} ${styles.arrowRightImg}`} src="/create-tender/create-tender-arrow-right.svg" alt="" />
                                        <div className={`${styles.services__block__service__types}`}>
                                            {
                                                service.types.map(type => <p key={type.id} className={`${styles.services__block__service__type} ${styles.section__block__add__object__objectCategory}`}>
                                                    {type.name}
                                                    <span className={`${styles.section__block__add__object__objectCategory__span}`}></span>
                                                    <img onClick={() => createTenderState.removeServiceType(service.id, type.id)} className={`${styles.section__block__add__object__objectCategory__img}`} src="/create-tender/create-tender-close-white.svg" alt="" />
                                                </p>)
                                            }
                                        </div>
                                        <button
                                            onClick={() => { setIsChoosingServiceToChange(service.id); setChooseTypesNameToObjectToChangeService(service.name); setChooseTypesTypesToObjectToChangeService(service.types.map(type => type.name)) }}
                                            className={`${styles.section__block__button} ${styles.service__button} ${styles.services__block__service__change} ${styles.textRegular}`}>Изменить</button>
                                        <button onClick={() => createTenderState.removeService(service.id)} className={`${styles.section__block__button} ${styles.service__button} ${styles.services__block__service__remove}`}><img src='/create-tender/create-tender-close.svg' alt="" /></button>
                                    </div>

                                    {isChoosingServiceToChange === service.id && <div
                                        //  className={`${styles.object__objects} ${styles.service__objects}`}
                                        className={`${styles.object__types} ${styles.services__types}`}
                                    >
                                        <div
                                            //  className={styles.object__objects__objects}
                                            className={styles.object__services__mobile}
                                        >
                                            {
                                                cleaningTypeStore.apiCleaningTypes.map((service) =>
                                                    <p onClick={() => { setChooseTypesNameToObjectToChangeService(service.name); setChooseTypesTypesToObjectToChangeService([]) }} className={`${styles.object__objects__objects__p} ${service.name === chooseTypesNameToObjectToChangeService ? styles.object__objects__objects__pSelected : ''}`} key={service.id}>{service.name} {service.name === chooseTypesNameToObjectToChangeService && <img className={styles.arrowRightImg} src="/create-tender/create-tender-arrow-right.svg" alt="" />}</p>)
                                            }
                                        </div>
                                        <div
                                        // className={`${styles.services__object__types} ${styles.object__objects__types} ${chooseTypesNameToObjectToChangeService ? '' : styles.object__objects__typesEmpty}`}
                                        >
                                            {
                                                chooseTypesNameToObjectToChangeService && (<>
                                                    <CheckboxGroup
                                                        label=""
                                                        defaultValue={chooseTypesTypesToObjectToChangeService}
                                                        // className={`${styles.object__services__types__checkboxGroup} ${styles.object__services__types__checkboxGroup2}`}
                                                        className={`${styles.typesToAdd}`}
                                                        value={chooseTypesTypesToObjectToChangeService}
                                                        onValueChange={setChooseTypesTypesToObjectToChangeService}
                                                    >
                                                        {
                                                            cleaningTypeStore.apiCleaningTypes.find(service =>
                                                                service.name === chooseTypesNameToObjectToChangeService)?.types.map(type =>
                                                                    <Checkbox
                                                                        className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${chooseTypesTypesToObjectToChangeService.includes(type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`}
                                                                        key={type.id} value={type.name}>{type.name}
                                                                    </Checkbox>)
                                                        }
                                                    </CheckboxGroup>
                                                    <button onClick={() => {
                                                        if (chooseTypesTypesToObjectToChangeService.length) {
                                                            // createTenderState.addService(chooseTypesNameToObjectToChangeService, chooseTypesTypesToObjectToChangeService)
                                                            createTenderState.changeService(isChoosingServiceToChange, chooseTypesNameToObjectToChangeService, chooseTypesTypesToObjectToChangeService)
                                                            setChooseTypesTypesToObjectToChangeService([])
                                                            setChooseTypesNameToObjectToChangeService(null)
                                                            setIsChoosingServiceToChange(null)
                                                            // setIsChoosingServiceToAdd(false)

                                                        }
                                                    }} className={styles.object__objects__types__button} disabled={!chooseTypesTypesToObjectToChangeService.length}>Применить</button>
                                                </>)
                                            }

                                        </div>
                                    </div>}


                                </div>
                            )
                        }
                    </div>}
                    <button onClick={() => { setIsChoosingServiceToAdd(prev => !prev); setChooseTypesNameToObjectToAddService(null) }} className={`${styles.section__block__button} ${styles.service__button} ${styles.textRegular} ${createTenderState.errors.includes('services') ? styles.section__block__buttonError : ''}`}><img src={isChoosingServiceToAdd ? '/create-tender/create-tender-close.svg' : '/create-tender/create-tender-plus.svg'} alt="plus" />{isChoosingServiceToAdd ? 'Отмена' : 'Добавить услугу'}</button>
                    {createTenderState.errors.includes('services') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextFloorSspace} ${styles.servicesError}`}>Обязательно для заполнения</p>}
                    {
                        isChoosingServiceToAdd && <div
                            className={`${styles.object__types} ${styles.services__types} ${chooseTypesNameToObjectToAddService ? '' : `${styles.object__typesHalf} ${styles.services__typesHalf}`}`}
                        // className={`${styles.object__objects} ${styles.service__objects}`}
                        >
                            <div
                            // className={styles.object__objects__objects}
                            >
                                {
                                    !!cleaningTypeStore?.apiCleaningTypes?.length && cleaningTypeStore.apiCleaningTypes.map((service) => !createTenderState.services.some(el => el.name === service.name) &&
                                        <p onClick={() => { setChooseTypesNameToObjectToAddService(service.name); setChooseTypesTypesToObjectToAddService([]) }} className={`${styles.object__objects__objects__p} ${service.name === chooseTypesNameToObjectToAddService ? styles.object__objects__objects__pSelected : ''}`} key={service.id}>{service.name} {service.name === chooseTypesNameToObjectToAddService && <img className={styles.arrowRightImg} src="/create-tender/create-tender-arrow-right.svg" alt="" />}</p>)
                                }
                            </div>
                            {
                                !!chooseTypesNameToObjectToAddService?.length &&
                                <div
                                // className={`${chooseTypesNameToObjectToAddService ? '' : styles.object__objects__typesEmpty}`}
                                // className={`${styles.object__objects__types} ${styles.services__object__types} ${chooseTypesNameToObjectToAddService ? '' : styles.object__objects__typesEmpty}`}
                                >
                                    {
                                        chooseTypesNameToObjectToAddService && (<>
                                            <CheckboxGroup
                                                label=""
                                                defaultValue={[]}
                                                // className={styles.object__services__types__checkboxGroup}
                                                className={`${styles.typesToAdd}`}
                                                value={chooseTypesTypesToObjectToAddService}
                                                onValueChange={setChooseTypesTypesToObjectToAddService}
                                            >
                                                {
                                                    cleaningTypeStore.apiCleaningTypes.find(service => service.name === chooseTypesNameToObjectToAddService)?.types.map(type => <Checkbox className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${chooseTypesTypesToObjectToAddService.includes(type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`} key={type.id} value={type.name}>{type.name}</Checkbox>)
                                                }
                                            </CheckboxGroup>
                                            <button onClick={() => {
                                                if (chooseTypesTypesToObjectToAddService.length) {
                                                    createTenderState.addService(chooseTypesNameToObjectToAddService, chooseTypesTypesToObjectToAddService)
                                                    setChooseTypesTypesToObjectToAddService([])
                                                    setChooseTypesNameToObjectToAddService(null)
                                                    setIsChoosingServiceToAdd(false)
                                                }
                                            }} className={styles.object__objects__types__button} disabled={!chooseTypesTypesToObjectToAddService.length}>Применить</button>
                                        </>)
                                    }

                                </div>}
                        </div>
                    }
                </div>
            }
        </div>
    );
})

export default Services;
