import { FC, useEffect, useRef } from 'react';
import {
  MainBanner,
  ExecutorsCatalog,
  NewsBlock,
  QuestionsBlock,
  Seo,
  Opportunities,
  HowToFind,
  TendersAdvice
} from '@/components';
import { useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';

export const HomePage: FC = () => {
  const location = useLocation()

  const toRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (location.state && location.state.to && toRef.current) {
      toRef.current!.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        const elementTop = toRef.current!.getBoundingClientRect().top;
        window.scrollBy({ top: elementTop - 100, behavior: "smooth" });
      }, 0);
    }
  }, [location.state]);

  return (
    <div>
      {/* <Link to="/faq?page=1&number=1#q1">questions</Link>
      <Link to="/faq?page=1&number=2#q2">questions2</Link>
      <Link to="/faq?page=1&number=3#q3">questions3</Link>
      <Link to="/faq">questions3</Link>
      <Link to="#q2">123</Link> */}
      <MainBanner />
      <span ref={location.state && location.state.to === "catalog" ? toRef : undefined}></span>
      <ExecutorsCatalog />
      <Opportunities />
      <HowToFind />
      <TendersAdvice />
      <NewsBlock />
      <span ref={location.state && location.state.to === "questions" ? toRef : undefined}></span>
      <QuestionsBlock />
      <Seo />
    </div>
  );
};
