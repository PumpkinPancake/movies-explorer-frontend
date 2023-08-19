import './AboutMe.css';
import photo from '../../../images/photo_me.jpg';
import SectionTitle from '../SectionTitle/SectionTitle';

export default function AboutMe() {
    return (
        <section className='about-me' id='about-me'>
            <div className='about-me__container'>
            <SectionTitle title='Студент'></SectionTitle>
            <div className='about-me__info'>
               <div className='about-me__wrapper'>
                    <h1 className='about-me__name'>Анастасия</h1>
                    <p className='about-me__prof'>Фронт-энд разработчик, 27 лет</p>
                    <p className='about-me__description'>Я родилась в России, сейчас живу в Батуми. Как сдам диплом, надеюсь найти интересную работу в области фронтенда и дорасти до тимлида.=)</p>
                    <a href='https://github.com/PumpkinPancake' target='blank' className='about-me__resourses'>Github</a>
                </div>
                <div className='about-me__image-container'>
                <img src={photo} className='about-me__image' alt='фото автора сайта'></img>
                </div>
            </div>
            </div>
        </section>
    )
}