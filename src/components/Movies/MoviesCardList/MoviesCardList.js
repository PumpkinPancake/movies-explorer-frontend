import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import mainApi from "../../../utils/MainApi";

export default function MoviesCardList({
  moviesData,
  isShortFilmFilterActive,
  searchQuery,
  handleSaveMovie,
}) {
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(0);
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const location = useLocation();
  const inSaveMovies = location.pathname === "/saved-movies";

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    setSavedMoviesData(savedMovies);
  }, []);

  const filteredMovies = isShortFilmFilterActive
    ? moviesData.filter((movie) => movie.duration <= 40)
    : moviesData;

  const searchedAndFilteredMovies = searchQuery
    ? filteredMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredMovies;

  const displayedMovies =
    location.pathname === "/saved-movies"
      ? searchedAndFilteredMovies.filter((movie) =>
          savedMoviesData.includes(movie)
        )
      : searchedAndFilteredMovies;

  const remainingMovies = filteredMovies.length - visibleMoviesCount;

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let count;
      if (screenWidth >= 1100) {
        count = 12;
      } else if (screenWidth >= 680) {
        count = 8;
      } else {
        count = 5;
      }
      setVisibleMoviesCount(count);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="movies-card">
      <ul className="movies-card__list">
        {displayedMovies.slice(0, visibleMoviesCount).map((movie) => (
          <li
            className="movies-card__item"
            key={inSaveMovies ? movie._id : movie.id}
          >
            <MoviesCard
              imageUrl={
                inSaveMovies
                  ? movie.imageUrl
                  : `https://api.nomoreparties.co${movie.image.url}`
              }
              title={movie.nameRU || movie.nameEN}
              duration={movie.duration}
              trailerLink={movie.trailerLink}
              onMovieSave={handleSaveMovie}
              isSaved={savedMoviesData.some(
                (savedMovie) => savedMovie._id === movie._id
              )}
              movieId={inSaveMovies ? movie._id : movie.id}
              country={movie.country}
            />
          </li>
        ))}
      </ul>
      {remainingMovies > 0 && (
        <button
          className="movies-card__more"
          onClick={() =>
            setVisibleMoviesCount((prevCount) => prevCount + visibleMoviesCount)
          }
        >
          Еще
        </button>
      )}
    </section>
  );
}
