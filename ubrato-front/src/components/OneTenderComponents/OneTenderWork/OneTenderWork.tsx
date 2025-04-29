import { FC } from "react";
import styles from "./OneTenderWork.module.css";
import { useState } from "react";

type MainBLockTypes = {
  gg: string;
  compName: string;
  rate: number;
};

export const OneTenderMainBlock: FC<MainBLockTypes> = ({gg}) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

    const maxLength = 90

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const displayText = collapsed ? gg.slice(0, maxLength) : gg;

  return( 
  <div className={styles.block_main}>
    <p className={styles.block_main_p}>Исполнитель</p>
    <div className={styles.wrap_comment_section}>
    <div className={styles.circle_picture}></div>
    <div className={styles.block_comment}>
    <span></span>
    <p>{displayText}</p>
    {gg.length > maxLength && (
        <button onClick={toggleCollapse}>{collapsed ? 'Читать полностью' : 'Свернуть текст'}</button>
      )}
    </div>
    </div>
  </div>
  );
};
