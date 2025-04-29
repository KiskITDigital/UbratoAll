import { FC } from "react";
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import { Link } from "react-router-dom";


const CreateProfile: FC = () => {

    return (
        <div className={qstyles.container}>
            <p className={`${qstyles.startText}`}>Сайт Ubrato дает исполнителям клининговых услуг возможность расширить свою клиентскую базу, увеличить географию и объемы продаж. Ubrato — это не только тендерная площадка, но и “витрина” для компаний-исполнителей.</p>
            <p className={`${qstyles.text}`}>Зайдите в личный кабинет и заполните ваш профиль. Расскажите об услугах, выполняемых вашей компанией, перечислите регионы и объекты, где работают ваши сотрудники, отметьте преимущества и уникальные возможности. Зайдите в личный кабинет и перейдите во вкладку “<Link className={qstyles.link} to="/">Портфолио</Link>”. Разместите описание вашей компании и фотографии с примерами работ. Эту презентацию увидят заказчики, когда будут искать исполнителя. Чем информативнее вы сделаете презентацию, тем больше вероятность получения заказов.</p>
            <div className={qstyles.seeAlso}>
                <p className={qstyles.title}>Смотрите также:</p>
                <Link to='/faq?page=2&number=1#q2_1' className={`${qstyles.link} ${qstyles.ml20}`}>
                    Как стать исполнителем?
                </Link>
            </div>
        </div>
    );
}

export default CreateProfile;
