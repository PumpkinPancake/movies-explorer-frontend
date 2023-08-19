import "./BurgerMenu.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import icon from "../../images/icon_people.svg";


export default function BurgerMenu({ onClose, isOpen }) {
  const location = useLocation();

  return isOpen ? (
    <div className="burger__overlay">
      <div
        className={isOpen ? "burger__menu burger__menu_open" : "burger__menu"}
      >
        <button
          className="burger__close-button"
          type="button"
          onClick={onClose}
        >
        </button>
        <nav className="burger__nav">
          <ul className="burger__list">
            <li>
              <NavLink
                to="/"
                onClick={onClose}
                className={
                  location.pathname === "/"
                    ? "burger__link burger__link_active"
                    : "burger__link"
                }
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                onClick={onClose}
                className={
                  location.pathname === "/movies"
                    ? "burger__link burger__link_active"
                    : "burger__link"
                }
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/saved-movies"
                onClick={onClose}
                className={
                  location.pathname === "/saved-movies"
                    ? "burger__link burger__link_active"
                    : "burger__link"
                }
              >
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link to="/profile" className="burger__profile" onClick={onClose}>
          <button className="burger__button-profile">
            <img
              src={icon}
              className="burger__img-profile"
              alt="иконка человечка"
            ></img>
            Аккаунт
          </button>
        </Link>
      </div>
    </div>
  ) : null;
}
