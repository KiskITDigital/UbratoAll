import { FC } from "react";
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import { Link } from "react-router-dom";

const FindAndChoose: FC = () => {

    return (
        <div className={qstyles.container}>
            <p className={qstyles.startText}>На Ubrato есть два способа поиска исполнителя услуг:</p>
            <p className={qstyles.title}>1. Поиск среди исполнителей, откликнувшихся на тендер</p>
            <ul className={qstyles.mb20}>
                <li className={qstyles.li}>Перейдите в меню по ссылке “<Link className={qstyles.link} to="/create-tender">Создать тендер</Link>” и создайте заявку на тендер;</li>
                <li className={qstyles.li}>Отправьте заявку на модерацию и дождитесь публикации тендера;</li>
                <li className={qstyles.li}>На странице “<Link className={qstyles.link} to="/alltenders">Мои тендеры</Link>” кликните на количество откликов в строке тендера, перейдите в список откликов;</li>
                <li className={qstyles.li}>Сравните отклики по параметрам цены, рейтинга и надежности;</li>
                <li className={qstyles.li}>Выберите победителя, нажав на кнопку “Выбрать победителем”;</li>
                <li className={qstyles.li}>Заключите с победителем договор на оказание услуг.</li>
            </ul>
            <p className={qstyles.title}>2. Поиск исполнителей в каталоге</p>
            <ul>
                <li className={qstyles.li}>Перейдите в меню по ссылке “<Link className={qstyles.link} to="/create-tender">Создать тендер</Link>” и создайте заявку на тендер;</li>
                <li className={qstyles.li}>Отправьте заявку на модерацию и дождитесь публикации тендера;</li>
                <li className={qstyles.li}>На странице “<Link className={qstyles.link} to="/find-executor" >Найти исполнителя</Link>” отфильтруйте исполнителей по вашим требованиям, например, тип объекта или вид услуги;</li>
                <li className={qstyles.li}>Изучите профили исполнителей;</li>
                <li className={qstyles.li}>Предложите тендер потенциальным исполнителям, нажав на кнопку “Предложить тендер”;</li>
                <li className={qstyles.li}>Сравните отклики по параметрам цены, рейтинга и надежности;</li>
                <li className={qstyles.li}>Заключите с победителем договор на оказание услуг.</li>
            </ul>
            <div className={qstyles.seeAlso}>
                <p className={qstyles.title}>Смотрите также:</p>
                <Link to='/faq?page=3&number=4#q3_4' className={`${qstyles.link} ${qstyles.ml20}`}>
                    Как создать тендер?
                </Link>
            </div>
        </div>
    );
}

export default FindAndChoose;
