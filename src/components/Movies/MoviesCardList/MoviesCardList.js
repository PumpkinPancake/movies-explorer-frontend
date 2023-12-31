import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  moviesData,
  isShortFilmFilterActive,
  searchQuery,
}) {
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(0);

  const filteredMovies = isShortFilmFilterActive
    ? moviesData.filter((movie) => movie.duration <= 40)
    : moviesData;

  const searchedAndFilteredMovies = searchQuery
    ? filteredMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredMovies;

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
        {searchedAndFilteredMovies
          .slice(0, visibleMoviesCount)
          .map((movie, index) => (
            <li className="movies-card__item" key={index}>
              <MoviesCard
                imageUrl={movie.imageUrl}
                title={movie.title}
                duration={movie.duration}
                trailerLink={movie.trailerLink}
                movieId={movie.id}
              />
            </li>
          ))}
      </ul>

      <button
        className="movies-card__more"
        onClick={() =>
          setVisibleMoviesCount((prevCount) => prevCount + visibleMoviesCount)
        }
      >
        Еще
      </button>
    </section>
  );
}
