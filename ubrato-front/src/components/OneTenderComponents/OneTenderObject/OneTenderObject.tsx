import { FC } from 'react';
import style from './OneTednerObject.module.css';

type TenderObject = {
  objectGroup: string
  objectsTypes: Array<string>;
};


export const OneTenderObject: FC<TenderObject> = ({ objectGroup, objectsTypes }) => {

  return (
    <div className={style.block_main}>
      <p className={style.block_main_p}>Объект:</p>
      <div className={style.lineList}>
        <div className={style.iconLine}>
          {/* <div className={style.IconBack}>
            <img className={style.icon} src="/tenderpics/building.svg" alt="" />
          </div> */}
          <p>
            {objectGroup} <span>{'>'}</span>
          </p>
        </div>
        {objectsTypes?.map((obj, index) =>
          <p className="bg-slate-100 rounded-md px-3 py-1" key={index}>
            {obj}
          </p>
        )}
      </div>
    </div>
  );
};
