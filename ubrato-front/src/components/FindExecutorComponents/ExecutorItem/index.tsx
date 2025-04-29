import { executorList } from "@/types/app";
import { Dispatch, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './executor-item.module.css'

// eslint-disable-next-line react-refresh/only-export-components
export const modifyPrice = (value: number | string, currencySymbol: string = '₽'): string => {
  const stringValue = String(value);
  const parts = stringValue.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  if (parts.length === 2) {
    return integerPart + ' ' + parts[1] + ' ' + currencySymbol;
  } else {
    return integerPart + ' ' + currencySymbol;
  }
}

const ExecutorItem: FC<{
  executor: executorList,
  showAllExecutorServices?: (id: string) => void,
  showAllExecutorText?: (id: string) => void
  favoriteExecutorsHandler: (executor: executorList) => void,
  setExecutorIdToOfferTender: Dispatch<React.SetStateAction<string | null>>,
  setExecutorNameToOfferTender: Dispatch<React.SetStateAction<string | null>>,
  additionalStyles?: CSSModuleClasses,
  servicesNumber?: number
}> = ({ executor, showAllExecutorServices, showAllExecutorText, favoriteExecutorsHandler, setExecutorIdToOfferTender, setExecutorNameToOfferTender, additionalStyles, servicesNumber }) => {
  const navigate = useNavigate();

  const getShorterText = (text: string) => {
    return text.split(' ').slice(0, 10).join(' ')
  }

  return (
    <div key={executor.id} className={`${styles.executor} ${additionalStyles ? additionalStyles.executorForCarousel : ''}`}>
      <div className={styles.executorInfo}>
        <Link to={`/organization/${executor.id}`}>
          <img className={styles.executorImage} src={executor.img} alt="" />
        </Link>
        <div className={styles.executorTextBlock}>
          <Link to={`/organization/${executor.id}`}>
            <p className={styles.executorName}>{executor.name}</p>
          </Link>
          {executor.text &&
            <p className={`${styles.executorText} ${additionalStyles ? additionalStyles.executorTextForCarousel : ""}`}>
              {executor.isTextHidden && (showAllExecutorText || executor.text.split(' ').length > 10) ? getShorterText(executor.text) : executor.text}
              {executor.isTextHidden && executor.text.split(' ').length > 10 && <img onClick={() => showAllExecutorText && showAllExecutorText(executor.id)} src="/find-executor/arrow-right-black.svg" alt="->" />}
            </p>}
          <div className={styles.executorRegions}>
            {executor.regions.map((region) => {
              // console.log(region, executor);

              return (
                <p key={region.id} className={styles.executorRegion}>
                  {region.name}
                </p>
              )
            })}
          </div>
        </div>
      </div>
      {!!executor.services.length &&
        <div className={`${styles.services} ${additionalStyles ? additionalStyles.servicesForCarousel : ''}`}>
          {executor.services
            .slice(0, servicesNumber ? servicesNumber : (executor.areServicesHidden ? 4 : undefined))
            .map((service) => (
              <div key={service.id} className={`${styles.service} ${additionalStyles ? additionalStyles.serviceForCarousel : ''}`}>
                <p className={styles.serviceName}>{service.group_name} {service.name}</p>
                <p className={styles.servicePrice}>
                  от {modifyPrice(service.price)} за ед.
                  <img
                    src="/find-executor/arrow-right-blue.svg"
                    alt="arrow right blue"
                  />
                </p>
              </div>
            ))}
          {executor.areServicesHidden && showAllExecutorServices && (
            <div
              onClick={() => showAllExecutorServices(executor.id)}
              className={styles.service}
            >
              <p className={`${styles.serviceName} ${styles.showMore}`}>
                Все услуги
                <img
                  src="/find-executor/arrow-right-black.svg"
                  alt="arrow right blue"
                />
              </p>
            </div>
          )}
        </div>
      }
      <div className={`${styles.executorButtons} ${additionalStyles ? additionalStyles.executorButtonsForCarousel : ''}`}>
        <button
          onClick={() => favoriteExecutorsHandler(executor)}
          className={styles.executorLoveButton}
        >
          <img
            src={`/find-executor/heart-${executor.isFavorite ? "active" : "inactive"
              }.svg`}
            alt="heart"
          />
        </button>
        <button
          onClick={() => {
            const token = localStorage.getItem("token");
            if (!token) {
              navigate("/login");
            } else {
              document.body.style.overflow = "hidden";
              setExecutorIdToOfferTender(executor.id);
              setExecutorNameToOfferTender(executor.name);
            }
          }}
          className={`${styles.executorOfferButton} ${additionalStyles ? additionalStyles.executorOfferButtonCarousel : ''}`}
        >
          Предложить тендер
          <img
            src={additionalStyles ? "/find-executor/arrow-right-black.svg" : "/find-executor/arrow-right-white.svg"}
            alt="arrow right white"
          />
        </button>
      </div>
    </div>
  );
}

export default ExecutorItem;