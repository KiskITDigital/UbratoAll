/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, forwardRef, useRef } from "react";
import styles from '../../CreateTender.module.css'
import cleaningTZStyles from './cleaning-tz.module.css'
import { useCreateTenderState } from "@/store/createTenderStore";
import { formatFileSize } from "../../funcs";

const CleaningTZ: FC<{ ref?: React.LegacyRef<HTMLDivElement>; }> = forwardRef<HTMLDivElement, { ref?: React.LegacyRef<HTMLDivElement>; }>((_, ref) => {

  const inputFileRef = useRef<HTMLInputElement>(null);
  const createTenderState = useCreateTenderState()
  const handleButtonFileClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  return (
    <div ref={ref} className={`${styles.section} ${styles.cleaningTZ}`}>
      <div className={`${styles.section__block}`}>
        <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>ТЗ на уборку:</p>
        {
          createTenderState.cleaningTZ &&
          <p className={`${styles.textMedium} ${styles.cleaningTZText}`}>{createTenderState.cleaningTZ.fileName}<span className={styles.textGray}>, {formatFileSize(createTenderState.cleaningTZ.fileSize)}</span></p>
        }
        <button onClick={() => {
          createTenderState.removeError('tz')
        }} className={`${styles.textRegular} ${createTenderState.errors.includes('tz') ? cleaningTZStyles.cleaningTZError : ''}`}>
          {
            createTenderState.cleaningTZ ?
              <img className={styles.removeTZ}
                src='/create-tender/create-tender-remove-attachment.svg'
                alt=""
                onClick={() => {
                  createTenderState.removeCleaningTZ()
                  if (inputFileRef.current)
                    inputFileRef.current.value = ""
                }}
              />
              :
              <div className="flex gap-5 cursor-default">
                <div className="flex items-center gap-2 bg-[--color-light-gray-secondary] px-3 h-[34px] rounded-[10px] cursor-pointer" onClick={handleButtonFileClick}>
                  <img src="/create-tender/create-tender-plus.svg" alt="plus" />
                  Загрузить
                </div>
                <div className="flex gap-[10px] bg-[--color-light-gray-secondary] p-3 rounded-[14px] text-start text-[16px]">
                  <img src="/info-blue-ic.svg" alt="i" className="size-4 min-w-4 my-[2px]" />
                  <p className=" leading-tight cursor-text select-text">
                    Загрузите файл с техническим заданием на уборку объекта в форматах doc, docx, xls, xlsx, jpg или pdf. Допустимый размер файла — 10 Мб.
                  </p>
                </div>
              </div>
          }
        </button>
        {createTenderState.errors.includes('tz') && <p className={`${styles.inputErrorText} ${cleaningTZStyles.cleaningTZErrorText}`}>Обязательно для заполнения</p>}
        <input
          type="file"
          multiple
          accept=".doc,.docx,.xls,.jpg,.pdf"
          onChange={(e) => {
            if (e.target.files) {
              if (e.target.files[0].size > 10485760)
                alert("Недопустимый формат или размер файла.")
              else
                createTenderState.handleFileUpload(e, null, 'upload-tz')
            }
          }}
          ref={inputFileRef}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
})

export default CleaningTZ;