import { WhatIs } from '@/components/MainPageComponents/QustionAnswers/GeneralQuestions/WhatIs/WhatIs';
import { QuestionT } from '../types/app';
import { HowToRegister } from '@/components/MainPageComponents/QustionAnswers/GeneralQuestions/HowToRegister/HowToRegister';
import Requirements from '@/components/MainPageComponents/QustionAnswers/GeneralQuestions/Requirements';
import Payment from '@/components/MainPageComponents/QustionAnswers/GeneralQuestions/Payment';
import Differences from '@/components/MainPageComponents/QustionAnswers/GeneralQuestions/Differences';
import CreateProfile from '@/components/MainPageComponents/QustionAnswers/ExecutorQuestions/CreateProfile';
import WhatOrders from '@/components/MainPageComponents/QustionAnswers/ExecutorQuestions/WhatOrders';
import CreateTender from '@/components/MainPageComponents/QustionAnswers/CustomerQuestions/CreateTender';
import FindAndChoose from '@/components/MainPageComponents/QustionAnswers/CustomerQuestions/FindAndChoose';
import Services from '@/components/MainPageComponents/QustionAnswers/CustomerQuestions/Services';
import WhatObjects from '@/components/MainPageComponents/QustionAnswers/CustomerQuestions/WhatObjects';
import RespondTender from '@/components/MainPageComponents/QustionAnswers/ExecutorQuestions/RespondTender';
import HowToBecomeExecutor from '@/components/MainPageComponents/QustionAnswers/ExecutorQuestions/HowToBecomeExecutor';
import HowToBecomeCustomer from '@/components/MainPageComponents/QustionAnswers/CustomerQuestions/HowToBecomeCustomer';

export const generalQuestions: QuestionT[] = [
  {
    title: 'Что такое Ubrato?',
    textComponent: <WhatIs />,
  },
  {
    title: 'Как зарегистрироваться на сайте Ubrato?',
    textComponent: <HowToRegister />,
  },
  {
    title: 'Какие требования предъявляются на Ubrato к заказчикам и исполнителям при регистрации?',
    textComponent: (
      <div style={{ marginTop: '30px' }}>
        <Requirements />
      </div>
    ),
  },
  {
    title: 'Взимает ли Ubrato плату с пользователей?',
    textComponent: <Payment />,
  },
  {
    title: 'В чем отличия Ubrato от других агрегаторов и электронных торговых площадок?',
    textComponent: <Differences />,
  },
];

export const executorQustions: QuestionT[] = [
  {
    title: 'Как стать исполнителем?',
    textComponent: <HowToBecomeExecutor />,
  },
  {
    title: 'Как и зачем оформлять профиль и портфолио?',
    textComponent: <CreateProfile />,
  },
  {
    title: 'Заказы на какие услуги можно получить на Ubrato?',
    textComponent: <WhatOrders />,
  },
  {
    title: 'Как откликнуться на тендер?',
    textComponent: <RespondTender />,
  },
];

export const ordererQustions: QuestionT[] = [
  {
    title: 'Как стать заказчиком?',
    textComponent: <HowToBecomeCustomer />,
  },
  {
    title: 'Какие услуги можно заказать на Ubrato?',
    textComponent: <Services />,
  },
  {
    title: 'Клининг каких объектов можно заказать на Ubrato?',
    textComponent: <WhatObjects />,
  },
  {
    title: 'Как создать тендер?',
    textComponent: <CreateTender />,
  },
  {
    title: 'Как найти и выбрать исполнителя?',
    textComponent: <FindAndChoose />,
  },
];
