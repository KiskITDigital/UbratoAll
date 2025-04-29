import { FC } from 'react';
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import { Link } from "react-router-dom";


const Services: FC = () => {
    return (
        <div className={qstyles.container}>
            <p className={qstyles.startText}>На сайте Ubrato зарегистрированы исполнители клининговых и смежных услуг. В <span className={`${qstyles.link}`}>каталоге</span> представлены более 100 услуг, объединенных в 17 видов: </p>
            <ul className={qstyles.mb20}>
                <li className={qstyles.li}>Вывоз (например, вывоз отходов мусора, снега);</li>
                <li className={qstyles.li}>Дезинсекция насекомых;</li>
                <li className={qstyles.li}>Дезинфекция;</li>
                <li className={qstyles.li}>Дератизация;</li>
                <li className={qstyles.li}>Замена оборудования и инвентаря;</li>
                <li className={qstyles.li}>Комплексное обслуживание;</li>
                <li className={qstyles.li}>Мойка (например, мойка фасадов, вывесок, оборудования, инвентаря);</li>
                <li className={qstyles.li}>Мытье (например, мытье посуды, оборудования);</li>
                <li className={qstyles.li}>Очистка (например. очистка от пыли, очистка улиц от снега и льда);</li>
                <li className={qstyles.li}>Полировка и укреплений покрытий;</li>
                <li className={qstyles.li}>Поставка товаров и расходных материалов;</li>
                <li className={qstyles.li}>Предоставление персонала для клининга;</li>
                <li className={qstyles.li}>Промышленный альпинизм;</li>
                <li className={qstyles.li}>Уборка влажная, генеральная, поддерживающая, уборка снега, уборка мусора;</li>
                <li className={qstyles.li}>Услуги прачечной;</li>
                <li className={qstyles.li}>Химчистка (например, химчистка ковров, ковролина, мебели);</li>
                <li className={qstyles.li}>Чистка (например, чистка напольных покрытий, система защиты от грязи, мебели, оборудования).</li>
            </ul>
            <p className={qstyles.text}>При создании тендерной заявки можно выбрать несколько значений необходимых услуг.</p>
            <div className={qstyles.seeAlso}>
                <p className={qstyles.title}>Смотрите также:</p>
                <Link to='/faq?page=3&number=4#q3_4' className={`${qstyles.link} ${qstyles.ml20}`}>
                    Как создать тендер?
                </Link>
                <Link to='/faq?page=3&number=5#q3_5' className={`${qstyles.link} ${qstyles.ml20}`} >
                    Как найти и выбрать исполнителя?
                </Link>
            </div>
        </div>
    );
}

export default Services;
