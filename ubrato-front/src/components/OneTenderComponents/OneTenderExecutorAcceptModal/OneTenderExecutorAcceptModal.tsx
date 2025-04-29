import { FC, useState } from "react"
import styles from './styles.module.css'
import { Switch } from '@nextui-org/react';
import { sendResponse } from "@/api/respondTender";
// import notion from ''

type TenderModalProps = {
  setResponse: () => void;
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  price: number;
  id: string | undefined,
  response: boolean
};

export const OneTenderExecutorAcceptModal: FC<TenderModalProps> = ({ setResponse, id, isOpen, closeModal, handleSubmit, handleChange, price, response }) => {
  const [customPrice, setCustomPrice] = useState<number | null>(null);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const SwicthStyles = {
    base: styles.base,
    wrapper: styles.wrapper,
    thumb: styles.thumb,
  };

  const token = localStorage.getItem('token');

  const handleResponseOnTender = (token: string, id: string, price: number) => {
    if (token) {
      try {
        (async () => {
          await sendResponse(token, id, price);
        })();
      } catch (e) {
        // console.log(e);
      }
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
    if (e.target.checked) {
      setCustomPrice(null);
    } else {
      // console.log('error occured');

    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPrice = parseFloat(e.target.value);
    if (!isNaN(inputPrice)) {
      setCustomPrice(inputPrice);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token && id) {
      const finalPrice = isAgreed ? price : customPrice;
      if (finalPrice !== null) {
        await handleResponseOnTender(token, id, finalPrice);
        setResponse()
        closeModal()
      }
    }
  };



  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          {!response ? (
            <div className={styles.modal}>
              <span className={styles.close} onClick={closeModal}>&times;</span>
              <h2 className={styles.modalHeader}>Откликнуться на тендер</h2>
              <form className={styles.form_modal} onSubmit={handleSubmit}>
                <label className={`${styles.field}`}>
                  <p className={styles.accent_paragraph}>Выберите один из вариантов:</p>
                  <div className={styles.wrap_label}>
                    {/* <label className={styles.input_checkbox}> <span className={styles.phantom_check}></span> <input onChange={handleCheckboxChange} type="checkbox" name=""  /></label>  */}
                    <input type="checkbox" onChange={handleCheckboxChange} className={styles.input_checkobx} />
                    <p className={styles.middle_paragraph}>Согласны со стоимостью заказчика {price} рублей</p>
                  </div>

                </label>
                <label className={`${styles.field}`}>
                  <p className={styles.label_paragraph}>Готовы выполнить работу за</p>
                  <div>
                    <input onChange={handleInputChange} disabled={isAgreed} type="number" name="price" className={styles.input_modal} />
                    рублей
                  </div>
                  <Switch classNames={SwicthStyles} onChange={handleChange}></Switch>
                  <span className={styles.span_nds}>вкл. НДС</span>
                </label>
                <div className={styles.nds_notice}>
                  <div className={styles.circle}></div>
                  <p className={styles.nds_notice_text}>
                    Если ваша компания работает по общей системе налогообложения (ОСН), указывайте цену с учетом НДС
                  </p>
                </div>
                <button onClick={handleFormSubmit} className={styles.button_spec} type="submit">Откликнуться</button>

              </form>
            </div>
          ) : (
            <div className={styles.modal_new}>
              <p className={styles.notion}>Вы уже откликнулись на этот тендер!</p>
              <div className={styles.nds_notice}>
                {/* <div className={styles.circle}></div> */}
                {/* <img src="./notion.svg" alt="" /> */}
                <p className={styles.nds_notice_text}>Ранее вы уже откликались на этот тендер</p>
              </div>
              <button className={styles.button_spec} onClick={closeModal}>Закрыть окно</button>
            </div>
          )}
        </div>
      )}
    </>
  )
}