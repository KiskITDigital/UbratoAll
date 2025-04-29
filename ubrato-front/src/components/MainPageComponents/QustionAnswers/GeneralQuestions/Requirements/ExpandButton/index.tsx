import { FC } from "react";
import styles from './ExpandButton.module.css';

export const ExpandButton: FC<{ isActive?: boolean }> = ({ isActive }) => {
    return (
        <img
            className={`${styles.image} ${isActive ? styles.active : ''}`}
            src="./arrow-down.svg"
            alt="arrow"
        />
    );
};