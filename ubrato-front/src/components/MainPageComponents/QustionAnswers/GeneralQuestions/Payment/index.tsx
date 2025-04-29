import { FC } from "react";
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import { Link } from "react-router-dom";

const Payment: FC = () => {
    return (
        <div className={qstyles.container}>
            <p className={qstyles.startText}>В настоящее время действует промо-период, в течение которого никакая плата с исполнителей и заказчиков не взимается. Все правовые и финансовые условия работы на площадке закреплены в <Link className={`${qstyles.link}`} to="/rights?document=2">Пользовательском соглашении</Link>. Об окончании промо-периода и изменениях в Пользовательском соглашении все пользователи сайта будут оповещены заблаговременно.</p>
            <div className={qstyles.seeAlso}>
                <p className={qstyles.title}>Смотрите также:</p>
                <Link to='/faq?page=1&number=2#q1_2' className={`${qstyles.link} ${qstyles.ml20}`}>
                    Как зарегистрироваться на сайте Ubrato?
                </Link>
            </div>
        </div>
    );
}

export default Payment;
