import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li>
            <a
              href="https://pumpkinpancake.github.io/how-to-learn/"
              target="blank"
              className="portfolio__link"
            >
              Статичный сайт
            </a>
          </li>

          <div className="portfolio__line"></div>
          <li>
            <a
              href="https://pumpkinpancake.github.io/yet-another-project/"
              target="blank"
              className="portfolio__link"
            >
              Адаптивный сайт
            </a>
          </li>
          <div className="portfolio__line"></div>
          <li>
            <a
              href="https://github.com/PumpkinPancake/react-mesto-api-full-gha"
              className="portfolio__link"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}