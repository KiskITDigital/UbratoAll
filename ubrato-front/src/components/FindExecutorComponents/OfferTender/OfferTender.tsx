import { FC, useEffect, useState } from 'react';
import styles from './offer-tender.module.css'
import { Link } from 'react-router-dom';
import { Radio, RadioGroup } from '@nextui-org/react';
import { offerTender } from '@/api/index'
import { tenderData } from '@/types/app';
import { isRespondedOfferTender } from '@/api/index';
import { useCreateTenderState } from '@/store/createTenderStore';
import { generateTypesenseClient } from '../generateSearchclient';
import { useUserInfoStore } from '@/store/userInfoStore';

const OfferTender: FC<{
    closeModal: (newState: null) => void
    executorId: string,
    executorName: string,
}> = ({ closeModal, executorId, executorName }) => {
    const [tenderId, setTenderId] = useState('');
    const [tenderList, setTenderList] = useState<tenderData[] | null>(null);

    const createTenderState = useCreateTenderState()
    const userInfoState = useUserInfoStore()

    useEffect(() => {
        (async () => {
            const hits = await generateTypesenseClient("tender_index", { per_page: 15, sort_by: "created_at:desc", filter_by: `user_id:=${userInfoState.user.id}` })
            const token = localStorage.getItem('token');
            if (!token) return;
            const tenderListPromises = hits?.map(async (hit) => {
                const { id: tenderId } = hit.document as { id: string }
                const statusResponse = await isRespondedOfferTender(token, tenderId, executorId);
                const status = statusResponse.data.status;
                return {
                    ...hit.document,
                    status
                } as tenderData;
            }) || [];

            const newTenderList = await Promise.all(tenderListPromises);
            setTenderList(newTenderList);
        })()
    }, [executorId, userInfoState.user.id]);

    const radioStyle = {
        base: styles.radioBase,
        wrapper: styles.radioWrapper,
        control: styles.radioControl,
    };

    const submit = async () => {
        const token = localStorage.getItem('token')
        if (!token) return;
        offerTender(token, executorId, +tenderId)
        closeModal(null)
    }

    return (
        <div className={styles.container}>
            {/* <p className={styles.title}>Предложите тендер исполнителю <img className={styles.title__closeIcon} onClick={() => closeModal(null)} src="/x-icon.svg" alt="" /></p> */}
            <p className={styles.title}>Предложите тендер исполнителю <button className={styles.title__closeIcon}>
                <img onClick={() => closeModal(null)} src="/x-icon.svg" alt="" />
            </button></p>
            {
                tenderList ?
                    tenderList.length ?
                        <>
                            <div className={styles.tenders}>
                                <p className={styles.description}>Мои тендеры</p>
                                <RadioGroup
                                    value={tenderId}
                                    onValueChange={setTenderId}
                                    classNames={radioStyle}>
                                    {
                                        tenderList.map(tender => <Radio isDisabled={tender.status} key={tender.id} value={tender.id}>
                                            <p className={styles.tender__receptionTime}>Прием откликов до {new Date(tender.reception_end * 1000).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            <p className={styles.tender__name}>{tender.name}</p>
                                        </Radio>)
                                    }
                                </RadioGroup>
                            </div>
                            <div className={styles.buttons}>
                                <Link onClick={() => createTenderState.changeExecutorToSend(executorId, executorName)} to="/create-tender">
                                    <button className={styles.button}>Создать тендер</button>
                                </Link>
                                <button onClick={submit} disabled={tenderId ? false : true} className={styles.button}>Предложить</button>
                            </div>
                        </>
                        :
                        <div className={styles.noTenders}>
                            <p className={styles.description}>У вас пока нет опубликованных тендеров</p>
                            <p className={styles.action}>Создайте тендер и предложите его потенциальным исполнителям</p>
                            <Link onClick={() => createTenderState.changeExecutorToSend(executorId, executorName)} to="/create-tender">
                                <button className={styles.button}>Создать тендер</button>
                            </Link>
                        </div>
                    :
                    <>
                        <p className={styles.spinner}>🌀</p>
                    </>
            }
        </div>
    );
}

export default OfferTender;