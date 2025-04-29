import { FC, useEffect, useState } from 'react';
import styles from './portfolioform.module.css';
import { updateToken, uploadFile, fetchFileInfo, postPortfolio, putPortfolio } from '@/api';

export const PortfolioForm: FC<{
  close: () => void;
  setPortfolio: (e: {
    id: string;
    name: string;
    description: string;
    links: string[];
    selected: boolean;
  }) => void;
  setPortfolioList: (e: {
    id: string;
    name: string;
    description: string;
    links: string[];
    selected: boolean;
  }) => void;
  data?: { id: string; name: string; description: string; links: string[] };
}> = ({ data, setPortfolio, close, setPortfolioList }) => {
  const [newName, setNewName] = useState(data?.name ?? '');
  const [newDescription, setNewDescription] = useState(data?.description ?? '');
  const [newLinks, setNewLinks] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [linksInfo, setLinksInfo] = useState<
    {
      name: string;
      format: string;
    }[]
  >([]);

  useEffect(() => {
    if (data) {
      setNewLinks([...data.links]);
      (async () => {
        const newLinksInfo: {
          name: string;
          format: string;
        }[] = [];
        for (const e of data.links) {
          const fileInfo = await fetchFileInfo(e);
          newLinksInfo.push({ name: fileInfo.name, format: fileInfo.format });
          setLinksInfo([...newLinksInfo]);
        }
      })();
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <p className={styles.header}>Добавить портфолио</p>
        <p className={styles.subHeader}>Название:</p>
        <input
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
          name="header"
          className={styles.input}
          type="text"
        />
        <p className={styles.subHeader}>Описание:</p>
        <input
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          name="description"
          className={styles.input}
          type="text"
        />
        <p className={styles.subHeader}>Вложения:</p>
        <div className={styles.filesList}>
          <label htmlFor="portfolioFile">
            <input
              className={styles.inputFile}
              onChange={(e) => {
                // console.log(e.target.files);
                if (
                  ['image/png', 'image/jpeg', 'application/pdf'].includes(e.target.files![0].type)
                ) {
                  if (e.target.files !== null) {
                    if (e.target.files.length <= 8 - newLinks.length) {
                      setError('');
                      (async () => {
                        const newNewLinks: string[] = [];
                        const newLinksInfo: { name: string; format: string }[] = [];
                        for (const i of e.target.files!) {
                          const parameters = { file: i, private: false };
                          const link = await updateToken<string, { file: File; private: boolean }>(
                            uploadFile,
                            parameters
                          );

                          const fileInfo = await fetchFileInfo(link);
                          newLinksInfo.push({ name: fileInfo.name, format: fileInfo.format });
                          newNewLinks.push(link);
                          setLinksInfo(newLinksInfo);
                        }
                        setNewLinks([...newLinks, ...newNewLinks]);
                        setLinksInfo([...linksInfo, ...newLinksInfo]);
                      })();
                    } else {
                      setError('Слишком много файлов');
                    }
                  }
                } else {
                  setError('Неверный тип файла');
                  e.target.value = '';
                  // console.log(e.target.files);
                }
              }}
              id="portfolioFile"
              name="portfolioFile"
              type="file"
              multiple={true}
              accept="image/png, image/jpeg, application/pdf"
            />
            {newLinks.length < 8 && (
              <div className={styles.realInput}>
                <img src="/x-icon.svg" alt="" />
                <p>Добавить вложения (до {8 - newLinks.length} шт.)</p>
              </div>
            )}
          </label>

          {linksInfo?.map((e, ix) => (
            <div className={styles.file} key={ix}>
              {e.name.split('.')[1]}
              {e.format}
              <button
                onClick={(e) => {
                  const name = e.currentTarget.parentElement?.innerText;
                  const newNewLinks = newLinks.filter((i) => !i.includes(name!));
                  // console.log(linksInfo);
                  const newLinksInfo = linksInfo.filter(
                    (i) => !i.name.includes(name!.split('.')[0])
                  );
                  // console.log(newLinksInfo);
                  setNewLinks(newNewLinks);
                  setLinksInfo(newLinksInfo);
                }}
              >
                <img src="/x-icon.svg" alt="" />
              </button>
            </div>
          ))}
        </div>
        <p>{error}</p>
        <div className={styles.infoBorder}>
          <div className={styles.infoContainer}>
            <img src="/info-blue-ic.svg" alt="" />
            <p className={styles.infoText}>
              Разместите фотографии с примерами работ вашей компании и напишите описание. Форматы:
              pdf, jpg, png, размер одного файла не должен превышать 5 Мб.
            </p>
          </div>
        </div>
        <button
          className={styles.btn}
          onClick={() => {
            (async () => {
              if (data) {
                await updateToken(putPortfolio, {
                  id: data.id,
                  params: {
                    name: newName,
                    description: newDescription,
                    imgs: newLinks,
                  },
                });
                setPortfolioList({
                  id: data.id,
                  name: newName,
                  description: newDescription,
                  links: newLinks,
                  selected: false,
                });
                close();
              } else {
                const res = await updateToken(postPortfolio, {
                  name: newName,
                  description: newDescription,
                  imgs: newLinks,
                });
                setPortfolio({
                  id: res,
                  name: newName,
                  description: newDescription,
                  links: newLinks,
                  selected: false,
                });
                close();
              }
            })();
          }}
        >
          {data ? 'Изменить' : 'Добавить'}
        </button>
      </div>
    </div>
  );
};
