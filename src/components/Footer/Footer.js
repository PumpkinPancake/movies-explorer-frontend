import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__line"></div>
      <div className="footer__wrap">
        <p className="footer__copyright">&copy;{currentYear} Stasya Movies</p>
        <div className="footer__links">
          <a href="https://practicum.yandex.ru/" target="blank" className="footer__link">
            Яндекс.Практикум
          </a>
          <a href="https://github.com" target="blank" className="footer__link">
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}