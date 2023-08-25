import "./Techs.css";
import SectionTitle from "../SectionTitle/SectionTitle";

export default function Techs() {
    return (
        <section
        id="tech"
        className="tech">
           <div className="tech__container"> <SectionTitle title='Технологии'></SectionTitle>
                <h1 className="tech__title">7 технологий</h1>
                <p className="tech__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="tech__list">
                    <li className="tech__item">HTML</li>
                    <li className="tech__item">CSS</li>
                    <li className="tech__item">JS</li>
                    <li className="tech__item">React</li>
                    <li className="tech__item">Git</li>
                    <li className="tech__item">Express.js</li>
                    <li className="tech__item">MongoDB</li>
                </ul>
            </div>
        </section>
    )
}