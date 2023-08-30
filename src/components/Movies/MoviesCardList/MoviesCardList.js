import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  moviesData,
  isShortFilmFilterActive,
  searchQuery,
  handleSaveMovie,
  savedMoviesData,
}) {
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(0);
  const location = useLocation();
  const inSavedMovies = location.pathname === "/saved-movies";

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
  }, [savedMoviesData]);

  const filteredMovies = isShortFilmFilterActive
    ? moviesData.filter((movie) => movie.duration <= 40)
    : moviesData;

  const displayedMovies = searchQuery
    ? filteredMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredMovies;

  const remainingMovies = displayedMovies.length - visibleMoviesCount;

  return (
    <section className="movies-card">
      <ul className="movies-card__list">
        {displayedMovies.slice(0, visibleMoviesCount).map((movie) => {
          console.log("Сейвед муви дата:", savedMoviesData);
          return (
            <li
              className="movies-card__item"
              key={inSavedMovies ? movie._id : movie.id}
            >
              <MoviesCard
                imageUrl={
                  inSavedMovies
                    ? movie.image
                    : `https://api.nomoreparties.co${movie.image.url}`
                }
                title={movie.nameRU || movie.nameEN}
                duration={movie.duration}
                trailerLink={movie.trailerLink}
                onMovieSave={handleSaveMovie}
                isSaved={savedMoviesData.some(
                  (savedMovie) => savedMovie.movieId === movie.id
                )}
                savedMoviesData={savedMoviesData}
                movieId={movie.id || movie._id}
                country={movie.country}
              />
            </li>
          );
        })}
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
