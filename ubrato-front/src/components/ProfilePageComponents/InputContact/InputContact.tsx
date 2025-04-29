import { FC } from 'react';
import styles from '../CompanyInfo/companyinfo.module.css';

export const InputContact: FC<{
  data: {
    contact: string;
    info: string;
  }[];
  setData: (
    e: {
      contact: string;
      info: string;
    }[]
  ) => void;
  ix: number;
  id: string;
}> = ({ data, setData, ix, id }) => {
  return (
    <div data-id={ix}>
      <input
        id={`${id}${ix !== undefined ? ix : ''}`}
        onChange={(e) => {
          const newData = [...data];
          if (newData[ix] !== undefined) {
            newData[ix].contact = e.target.value;
            setData(newData);
          } else {
            newData.push({ contact: e.target.value, info: '' });
            setData(newData);
          }
        }}
        value={ix ? data[ix].contact : data[0]?.contact}
        className={`${styles.contactInput}`}
        type="text"
      />
      <input
        id={`${id.slice(0, 1)}Comment${ix !== undefined ? ix : ''}`}
        onChange={(e) => {
          const newData = [...data];
          if (newData[ix] !== undefined) {
            newData[ix].info = e.target.value;
          } else {
            newData.push({ contact: '', info: e.target.value });
          }
          setData(newData);
        }}
        value={ix ? data[ix].info : data[0]?.info}
        className={`${styles.contactInput} ${styles.comment}`}
        type="text"
        placeholder="Комментарий"
      />
    </div>
  );
};
