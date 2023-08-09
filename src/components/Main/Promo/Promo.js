import './Promo.css';
import { Link } from 'react-router-dom';

export default function Promo() {
    return (
        <section className="promo" id="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <ul className="promo__list">
                    <li>
                        <a className="promo__link" href="#about-project">О проекте</a>
                    </li>
                    <li>
                        <a className="promo__link" href="#tech">Технологии</a>
                    </li>
                    <li>
                        <a className="promo__link" href="#about-me">Студент</a>
                    </li>
                </ul>
            </div>
        </section>
    )
}