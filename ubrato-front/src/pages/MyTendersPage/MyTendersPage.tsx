import { FC, useEffect, useRef, useState } from 'react';
import s from './styles.module.css';
import { TenderListComp } from '@/components/TenderListComponents/TenderListComponents';
// import { TenderListCustomSearch } from '@/components/TenderListComponents/TenderListCustomSearch';
import { useNavigate, useNavigationType } from 'react-router-dom';
import { useUserInfoStore } from '@/store/userInfoStore';
// import { set } from "date-fns";
import { DraftTenderComponent } from '@/components/DraftTenderComp';
import { TenderListCustomSearch } from '@/components/TenderListComponents/TenderListCustomSearch';

export const MyTendersPage: FC = () => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const userInfoStore = useUserInfoStore();
  const [draftSwitch, setDraftSwitch] = useState(false);

  const startRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!userInfoStore.isLoggedIn) {
      if (navigationType === 'POP') navigate(-1);
      else navigate('/login');
    }
  }, [navigate, navigationType, userInfoStore.isLoggedIn]);

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 300, behavior: 'smooth' });
    }, 0);
  }, []);

  return (
    <div ref={startRef} className={s.main_blokkk}>
      <h1 className={s.title}>Мои тендеры</h1>
      <TenderListCustomSearch />
      <p onClick={() => setDraftSwitch(!draftSwitch)} className="cursor-pointer">
        {draftSwitch ? 'Открыть созданные тендеры' : 'Открыть черновики'}
      </p>
      {!draftSwitch ? <TenderListComp myTender={true} /> : <DraftTenderComponent />}
      {/* <TenderListComp myTender={true}></TenderListComp> */}
    </div>
  );
};
