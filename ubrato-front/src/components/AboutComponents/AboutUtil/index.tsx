import { FC, useState } from "react";
import styles from "./style.module.css";
import { useIsOrdererState } from "@/store/isOrdererStore";
import { Executor, OpportunitiesInfoT, Orderer } from "@/textData/textData";

import { Link } from "react-router-dom";

export const AboutUtils: FC = () => {
  const ordererState = useIsOrdererState();
  const [info, setInfo] = useState<OpportunitiesInfoT[]>(Orderer);

  function handleInfo() {
    if (ordererState.role === "orderer") {
      ordererState.handleState("contractor");
      setInfo(Executor);
    } else {
      ordererState.handleState("orderer");
      setInfo(Orderer);
    }
  }

  return (
    <div className={styles.develop_container}>
      {ordererState.role === "orderer" && (
        <div className={styles.develop_container}>
          <h2 className={styles.develop_header_modded}>
            На <span className="text-accent">Ubrato</span> собраны клининговые компании разного профиля и масштаба,
            например, здесь можно найти исполнителей для
          </h2>
          <div className={styles.develop_list}>
            <div className={styles.service_line}>
              <div>
                <p>уборки после ремонта</p>
              </div>
              <div>
                <p>фасадных работ</p>
              </div>
              <div>
                <p>поддерживающей уборки</p>
              </div>
            </div>
            <div className={styles.service_line}>
              <div>уборки территории</div>
              <div>генеральной уборки</div>
              <div>уборки офиса</div>
              <div>клининга офиса</div>
            </div>
            <div className={styles.service_line}>
              <div>дежурства на мероприятии</div>
              <div>дезинфекции и дезинсекции</div>
            </div>
          </div>{" "}
        </div>
      )}

      {ordererState.role === "contractor" && (
        <div className={styles.develop_container}>
          {" "}
          <h2 className={styles.develop_header_modded}>
            Ubrato используют заказчики клининговых услуг разного профиля и
            масштаба, например, здесь можно найти тендеры на услуги:
          </h2>
          <div className={styles.develop_list}>
            <div className={styles.service_line}>
              <div>
                <p>генеральной уборки</p>
              </div>
              <div>
                <p>уборки территории </p>
              </div>
              <div>
                <p>дезинфекции</p>
              </div>
              <div>
                <p>химчистки ковролина</p>
              </div>
            </div>
            <div className={styles.service_line}>
              <div>уборки после ремонта</div>
              <div>регулярной уборки дома или офиса</div>
              <div>мойки фасадов и окон</div>
              <div>клининга офиса</div>
            </div>
            <div className={styles.service_line}>
              <div>вывоза бытового и строительного мусора</div>
              <div>уборки промышленных объектов</div>
              <div>уборки промышленных</div>
            </div>
          </div>{" "}
        </div>
      )}

      <div className={styles.container}>
        <div className="flex flex-col justify-center items-center mt-10">
          <h2 className={styles.header}>
            Вам нужен <span className={styles.blueText}>Ubrato</span>, если вы
          </h2>
          <div className={styles.btnsContainer}>
            <button
              onClick={() => {
                handleInfo();
              }}
              disabled={ordererState.role === "orderer"}
              className={`${styles.button}`}
            >
              Заказчик
            </button>
            <button
              onClick={() => {
                handleInfo();
              }}
              disabled={ordererState.role === "contractor"}
              className={`${styles.button}`}
            >
              Исполнитель
            </button>
          </div>
          {ordererState.role === "orderer" && (
            <div className={styles.develop_container_modded}>
              <div className={styles.develop_list}>
                <div className={styles.service_line_modded}>
                  <div>руководитель компании</div>
                  <div>специалист по закупкам</div>
                </div>
                <div className={styles.service_line_modded}>
                  <div>
                    сотрудник административно-хозяйственного подразделения
                  </div>
                  <div>ивент-менеджер</div>
                </div>
                <div className={styles.service_line_modded}>
                  <div>сотрудник тендерного отдела</div>
                </div>
              </div>
            </div>
          )}

          {ordererState.role === "contractor" && (
            <div className={styles.develop_container_modded}>
              <div className={styles.develop_list}>
                <div className={styles.service_line_modded}>
                  <div>
                    <p>руководитель компании</p>
                  </div>
                  <div>
                    <p>менеджер по продажам</p>
                  </div>
                </div>
                <div className={styles.service_line_modded}>
                  <div>специалист по продвижению услуг компании</div>
                  <div>клиентский менеджер</div>
                </div>
                <div className={styles.service_line_modded}>
                  <div>траффик-менеджер</div>
                </div>
              </div>
            </div>
          )}
        </div>
        {ordererState.role === "orderer" && (
          <div className={styles.develop_container_modded}>
            <h2 className={styles.header_list_links}>Как найти исполнителя?</h2>
            <div className={styles.link_container}>
              <div className={styles.link_container_block}>
                <div className={styles.link_header}>
                  <img src="./notepad.png" alt="" />
                  <h3>Опубликуйте тендер, если хотите выбрать лучшее предложение среди откликов</h3>
                </div>
                <Link className={styles.link_button} to={'create-tender'}>
                  <p>Опубликовать тендер</p>
                  <div>➜</div>
                </Link>
              </div>
              <div className={styles.link_container_block}>
                <div className={styles.link_header}>
                  <img src="./profile.png" alt="" />
                  <h3>Выберите исполнителя по профилю работ, портфолио, надежности и другим критериям</h3>
                </div>
                <Link className={styles.link_button} to={'/find-executor'}>
                  <p>Kаталог исполнителей</p>
                  <div>➜</div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {ordererState.role === "contractor" && (
          <div className={styles.develop_container_modded}>
            <h2 className={styles.header_list_links}>Как найти заказчика?</h2>
            <div className={styles.link_container}>
              <div className={styles.link_container_block}>
                <div className={styles.link_header}>
                  <img src="./images.png" alt="" />
                  <h3>Расскажите о возможностях и преимуществах вашей компании</h3>
                </div>
                <Link className={styles.link_button} to={''}>
                  <p>Создать портфолио</p>
                  <div>➜</div>
                </Link>
              </div>
              <div className={styles.link_container_block}>
                <div className={styles.link_header}>
                  <img src="./notepad_checked.png" alt="" />
                  <h3>Откликайтесь на тендеры, обсуждайте условия в чате, предлагайте свою цену</h3>
                </div>
                <Link className={styles.link_button} to={'/alltenders'}>
                  <p>Найти тендеры</p>
                  <div>➜</div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
