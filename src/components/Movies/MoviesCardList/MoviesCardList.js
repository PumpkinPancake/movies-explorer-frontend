import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  moviesData,
  isShortFilmFilterActive,
  searchQuery,
}) {
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(0);
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const location = useLocation();

  // const handleSaveMovie = (movie, isSaved) => {
  //   console.log("handleSaveMovie called with:", movie, isSaved);
  //   setSavedMoviesData((prevSavedMovies) => [...prevSavedMovies, movie]);
  // };

  // useEffect(() => {
  //   console.log("Updating savedMoviesData:", savedMoviesData);
  //   localStorage.setItem("savedMovies", JSON.stringify(savedMoviesData));
  // }, [savedMoviesData]);

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
        {searchedAndFilteredMovies.slice(0, visibleMoviesCount).map((movie, index) => (
          <li className="movies-card__item" key={index}>
            <MoviesCard
            imageUrl={movie.imageUrl}
            title={movie.nameRU}
            duration={movie.duration}
            />
            {/* <MoviesCard
              imageUrl={`https://api.nomoreparties.co${movie.image.url}`}
              title={movie.nameRU}
              duration={movie.duration}
              trailerLink={movie.trailerLink}
              // onMovieSave={handleSaveMovie}
              // isSaved={savedMoviesData.some(
              //   (savedMovie) => savedMovie._id === movie._id
              // )}
            /> */}
          </li>
        ))}
      </ul>
      {searchedAndFilteredMovies > 0 && (
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
