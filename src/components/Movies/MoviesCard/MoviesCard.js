import React, { useState } from "react";
import delBtn from "../../images/del_button.svg";
import { useLocation } from "react-router-dom";
import iconChesk from "../../images/icon-chesk.svg";

import "./MoviesCard.css";

export default function MoviesCard(props) {
  const [isLiked, setIsLiked] = useState(false);
<<<<<<< Updated upstream
  const [isSave, setIsSave] = useState(props.isSave);

  const location = useLocation();
=======

  const location = useLocation();

  // useEffect(() => {
  //   setIsLiked(props.isSaved);
  // }, [props.isSaved]);

  useEffect(() => {
    if (props.savedMovie) {
      const result = props.savedMovie.some(
        (item) => item.movieId === props.movieId
      );
      setIsLiked(result);
    }
  }, [props.savedMovie, props.movieId]);
>>>>>>> Stashed changes

  const buttonClass =
    location.pathname === "/movies"
      ? isLiked
        ? "card__button_saved"
        : ""
      : location.pathname === "/saved-movies"
      ? isLiked
        ? "card__button_del"
        : ""
      : "";

  function handleClickSave() {
    const newIsSave = !isSave;
    setIsSave(newIsSave);

    if (props.onMovieSave) {
      props.onMovieSave(props.movieId, newIsSave);
    }
  }

  const openTrailerLink = () => {
    window.open(`${props.trailerLink}`);
  };

  const handleLikeButtonClick = () => {
    if (location.pathname === "/movies") {
      props.onSave();
    } else if (location.pathname === "/saved-movies") {
      props.onDelete();
    }
  };

  const displayDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const hoursText = hours > 0 ? `${hours}ч` : "";
    const minutesText = minutes > 0 ? `${minutes}м` : "";

    return `${hoursText} ${minutesText}`;
  };

  return (
    <div className="card">
      <div className="card__wrapper">
        <h3 className="card__title">{props.title}</h3>
        <p className="card__duration">{displayDuration(props.duration)}</p>
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
      <button
        className={`card__button ${buttonClass}`}
<<<<<<< Updated upstream
        onClick={handleClickSave}
=======
        onClick={handleLikeButtonClick}
>>>>>>> Stashed changes
      >
        {location.pathname === "/movies" ? (
          isLiked ? (
            <img src={iconChesk} alt="Сохранить" className="card__icon-chesk" />
          ) : (
            "Сохранить"
          )
        ) : (
          ""
        )}
        {location.pathname === "/saved-movies" && isSave ? (
          <img src={delBtn} alt="Удалить" className="card__icon-del" />
        ) : (
          ""
        )}
      </button>
    </div>
  );
}
