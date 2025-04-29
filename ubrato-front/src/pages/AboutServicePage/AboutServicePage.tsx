import { FC, useEffect, useRef } from 'react';
// import { 
//   MainBanner,
//   ExecutorsCatalog,
//   NewsBlock,
//   QuestionsBlock,
//   Seo,
// } from '@/components';
import { AboutHeader } from '@/components/AboutComponents/AboutHeader';
import { AboutDeveloping } from '@/components/AboutComponents/AboutDeveloping';
import { AboutTasks } from '@/components/AboutComponents/AboutTasks';
import { AboutOpportunities } from '@/components/AboutComponents/AboutOpportunities';
import { AboutUtils } from '@/components/AboutComponents/AboutUtil';
import { Link, useLocation } from 'react-router-dom';

export const AboutServicePage: FC = () => {
  const location = useLocation()

  const startRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 300, behavior: "smooth" });
    }, 0);
  }, [location.state]);

  return (
    <div ref={startRef} className="flex flex-col gap-20">
      <AboutHeader />
      <AboutDeveloping />
      <AboutTasks />
      <AboutOpportunities />
      <AboutUtils />
      <section className="flex flex-col w-full items-center">
        <div className="max-w-[1130px] w-full flex flex-col gap-10 text-center">
          <h2 className="font-bold text-[46px]">Присоединяйтесь к <span className="text-accent">Ubrato!</span></h2>
          <p className="text-2xl">Еще не зарегистрированы? <Link className="text-accent underline" to="/registration">Зарегистрироваться</Link></p>
        </div>
      </section>
    </div>
  );
};
