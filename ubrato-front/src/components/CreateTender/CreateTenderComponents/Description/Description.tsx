import { FC, forwardRef } from "react";
import styles from '../../CreateTender.module.css'
import { useCreateTenderState } from "@/store/createTenderStore";

const Description: FC<{ ref?: React.LegacyRef<HTMLDivElement>; }> = forwardRef<HTMLDivElement, { ref?: React.LegacyRef<HTMLDivElement>; }>((_, ref) => {
    const createTenderState = useCreateTenderState()

    return (
        <div ref={ref} className={`${styles.section} ${styles.description}`}>
            <div className={`${styles.section__block}`}>
                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Описание тендера:</p>
                <textarea
                    // onClick={(e) => e.stopPropagation()}
                    // onFocus={() => createTenderState.removeError('description')}
                    // onBlur={() => !createTenderState.description && createTenderState.addError('description')}
                    value={createTenderState.description}
                    onChange={(e) => createTenderState.handleSimpleInput('description', e.currentTarget.value)}
                    name="" id="" rows={5}
                    className={`${styles.input} ${styles.description__textarea} ${createTenderState.errors.includes('description') ? styles.inputError : ''}`}
                ></textarea>
                {createTenderState.errors.includes('description') && <p className={`${styles.inputErrorText} ${styles.textAreaError}`}>Обязательно для заполнения</p>}
            </div>
        </div>
    );
})

export default Description;