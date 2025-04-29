import { useCreateTenderState } from "@/store/createTenderStore";
import { useTypesObjectsStore } from "@/store/objectsStore";
import { FC, forwardRef, useEffect, useState } from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import styles from '../../CreateTender.module.css'
import { checkFloorSpace } from "../../funcs";

const Object: FC<{ windowWidth: number, ref?: React.LegacyRef<HTMLDivElement>; }> = forwardRef<HTMLDivElement, Omit<{ windowWidth: number, ref?: React.LegacyRef<HTMLDivElement>; }, 'ref'>>((props, ref) => {
    const { windowWidth } = props
    const createTenderState = useCreateTenderState()
    const objectsStore = useTypesObjectsStore()

    const [isChoosingObjectNameMobile, setIsChoosingObjectNameMobile] = useState(false);
    const [chooseTypesTypesToObjectToAddObject, setChooseTypesTypesToObjectToAddObject] = useState<string[]>([]);
    const [isChoosingObject, setIsChoosingObject] = useState(false);
    const [isObjectChoosed, setIsObjectChoosed] = useState<null | string>(null);
    const [choosingObjectTypes, setChoosingObjectTypes] = useState<null | { id: number, name: string, count: number }[]>(null);

    const fetchObjects = objectsStore.fetchObjects;

    useEffect(() => {
        if (!objectsStore?.apiObjects?.length) fetchObjects();
    }, [objectsStore?.apiObjects?.length, fetchObjects]);

    return (
        <div ref={ref} className={`${styles.section} ${styles.object}`}>
            <div className={`${styles.section__block}`}>
                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Объект:</p>
                {
                    windowWidth <= 1050 ? (<>
                        <button
                            onClick={() => { setIsChoosingObjectNameMobile(prev => !prev); createTenderState.addObject('', []) }}
                            className={`${styles.section__block__button} ${styles.textRegular} ${createTenderState.errors.includes('object') ? styles.section__block__buttonError : ''}`}
                        >
                            <img src={(createTenderState.objectName || isChoosingObjectNameMobile) ? '/create-tender/create-tender-close.svg' : '/create-tender/create-tender-plus.svg'} alt="plus" />
                            {createTenderState.objectName || 'Добавить объект'}
                        </button>
                        {
                            createTenderState.objectName &&
                            <CheckboxGroup
                                //  onChange={(e) => setObjectTypeChosen(e.currentTarget.value)} label=""
                                label=""
                                defaultValue={[]}
                                // className={styles.object__services__types__checkboxGroup}
                                className={`${styles.checkbox__mobile}`}
                                value={createTenderState.objectCategory}
                                onValueChange={(newObjectTypes) => { createTenderState.addObject(createTenderState.objectName, newObjectTypes); createTenderState.removeError('object') }}
                            >
                                {
                                    // choosingObjectTypes?.map(type => <Checkbox className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${createTenderState.objectCategory.includes(type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`} key={type.id} value={type.name}>{type.name}</Checkbox>)
                                    objectsStore.apiObjects?.find(el => el.name === createTenderState.objectName)?.types.map(type => <Checkbox className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${createTenderState.objectCategory.includes(type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`} key={type.id} value={type.name}>{type.name}</Checkbox>)
                                }

                            </CheckboxGroup>
                        }
                        {
                            isChoosingObjectNameMobile && <div
                                // onBlur={() => setIsChoosingObjectNameMobile(false)}
                                className={`${styles.cities__autocomplete} ${styles.objectTypesSelectorMobile}`}>
                                {
                                    objectsStore.apiObjects.map((object: { id: number, name: string, total: number, types: { id: number, name: string }[] }) =>
                                        <p
                                            onClick={() => { createTenderState.handleSimpleInput('objectName', object.name); setIsChoosingObjectNameMobile(false); setChoosingObjectTypes(object.types.map(object => ({ ...object, count: 0 }))) }}
                                            className={styles.cities__autocomplete__item}
                                            key={object.id}
                                        >
                                            {object.name} <img src="/create-tender/create-tender-cities-autocomplete-checkmark.svg" alt="" />
                                        </p>
                                    )
                                }
                            </div>
                        }
                        {createTenderState.errors.includes('object') && <p className={`${styles.inputErrorText} ${styles.objectError}`}>Обязательно для заполнения</p>}
                    </>) :
                        <div className={`${styles.section__block__add__object}`}>
                            {!!createTenderState.objectCategory.length && <div className={`${styles.services__block__service} ${styles.object__block__service}`}>
                                <p className={`${styles.service__name}`}>{createTenderState.objectName}</p>
                                <img className={`${styles.service__name__img} ${styles.arrowRightImg}`} src="/create-tender/create-tender-arrow-right.svg" alt="" />
                                <div className={`${styles.services__block__service__types}`}>
                                    {
                                        createTenderState.objectCategory.map((type, ind) => <p key={ind} className={`${styles.services__block__service__type} ${styles.section__block__add__object__objectCategory}`}>
                                            {type}
                                            <span className={`${styles.section__block__add__object__objectCategory__span}`}></span>
                                            <img onClick={() => {
                                                createTenderState.removeObjectType(ind);
                                                setChooseTypesTypesToObjectToAddObject(prev => prev.filter((_, i) => i !== ind));
                                                if (createTenderState.objectCategory.length === 1) {
                                                    createTenderState.handleSimpleInput('objectName', '')
                                                    setIsObjectChoosed(null)
                                                }
                                            }} className={`${styles.section__block__add__object__objectCategory__img}`} src="/create-tender/create-tender-close-white.svg" alt="" />
                                        </p>)
                                    }
                                </div>
                            </div>}
                            <button
                                className={`${styles.section__block__button} ${styles.textRegular} ${(createTenderState.objectName || isChoosingObject) ? styles.section__block__button__end : ''} ${createTenderState.errors.includes('object') ? styles.section__block__buttonError : ''}`}
                                onClick={() => { setIsChoosingObject(prev => !prev); }}
                            >{
                                    (createTenderState.objectName && !isChoosingObject) ?
                                        'Изменить' :
                                        isChoosingObject ?
                                            <>
                                                <img src="/create-tender/create-tender-close.svg" alt="close" />
                                                Отмена
                                            </> :
                                            <>
                                                <img src="/create-tender/create-tender-plus.svg" alt="plus" />
                                                Добавить объект
                                            </>
                                }</button>
                            {createTenderState.errors.includes('object') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextFloorSspace} ${styles.objectError} ${(createTenderState.objectName || isChoosingObject) ? styles.objectErrorRight : ''}`}>Обязательно для заполнения</p>}
                        </div>
                }
            </div>
            {
                isChoosingObject && windowWidth > 1050 && <div
                    className={`${styles.object__types} ${choosingObjectTypes ? '' : styles.object__typesHalf}`}
                //  className={`${styles.object__objects} ${choosingObjectTypes ? '' : styles.object__objectsEmpty}`}
                >
                    <div
                    //  className={styles.object__objects__objects}
                    >
                        {
                            !!objectsStore?.apiObjects?.length &&
                            objectsStore.apiObjects.map((object: { id: number, name: string, total: number, types: { id: number, name: string }[] }) =>
                                <p
                                    className={`${styles.object__objects__objects__p} ${object.name === isObjectChoosed ? styles.object__objects__objects__pSelected : ''}`}
                                    onClick={() => {
                                        setChoosingObjectTypes(object.types.map(el => ({ id: el.id, name: el.name, count: 0 })));
                                        setIsObjectChoosed(object.name);
                                        setChooseTypesTypesToObjectToAddObject([])
                                    }}
                                    key={object.id}
                                >{object.name} {object.name === isObjectChoosed && <img className={styles.arrowRightImg} src="/create-tender/create-tender-arrow-right.svg" alt="" />}</p>)
                        }
                    </div>
                    {!!choosingObjectTypes?.length &&
                        <div
                        // className={`${choosingObjectTypes ? '' : styles.object__objects__typesEmpty}`}
                        // className={`${styles.object__objects__types} ${choosingObjectTypes ? '' : styles.object__objects__typesEmpty}`}
                        >
                            {
                                isObjectChoosed && (<>
                                    <CheckboxGroup
                                        //  onChange={(e) => setObjectTypeChosen(e.currentTarget.value)} label=""
                                        label=""
                                        defaultValue={[]}
                                        // className={styles.object__services__types__checkboxGroup}
                                        className={`${styles.typesToAdd}`}
                                        value={chooseTypesTypesToObjectToAddObject}
                                        onValueChange={setChooseTypesTypesToObjectToAddObject}
                                    >
                                        {
                                            choosingObjectTypes!.map(type => <Checkbox className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${chooseTypesTypesToObjectToAddObject.includes(type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`} key={type.id} value={type.name}>{type.name}</Checkbox>)
                                        }

                                    </CheckboxGroup>
                                    <button onClick={() => {
                                        if (chooseTypesTypesToObjectToAddObject.length) {
                                            // createTenderState.handleSimpleInput('objectName', isObjectChoosed!);
                                            // createTenderState.handleSimpleInput('objectCategory', objectTypeChosen!);
                                            // createTenderState.addObject('', [])
                                            createTenderState.removeError('object')
                                            createTenderState.addObject(isObjectChoosed!, chooseTypesTypesToObjectToAddObject)
                                            setIsChoosingObject(false)
                                            // setObjectTypeChosen(null)
                                        }
                                    }} className={styles.object__objects__types__button} disabled={!chooseTypesTypesToObjectToAddObject.length}>Применить</button>
                                </>)
                            }
                        </div>}
                </div>
            }
            <div className={`${styles.section__block} ${styles.square}`}>
                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Площадь:</p>
                <input
                    // onClick={(e) => e.stopPropagation()}
                    onBlur={() => +createTenderState.floor_space === 0 && createTenderState.handleSimpleInput("floor_space", "")}
                    // onFocus={() => createTenderState.removeError('floor_space')}
                    // onBlur={() => !createTenderState.floor_space && createTenderState.addError('floor_space')}
                    value={createTenderState.floor_space}
                    onChange={(e) => createTenderState.handleSimpleInput('floor_space', e.currentTarget.value, checkFloorSpace)}
                    type="text"
                    className={`${styles.input} ${styles.square__input} ${createTenderState.errors.includes('floor_space') ? styles.inputError : ''}`}
                /><label className={`${styles.square__label} ${styles.textReguar} ${styles.textBlack50}`} htmlFor="">кв. м.</label>
                {createTenderState.errors.includes('floor_space') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextFloorSspace}`}>Обязательно для заполнения</p>}
            </div>
        </div>
    );
})

export default Object;