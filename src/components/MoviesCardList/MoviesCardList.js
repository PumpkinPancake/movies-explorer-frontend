import React from "react";
import "./MoviesCardList.css";
import { errorMessage } from "../../utils/Constants";
import Preloader from '../Preloader/Preloader';

export default function MoviesCardList({
  moviesData,
  error,
  addMovies,
  maxMovies,
  loading
}) {
  if (loading) {
    return <Preloader />;
  }
  return (
    <section className="movies-card">
      {error ? (
        <span className="movies-card__error-message">
          {errorMessage.moviesCardErr}
        </span>
      ) : moviesData.length === 0 ? (
        <span className="movies-card__error-message">
          {errorMessage.movieNotFound}
        </span>
      ) : (
        <ul className="movies-card__list">{moviesData}</ul>
      )}

      {moviesData.length < maxMovies ? (
        <button
          className="movies-card__more"
          onClick={() => addMovies()}
          type={"button"}
        >
          Еще
        </button>
      ) : null}
    </section>
  );
}
