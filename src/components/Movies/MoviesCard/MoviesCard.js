import React from "react";
import { useState, useEffect } from "react";
import delBtn from "../../../images/del_button.svg";
import { useLocation } from "react-router-dom";
import iconChesk from "../../../images/icon-chesk.svg";

import "./MoviesCard.css";

export default function MoviesCard(props) {
  const location = useLocation();
  const [isSave, setIsSave] = useState(props.isSaved);

  const buttonClass =
    location.pathname === "/movies"
      ? isSave
        ? "card__button_saved"
        : ""
      : location.pathname === "/saved-movies"
      ? isSave
        ? "card__button_del"
        : ""
      : "";

  const openTrailerLink = () => {
    window.open(`${props.trailerLink}`);
  };

  // const displayDuration = (duration) => {
  //   const hours = Math.floor(duration / 60);
  //   const minutes = duration % 60;

  //   const hoursText = hours > 0 ? `${hours}ч` : "";
  //   const minutesText = minutes > 0 ? `${minutes}м` : "";

  //   return `${hoursText} ${minutesText}`;
  // };

  return (
    <div className="card">
      <div className="card__wrapper">
        <h3 className="card__title">{props.title}</h3>
        <p className="card__duration">{props.duration}</p>
      </div>
      <a
        onClick={openTrailerLink}
        className="card__link"
        href={props.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="card__img" src={props.imageUrl} alt={props.title}></img>
      </a>
      <button className={`card__button ${buttonClass}`}>
        {location.pathname === "/movies" ? (
          isSave ? (
            <img src={iconChesk} alt="Сохранить" className="card__icon-chesk" />
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
