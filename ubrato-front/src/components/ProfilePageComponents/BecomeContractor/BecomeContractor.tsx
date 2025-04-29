import { FC, useEffect, useState } from 'react';
import styles from './becomecontractor.module.css';
import { useUserInfoStore } from '@/store/userInfoStore';
import { Link, useNavigate } from 'react-router-dom';

export const BecomeContractor: FC = () => {
  const userStore = useUserInfoStore();

  const navigate = useNavigate();

  const [isRequestModerating, setIsRequestModerating] = useState(false);

  useEffect(() => {
    if (userStore.user.is_contractor) {
      navigate('..');
    }
  }, [navigate, userStore.user.is_contractor]);

  return (
    <div className="relative">
      <div className="relative px-4 py-4">
        <div
          className={`${
            isRequestModerating
              ? 'backdrop-blur w-[calc(100%+20px)] h-full absolute top-0 left-0'
              : 'hidden'
          }`}
        ></div>
        <h1 className={styles.header}>Стать исполнителем</h1>
        <p className="text-base ">
          Чтобы зарегистрировать компанию в роли исполнителя, необходимо наличие действующего
          юридического лица с видом деятельности, относящемся к клинингу или к смежным услугам.{' '}
          <Link className="text-accent" to="/#q3_1">
            Узнать подробнее.
          </Link>
        </p>
        <p className="text-base mt-[15px]">
          Проверьте актуальность документов компании в разделе “
          <Link className="text-accent" to="/docs">
            Документы
          </Link>
          ”. При необходимости заново загрузите выписку из ЕГРЮЛ, приказ о назначении генерального
          директора, карточку и устав компании.
        </p>
        <p className="text-base mt-[15px]">
          Затем отправьте заявку на регистрацию компании в роли исполнителя.
        </p>
        <button
          onClick={() => setIsRequestModerating(true)}
          className="w-full bg-accent text-white text-base mt-[20px] py-[14px] rounded-[13px]"
        >
          Стать исполнителем
        </button>
        <p className="mt-[20px]">
          После регистрации в роли исполнителя компания получит возможность:
        </p>
        <ul className="mt-[20px] pl-[20px]">
          <li className="list-disc">Создать портфолио</li>
          <li className="list-disc">Искать тендеры и откликаться на них</li>
          <li className="list-disc">Оставлять отзывы о заказчиках и ставить им оценку</li>
        </ul>
      </div>
      {isRequestModerating && (
        <div className="p-5 rounded-[20px] absolute top-[96px] left-[86px] bg-white flex flex-col">
          <p className="text-[28px] font-bold">Ваша заявка находится на модерации</p>
          <p className="bg-light-gray text-base py-3 px-[14px] mt-[20px] rounded-[14px] flex gap-[10px]">
            <img src="/info-blue-ic.svg" alt="" />
            Сейчас ваша заявка на статус исполнителя находится на модерации, решение по вашей заявке
            придет вам в раздел уведомления!
          </p>
          <div className="flex gap-4 self-center mt-[20px]">
            <Link
              className="bg-light-gray text-[#666] text-center w-[200px] py-3 rounded-[17px]"
              to="../documents"
            >
              Документы
            </Link>
            <Link
              className="bg-accent text-white text-center w-[200px] py-3 rounded-[17px]"
              to="../notifications"
            >
              Уведомления
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
