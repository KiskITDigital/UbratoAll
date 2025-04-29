import { FC, FormEvent, Ref, useEffect } from 'react';
import styles from '../CompanyInfo/companyinfo.module.css';
import { useIMask } from 'react-imask';

export const InputPhone: FC<{
  phones: {
    contact: string;
    info: string;
  }[];
  setPhones: (
    e: {
      contact: string;
      info: string;
    }[]
  ) => void;
  ix: number;
}> = ({ phones, setPhones, ix }) => {
  const { ref, value, setValue } = useIMask({ mask: '+{7}(900)000-00-00' });

  useEffect(() => {
    if (phones[ix] !== undefined) {
      setValue(phones[ix].contact);
    } else {
      setValue(phones[0]?.contact ?? '');
    }
  }, [ix, phones, setValue]);

  return (
    <div data-id={ix}>
      <input
        id={`phone${ix !== undefined ? ix : ''}`}
        ref={ref as Ref<HTMLInputElement>}
        // onChange={(e: FormEvent<HTMLInputElement>) => {
        //   const newPhones = [...phones];
        //   if (newPhones[ix] !== undefined) {
        //     newPhones[ix].contact = value;
        //     setPhones(newPhones);
        //   } else {
        //     newPhones.push({ contact: value, info: '' });
        //     setPhones(newPhones);
        //   }
        //   setValue(e.currentTarget.value);
        // }}
        onInput={(e: FormEvent<HTMLInputElement>) => {
          const newPhones = [...phones];
          if (newPhones[ix] !== undefined) {
            newPhones[ix].contact = value;
            setPhones(newPhones);
          } else {
            newPhones.push({ contact: value, info: '' });
            setPhones(newPhones);
          }
          setValue(e.currentTarget.value);
        }}
        value={value}
        className={`${styles.contactInput}`}
        type="phone"
      />
      <input
        id={`phoneComment${ix !== undefined ? ix : ''}`}
        onChange={(e) => {
          const newPhones = [...phones];
          if (newPhones[ix] !== undefined) {
            newPhones[ix].info = e.target.value;
          } else {
            newPhones.push({ contact: '', info: e.target.value });
          }
          setPhones(newPhones);
        }}
        value={ix ? phones[ix].info : phones[0]?.info}
        className={`${styles.contactInput} ${styles.comment}`}
        type="text"
        name="text"
        placeholder="Комментарий"
      />
    </div>
  );
};
