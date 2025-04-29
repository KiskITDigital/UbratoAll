import { FC, useEffect, useRef } from 'react';
import { CleaningTypeT } from '@/types/app';
import styles from './typecleaningcard.module.css';
import { countTransformTender, countTransformService } from '@/utils';
import { useIsOrdererState } from '@/store/isOrdererStore';

type PropsT = {
  info: CleaningTypeT;
  changeActive: (ix: number) => void;
  ix: number;
};

export const TypeCleaningCard: FC<PropsT> = ({ info, changeActive, ix }) => {
  // const width: number | null = null;
  // const widthR = useRef<number | null>(width);

  const isOrdererState = useIsOrdererState();

  // useEffect(() => {
  //   if (window.outerWidth <= 450) {
  //     widthR.current = window.outerHeight;
  //   }
  // }, []);

  return (
    // <div
    //   className={`${styles.container} ${info.isActive ? styles.active : ''}`}
    //   onClick={() => {
    //     changeActive(ix);
    //   }}
    //   style={
    //     widthR.current
    //       ? {}
    //       : { backgroundImage: `url(${info.image})`, paddingBottom: `${info.padding}px` }
    //   }
    // >
    // <div className={styles.textContent}>
    //   <p className={styles.header}>{info.name}</p>
    //   <p className={styles.text}>
    //     {info.count === -1
    //       ? ''
    //       : `${info.count} ${isOrdererState.role === 'contractor'
    //         ? countTransformTender(info.count)
    //         : countTransformService(info.count)
    //       }`}
    //   </p>
    // </div>
    // </div>
    <div
      onClick={() => {
        changeActive(ix);
      }}
      className={`${styles.container} ${info.isActive ? styles.active : ''}`}>
      <div className={styles.textContent}>
        <p className={styles.header}>{info.name}</p>
        <p className={styles.text}>
          {`${info.count === -1 ? 0 : info.count} ${isOrdererState.role === 'contractor'
            ? countTransformTender(info.count === -1 ? 0 : info.count)
            : countTransformService(info.count === -1 ? 0 : info.count)
            }`}
        </p>
      </div>
      <img className={styles.img} src={info.image} alt="" />
    </div>
  );
};
