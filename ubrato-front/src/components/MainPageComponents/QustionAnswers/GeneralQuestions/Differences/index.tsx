import { FC } from "react";
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import { Link } from "react-router-dom";

const Differences: FC = () => {
    
    return (
        <div className={qstyles.container}>
            <p className={`${qstyles.mt30} ${qstyles.startText}`}>Ubrato — это специализированная площадка для заказчиков и исполнителей клининговых услуг.</p>
            <p className={qstyles.title}>Надежность контрагентов</p>
            <p className={`${qstyles.text} ${qstyles.ml20}`}>На сайте представлены реальные действующие юридические лица.</p>
            <p className={`${qstyles.text} ${qstyles.ml20}`}>Администрация Ubrato проводит оценку надежности заказчиков и исполнителей.</p>
            <p className={`${qstyles.text} ${qstyles.ml20}`}>Пользователи сайта выставляют оценки партнерам в рейтинговой системе сайта и оставляют отзывы по итогам выполнения работ.</p>
            <p className={qstyles.title}>Прямое предложение о партнерстве</p>
            <p className={`${qstyles.text} ${qstyles.ml20}`}>Заказчик может найти потенциальных исполнителей и предложить им участие в тендере.</p>
            <p className={qstyles.title}>Заключение сделки на договорных условиях</p>
            <p className={`${qstyles.text} ${qstyles.ml20}`}>Заказчик может определить победителя тендера, исходя из своих предпочтений по стоимости, рейтингу, надежности и другим критериям.</p>
            <p className={`${qstyles.text} ${qstyles.ml20}`}>Исполнитель после получения уведомления о победе в тендере может обсудить с заказчиком условия договора и принять решение о сотрудничестве.</p>
            <p className={`${qstyles.text} ${qstyles.ml20}`}>Сайт Ubrato — это площадка для коммерческих организаций.
                Обязательства по федеральным законам N44 “О контрактной системе в сфере закупок товаров, работ, услуг для обеспечения государственных и муниципальных нужд” и N223 «О закупках товаров, работ, услуг отдельными видами юридических лиц» на заключаемые тендеры не распространяется.
            </p>
            <div className={qstyles.seeAlso}>
                <p className={qstyles.title}>Смотрите также:</p>
                <Link to='/faq?page=3&number=5#q3_5' className={`${qstyles.link} ${qstyles.ml20}`}>
                    Как найти и выбрать исполнителя?
                </Link>
                <Link to="/rights?document=1" className={qstyles.link}>Правовая информация</Link>
            </div>
        </div>
    );
}

export default Differences;
