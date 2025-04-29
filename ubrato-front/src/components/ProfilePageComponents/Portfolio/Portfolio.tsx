import { FC, useEffect, useRef, useState } from 'react';
import styles from './portfolio.module.css';
import { Checkbox, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { PortfolioForm } from '../PortfolioForm/PortfolioForm';
import TrashIC from './trash-bin.svg?react';
import { deletePortfolio, updateToken } from '@/api';

export const Portfolio: FC<{
  setPortfolio: (e: {
    id: string;
    name: string;
    description: string;
    links: string[];
    selected: boolean;
  }) => void;
  setPortfolioList: (
    e: {
      id: string;
      name: string;
      description: string;
      links: string[];
      selected: boolean;
    }[]
  ) => void;
  portfolio: {
    id: string;
    name: string;
    description: string;
    links: string[];
    selected: boolean;
  }[];
}> = ({ portfolio, setPortfolio, setPortfolioList }) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isChanging, setIschanging] = useState<{ id: string; isChanging: boolean }[]>([]);
  const closeForm = () => {
    setIsFormOpen(false);
  };

  const changePortfolio = (portfolioItem: {
    id: string;
    name: string;
    description: string;
    links: string[];
    selected: boolean;
  }) => {
    setPortfolioList(
      portfolio.map((e) => {
        if (e.id === portfolioItem.id) {
          return portfolioItem;
        }
        return e;
      })
    );
  };

  useEffect(() => {
    setIschanging(
      [...portfolio].map((e) => {
        return { id: e.id, isChanging: false };
      })
    );
  }, [portfolio]);

  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: styles.checkText,
  };

  const propoverSlots = {
    base: styles.base,
    backdrop: styles.backdrop,
    trigger: styles.trigger,
    content: styles.content
  }

  return (
    <div className={styles.container}>
      <div ref={windowRef} className={styles.popOverPortal}></div>
      <p className={styles.header}>Портфолио</p>
      <div className={styles.infoContainer}>
        <img src="/info-blue-ic.svg" alt="" />
        <p className={styles.infoTextBig}>
          Разместите фотографии с примерами работ вашей компании и напишите описание
        </p>
      </div>
      <Popover
        isOpen={isFormOpen}
        // onOpenChange={(e) => setIsFormOpen(e)}
        portalContainer={windowRef.current ?? document.body}
        shouldBlockScroll
        backdrop="opaque"
        classNames={propoverSlots}
      >
        <PopoverTrigger onClick={() => setIsFormOpen(true)}>
          <button className={styles.btn}>
            <img className={styles.btnImg} src="/add-file-ic.svg" alt="" />
            <div className={styles.btnText}>
              <p className={styles.btnTextBig}>Добавить работы</p>
              <p className={styles.count}>Можно загрузить до {10 - portfolio.length} шт.</p>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex justify-center items-center w-screen min-h-screen">
            <div className={styles.form}>
              <button onClick={() => setIsFormOpen(false)} className={styles.closeBtn}>
                <img src="/x-icon.svg" alt="" />
              </button>
              <PortfolioForm
                setPortfolioList={changePortfolio}
                setPortfolio={setPortfolio}
                close={closeForm}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div className={styles.controls}>
        <Checkbox
          classNames={{ ...checkStyle, label: 'text-black' }}
          onValueChange={(e) => {
            setPortfolioList(
              [...portfolio].map((i) => {
                return { ...i, selected: e };
              })
            );
          }}
        >
          Выбрать все
        </Checkbox>
        <button
          onClick={() => {
            portfolio.forEach(async (e) => {
              if (e.selected) {
                updateToken(deletePortfolio, e.id);
              }
            });
            setPortfolioList([...portfolio].filter((e) => !e.selected));
          }}
          className={styles.delete}
        >
          <TrashIC />
          Удалить выбранное
        </button>
      </div>
      {portfolio.map((e) => (
        <div className={styles.itemContainer} key={e.id}>
          <div>
            <Checkbox
              isSelected={e.selected}
              onValueChange={(p) => {
                setPortfolioList(
                  [...portfolio].map((i) => {
                    if (i.id === e.id) {
                      return { ...i, selected: p };
                    }
                    return i;
                  })
                );
              }}
              classNames={checkStyle}
            >
              {e.name}
            </Checkbox>
            { }
          </div>
          <div className={styles.description}>
            <p className={styles.descriptionText}>{e.description}</p>
            <div className={styles.imagesContainer}>
              {e.links.map((i) => (
                <img className={styles.portfolioImg} key={i} src={`https://cdn.ubrato.ru/s3${i}`} />
              ))}
            </div>
            <div className={styles.controls}>
              <Popover
                isOpen={isChanging.find((i) => i.id === e.id)?.isChanging}
                onOpenChange={(i) => {
                  setIschanging(
                    [...isChanging].map((t) => {
                      if (e.id === t.id) {
                        return { id: t.id, isChanging: i };
                      }
                      return t;
                    })
                  );
                }}
                portalContainer={windowRef.current ?? document.body}
                shouldBlockScroll
                backdrop="blur"
              >
                <PopoverTrigger>
                  <button className={styles.changeData}>
                    <img src="/change-data-ic.svg" alt="" /> Редактировать
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className={styles.form}>
                    <button
                      onClick={() => {
                        setIschanging(
                          [...isChanging].map((t) => {
                            if (e.id === t.id) {
                              return { id: t.id, isChanging: false };
                            } else {
                              return t;
                            }
                          })
                        );
                      }}
                      className={styles.closeBtn}
                    >
                      <img src="/x-icon.svg" alt="" />
                    </button>
                    <PortfolioForm
                      setPortfolioList={changePortfolio}
                      data={e}
                      setPortfolio={setPortfolio}
                      close={closeForm}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <button
                onClick={() => {
                  updateToken(deletePortfolio, e.id);
                  setPortfolioList([...portfolio].filter((i) => i.id !== e.id));
                }}
                className={styles.deleteOne}
              >
                <TrashIC />
                Удалить
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
