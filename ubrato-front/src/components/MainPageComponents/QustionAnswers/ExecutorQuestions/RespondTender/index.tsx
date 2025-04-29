import { FC } from "react";
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import { Link } from "react-router-dom";

const RespondTender: FC = () => {

    return (
        <div className={qstyles.container}>
            <ul className={qstyles.mt20}>
                <li className={qstyles.li}>На странице <Link to="/alltenders" className={qstyles.link}>“Найти тендер”</Link> отфильтруйте тендеры по параметрам, соответствующим профилю и возможностям вашей компании. Использование фильтров обеспечит выдачу точных результатов.</li>
                <li className={qstyles.li}>Ознакомьтесь с условиями тендера.</li>
                <li className={qstyles.li}>При необходимости задайте заказчику вопросы в карточке тендера во вкладке "Вопросы и ответы".</li>
                <li className={qstyles.li}>Нажмите на кнопку “Откликнуться на тендер”.</li>
                <li className={qstyles.li}>Во всплывающем окне укажите свою стоимость или согласитесь со стоимостью заказчика. Нажмите на кнопку “Откликнуться на тендер”.</li>
                <li className={qstyles.li}>Победитель тендера будет выбран заказчиком после окончания периода приема откликов.</li>
            </ul>
            <div className={qstyles.seeAlso}>
                <p className={qstyles.title}>Смотрите также:</p>
                <Link to='/faq?page=2&number=1#q2_1' className={`${qstyles.link} ${qstyles.ml20}`}>
                    Как стать исполнителем?
                </Link>
            </div>
        </div>
    );
}

export default RespondTender;
