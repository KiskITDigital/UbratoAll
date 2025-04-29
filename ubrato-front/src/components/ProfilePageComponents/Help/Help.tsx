import { FC, useEffect } from 'react';
import styles from './help.module.css';
import ContactModal from "@/components/Modal/ContactModal";

export const Help: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h2 className={styles.header}>Помощь</h2>
      <ContactModal />
    </div>
  );
};
