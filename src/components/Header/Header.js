import "./Header.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import icon from "../../images/icon_people.svg";
import Burger from "../BurgerMenu/BurgerMenu";
import { useState, useEffect } from "react";
import menuImg from "../../images/burger.svg";

export default function Header({ loggedIn }) {
  const location = useLocation();

  const [burgerOpened, setBurgerOpened] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleOpenBurger() {
    setBurgerOpened(!burgerOpened);
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="логотип сайта"></img>
      </Link>
      {loggedIn ? (
        windowWidth > 768 ? (
          <>
            <nav>
              <ul className="header__list">
                <li>
                  <NavLink
                    to="/movies"
                    className={
                      location.pathname === "/movies"
                        ? "header__link_active"
                        : "header__link"
                    }
                  >
                    Фильмы
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/saved-movies"
                    className={
                      location.pathname === "/saved-movies"
                        ? "header__link_active"
                        : "header__link"
                    }
                  >
                    Сохраненные фильмы
                  </NavLink>
                </li>
              </ul>
            </nav>
            <Link to="/profile" className="header__profile">
              <button className="header__button header__button-profile">
                <img
                  src={icon}
                  className="header__img-profile"
                  alt="иконка человечка"
                ></img>
                Аккаунт
              </button>
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleOpenBurger}
              className="header__burger-button"
              type="button"
            >
              <img
                src={menuImg}
                className="burger-menu-img"
                alt="Иконка меню"
              ></img>
            </button>
            <Burger isOpen={burgerOpened} onClose={handleOpenBurger} />
          </>
        )
      ) : (
        <>
          <ul className="header__buttons">
            <li>
              <Link
                to="/signup"
                className="header__button header__button-register"
              >
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="header__button header__button-entry"
                type="button"
              >
                Войти
              </Link>
            </li>
          </ul>
        </>
      )}
    </header>
  );
}
