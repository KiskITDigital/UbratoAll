import { FC, useEffect, useState } from 'react';
import style from './OneTenderAttachments.module.css';
import { downloadFile } from '@/api/updateAvatar';


type TenderAttachments = {
  attachment: Array<string>;
};

export const OneTenderAttachments: FC<TenderAttachments> = ({ attachment }) => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token ?? '')
  }, [])



  const downloadClickHandler = async (file: string) => {
    if (token) {
      await downloadFile(token, file);
    } else {
      console.error('Token is missing');
    }
  };


  return (
    <div className={style.block_main}>
      <p className={style.block_main_p}>Вложения:</p>
      {attachment?.map((obj, index) => (
        <p className={style.block_add_p} key={index}>

          <button onClick={() => downloadClickHandler(obj.split('private/')[1])}>
            <img src={obj} alt="" />
            Скачать файл {index + 1}<br />
            {obj.split('/').pop()}
          </button>
        </p>
      ))}

    </div>
  );
};

