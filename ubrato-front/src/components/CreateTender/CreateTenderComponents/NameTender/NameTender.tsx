import React, { forwardRef } from 'react';

import styles from '../../CreateTender.module.css'
import { useCreateTenderState } from '@/store/createTenderStore';

const NameTender: React.FC<{
    ref?: React.LegacyRef<HTMLDivElement>;
}> = forwardRef<HTMLDivElement, {
    ref?: React.LegacyRef<HTMLDivElement>;
}>((_, ref) => {
    const createTenderState = useCreateTenderState();

    return (
        <div ref={ref} className={`${styles.nameTender}`}>
            <label className={`${styles.nameTender__label} ${styles.textBlack60} ${styles.textRegular}`}>
                Название тендера:
            </label>
            <input
                // onClick={(e) => e.stopPropagation()}
                onFocus={() => createTenderState.removeError('name')}
                onBlur={() => !createTenderState.name && createTenderState.addError('name')}
                type="text"
                className={`${styles.nameTender__input} ${styles.input} ${createTenderState.errors.includes('name') ? styles.inputError : ''}`}
                value={createTenderState.name}
                onChange={(e) => createTenderState.handleSimpleInput("name", e.currentTarget.value)}
            />
            {createTenderState.errors.includes('name') && (
                <p className={`${styles.inputErrorText} ${styles.inputErrorTextName} ${styles.inputErrorTenderName}`}>
                    Обязательно для заполнения
                </p>
            )}
        </div>
    );
});

export default NameTender;
