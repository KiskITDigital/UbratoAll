import { FC, useEffect, useState } from 'react';
import styles from './fileinput.module.css';
import {
  sendDoc,
  // sendDoc,
  updateToken, uploadFile
} from '@/api';
import { FileInfo } from '../FileInfo/FileInfo';
import { useProfileDocumentsStore } from '@/store/profileDocumentsStore';

interface FileInputProps {
  header: string;
  id: string;
  type: number;
  link?: string;
  idFile?: string;
}

export const FileInput: FC<FileInputProps> = ({ header, type, id, link, idFile }) => {
  const fetchDocuments = useProfileDocumentsStore();

  const [error, setError] = useState('');
  // const [newLink, setNewLink] = useState<string>();
  const [newIdFile, setNewIdFile] = useState(idFile ?? '');
  return (
    <div className={styles.fileContainer}>
      <div>
        <h3 className={styles.fileHeader}>{header}</h3>
        <p className={styles.fileText}>
          Форматы: pdf, jpg, png, размер одного файла не должен превышать 5 Мб.
        </p>
        <label className={styles.label} htmlFor={id}>
          <input
            disabled={Boolean(link)}
            onChange={(e) => {
              // console.log(e.target.files);
              if (
                ['image/png', 'image/jpeg', 'application/pdf'].includes(
                  e.target.files![0].type
                )
              ) {
                const parameters = { file: e.target.files![0], private: true };
                (async () => {
                  const link = await updateToken<string, { file: File; private: boolean }>(
                    uploadFile,
                    parameters
                  );
                  // setNewLink(link);
                  const res = await updateToken<string, { link: string; type: number }>(sendDoc, {
                    link: link,
                    type: type,
                  });
                  setNewIdFile(res);
                  fetchDocuments.fetchDocuments();
                })();
              } else {
                setError('Неверный тип файла');
                e.target.value = '';
                // console.log(e.target.files);
              }
            }}
            className={styles.inputFile}
            type="file"
            name={id}
            id={id}
            accept="image/png, image/jpeg, application/pdf, text/xml"
          />
          <div className={`${styles.fileBtn} ${Boolean(link) && "hidden"}`}>Загрузить</div>
          {error && <p className={styles.error}>{error}</p>}
        </label>
      </div>
      {link && <FileInfo link={link} id={newIdFile} />}
      {/* {newLink && !link && <FileInfo link={newLink} id={newIdFile} />} */}
    </div>
  );
};
