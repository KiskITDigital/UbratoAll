import { FC } from "react";
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';

import { Link } from "react-router-dom";

const CreateTender: FC = () => {
    return (
        <div className={`${qstyles.container}`}>
            <ul className={`${qstyles.mb20} ${qstyles.mt20}`}>
                <li className={qstyles.li}><Link className={qstyles.link} to="/register">Авторизуйтесь</Link> на сайте Ubrato;</li>
                <li className={qstyles.li}>Подготовьте необходимую информацию об объекте, датах и времени, когда вашей компании нужна услуга, сформулируйте критерии, по которым будете принимать работу. От полноты и точности этой информации будет зависеть количество и “качество” откликов;</li>
                <li className={qstyles.li}>Перейдите в меню по ссылке “<Link className={qstyles.link} to="/create-tender">Создать тендер</Link>”;</li>
                <li className={qstyles.li}>Создайте заявку на тендер: укажите даты, когда нужен клининг, название населенного пункта и объект, где нужен клининг, описание необходимых услуг, стоимость (ваш бюджет) и другие параметры. По этим данным ваш тендер будут искать исполнители;</li>
                <li className={qstyles.li}>При необходимости сохраните заявку в статусе “Черновика”;</li>
                <li className={qstyles.li}>Отправьте заявку на модерацию. Она будет рассмотрена и опубликована в течение суток с момента отправки. Если у администрации сайта будут уточняющие вопросы по тендеру, мы свяжемся с вами;</li>
                <li className={qstyles.li}>Опубликованный тендер будет доступен вам на странице “Мои тендеры”. Следите там за откликами исполнителей.</li>
            </ul>
            <p className={qstyles.text}>На любом этапе вы можете <Link className={qstyles.link} to="/">задать вопрос</Link> администрации Ubrato.</p>
            <div className={qstyles.seeAlso}>
                <p className={qstyles.title}>Смотрите также:</p>
                <Link to='/faq?page=3&number=5#q3_5' className={`${qstyles.link} ${qstyles.ml20}`}>
                    Как найти и выбрать исполнителя?
                </Link>
            </div>
        </div>
    );
}

export default CreateTender;
