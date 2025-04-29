import { OneTenderHeader } from '@/components/OneTenderComponents/OneTenderHeader/OneTenderHeader';
import { Switchero } from '@/components/OneTenderComponents/OneTenderSwitcher/OneTenderSwitcher';
import { FC, ReactNode, useEffect } from 'react';
import { useSwitchStore } from '@/store/switchStore';
import { OneTenderInfoView } from '@/components/OneTenderComponentsWrappedVIew/OneTenderInfoView/OneTenderInfoView';
import { useNavigate } from 'react-router-dom';

export const OneTenderPage: FC = () => {
  const testData = {
    id: 0,
    name: 'string',
    price: 0,
    is_contract_price: true,
    location: 'string',
    floor_space: 0,
    description:
      'string А также диаграммы связей набирают популярность среди определенных слоев населения, а значит, должны быть объективно рассмотрены соответствующими инстанциями. Прежде всего, существующая теория, в своём классическом представлении, допускает внедрение укрепления моральных ценностей. Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы могут быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок.',
    wishes: 'string',
    attachments: ['string'],
    services_groups: ['string'],
    services_types: ['string'],
    reception_start: '2024-04-08T22:48:30.145Z',
    reception_end: '2024-04-08T22:48:30.145Z',
    work_start: '2024-04-08T22:48:30.145Z',
    work_end: '2024-04-08T22:48:30.145Z',
    object_group_id: 'string',
    object_type_id: 'string',
    user_id: 'string',
    created_at: '2024-04-08T22:48:30.145Z',
    verified: true,
    active: true,
  };

  const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) navigate('/register')
    }, [navigate]);

  const { activeIndex } = useSwitchStore();

  let stack: ReactNode;

  switch (activeIndex) {
    case 0:
      stack = <OneTenderInfoView></OneTenderInfoView>;
      break;
    case 1:
      stack = <div>tt</div>;
      break;
    case 2:
      stack = <div>ee</div>;
      break;
    case 3:
      stack = <div>qweqwe</div>;
      break;
    default:
      stack = <div>No stack component found</div>;
  }

  return (
    <div>
      <OneTenderHeader
        status={testData.active}
        id={testData.id}
        name={testData.name}
      ></OneTenderHeader>
      <Switchero
        price={1}
        options={['Tender', 'Отклики', 'Вопросы и ответы', 'Доп. информация']}
        noticeKnocks={2}
        button_text={'Принять работу'}
      ></Switchero>
      {stack}
    </div>
  );
};
