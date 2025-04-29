import React, { useRef, useEffect, FC } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.css'

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const Modal: FC<ModalProps> = ({ children, isOpen }) => {
  if (isOpen)
    return createPortal(<div className={styles.modal}>{children}</div>, document.body);
  else
    return null
};

export default Modal;