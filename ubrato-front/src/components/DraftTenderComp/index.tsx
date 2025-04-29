import { FC, useEffect, useState } from 'react';
import s from './style.module.css'
import { fetchDrafts } from '@/api/getTender';
import { TenderListElem } from '../TenderListComponents/TenderListElement/inedx';

export const DraftTenderComponent: FC = () => {
  const [drafts, setDrafts] = useState([])
  useEffect(() => {
    const fetchDraftsAsync = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetchDrafts(token);
        setDrafts(res);
        // console.log(res);

      } catch (error) {
        // console.log('');
      }
    };
    fetchDraftsAsync();
  }, [])

  return (
    <div className={s.draft_tender_container}>

      {drafts?.length > 0 && (
        drafts.map((tender) => (
          <TenderListElem hit={tender}></TenderListElem>
        ))
      )}
    </div>
  );
};
