import "./AboutProject.css";
import SectionTitle from "../SectionTitle/SectionTitle";

export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__container">
        <SectionTitle title="О проекте" />
        <ul className="about-project__list">
          <li>
            <h3 className="about-project__title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li>
            <h3 className="about-project__title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about-project__bar">
            <p className="about-project__week about-project__week_color">1 неделя</p>
            <p className="about-project__week">4 недели</p>
            <p className="about-project__direction">Back-end</p>
            <p className="about-project__direction">Front-end</p>
        </div>
      </div>
    </section>
  );
}
