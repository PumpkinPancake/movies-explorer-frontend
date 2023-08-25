import "./BurgerMenu.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import icon from '../../images/icon_people.svg';


export default function BurgerMenu({ onClose, isOpen }) {
  const location = useLocation();

  return isOpen ? (
    <div className="burger-overlay">
      <div
        className={isOpen ? "burger-menu burger-menu_open" : "burger-menu"}
      >
        <button
          className="burger-close-button"
          type="button"
          onClick={onClose}
        >
        </button>
        <nav className="burger-nav">
          <ul className="burger-list">
            <li>
              <NavLink
                to="/"
                onClick={onClose}
                className={
                  location.pathname === "/"
                    ? "burger-link burger-link_active"
                    : "burger-link"
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
                    ? "burger-link burger-link_active"
                    : "burger-link"
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
                    ? "burger-link burger-link_active"
                    : "burger-link"
                }
              >
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link to="/profile" className="burger-profile" onClick={onClose}>
          <button className="burger-button-profile">
            <img
              src={icon}
              className="burger-img-profile"
              alt="иконка человечка"
            ></img>
            Аккаунт
          </button>
        </Link>
      </div>
    </div>
  ) : null;
}
