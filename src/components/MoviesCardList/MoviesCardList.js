import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { errorMessage } from "../../utils/Constants3";

export default function MoviesCardList({
  moviesData,
  error,
  onSave,
  onDelete,
  resultSearch,
  isShort,
  addMovies,
  maxMovies,
}) {
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
