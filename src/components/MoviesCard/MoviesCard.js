import React from "react";
import delBtn from "../../images/del_button.svg";
import { useLocation } from "react-router-dom";
import iconCheck from "../../images/icon-chesk.svg";
import { displayDuration } from "../../utils/DisplayDuration";

import "./MoviesCard.css";

export default function MoviesCard(props) {
  const location = useLocation();
  const buttonClass = props.class === "isSaved" ? "card__button_saved" : "";

  const openTrailerLink = () => {
    window.open(`${props.movie.trailerLink}`);
  };

  function handleSave() {
    props.onSave(props.movie);
  }

  function handleDelete() {
    console.log("Удаляем фильм:", props.movie.id);
    props.onRemove(props.movie.id || props.movie.movieId);
  }

  console.log(props.movie);

  return (
    <div className="card">
      <div className="card__wrapper">
        <h3 className="card__title">{props.movie.nameRU}</h3>
        <p className="card__duration">
          {displayDuration(props.movie.duration)}
        </p>
      </div>
      <a
        onClick={openTrailerLink}
        className="card__link"
        href={props.movie.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="card__img"
          src={
            props.class !== "isRemove"
              ? `https://api.nomoreparties.co${props.movie.image.url}`
              : props.movie.image
          }
          alt={props.movie.title}
        ></img>
      </a>
      <button
        className={`card__button ${buttonClass}`}
        onClick={props.movie.class === "isNotSaved" ? handleSave : handleDelete}
      >
        {location.pathname === "/movies" ? (
          props.class === "isSaved" ? (
            <img src={iconCheck} alt="Сохранено" className="card__icon-check" />
          ) : (
            "Сохранить"
          )
        ) : (
          ""
        )}
        {location.pathname === "/saved-movies" ? (
          <img src={delBtn} alt="Удалить" className="card__icon-del" />
        ) : (
          ""
        )}
      </button>
    </div>
  );
}
