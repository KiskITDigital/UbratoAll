import { FC, useState } from 'react';
import styles from './info.module.css'
import Modal from '@/components/Modal';
import OfferTender from '@/components/FindExecutorComponents/OfferTender/OfferTender';
import { useNavigate } from 'react-router-dom';

const Info: FC<{
    orgId: string, status: 'orderer' | 'executor',
    isFavorite: boolean,
    favoriteExecutorsHandler: (organization: { id: string, isFavorite: boolean }) => void,
    img: string, brand: string, name: string, inn: string
}> = ({ isFavorite, favoriteExecutorsHandler, orgId, status, img, brand, name, inn }) => {
    const navigate = useNavigate()

    const [isModal, setIsModal] = useState(false);

    const offerTender = () => {
        const token = localStorage.getItem('token')
        if (status === 'executor' && token) setIsModal(true)
        else navigate('/register')
    }

    return (
        <div className={styles.container}>
            {isModal && (
                <Modal isOpen={!!orgId}>
                    <OfferTender
                        closeModal={() => setIsModal(false)}
                        executorId={orgId}
                        executorName={name}
                    />
                </Modal>
            )}
            <div className={styles.info}>
                <img className={styles.info__logo} src={img || '/avatar-ic.svg'} alt="" />
                <div className={styles.info__text}>
                    <p className={styles.info__text__brand}>{brand}</p>
                    <p className={styles.info__text__name}>{name}</p>
                    <p className={styles.info__text__inn}>ИНН {inn}</p>
                </div>
            </div>
            <div className={styles.buttons}>
                <button onClick={offerTender} className={styles.offerTenderButton}>{status === 'executor' ? 'Предложить тендер' : 'Связаться'}</button>
                <button onClick={() => favoriteExecutorsHandler({ id: orgId, isFavorite })} className={styles.favoriteButton}><img src={isFavorite ? "/find-executor/heart-active.svg" : "/find-executor/heart-black.svg"} alt="+" /> Добав{isFavorite ? 'лено' : 'ить'} в избранное</button>
            </div>
        </div>
    );
}

export default Info;