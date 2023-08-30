import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import mainApi from "../../utils/MainApi";

export default function SavedMovies() {
  const [isShortFilmFilterActive, setIsShortFilmFilterActive] = useState(false);
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  

  useEffect(() => {
    mainApi
      .getUserMovies()
      .then((data) => {
        setSavedMoviesData(data);
      })
      .catch((error) => {
        console.error("Error while fetching saved movies:", error);
      });
  }, []);

  const handleShortFilmFilterChange = () => {
    setIsShortFilmFilterActive(!isShortFilmFilterActive);
  };

  const handleDeleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const updatedSavedMovies = savedMoviesData.filter(
          (savedMovie) => savedMovie.movieId !== movieId
        );
        setSavedMoviesData(updatedSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch((error) => {
        console.error("Error while deleting movie:", error);
      });
  };

  return (
    <>
      <section className="saved-movies">
        <SearchForm
          isChecked={isShortFilmFilterActive}
          onChange={handleShortFilmFilterChange}
        />
        <MoviesCardList
          moviesData={savedMoviesData}
          isShortFilmFilterActive={isShortFilmFilterActive}
          searchQuery={searchQuery}
          handleSaveMovie={handleDeleteMovie}
          savedMoviesData={savedMoviesData}
        />
      </section>
      <Footer />
    </>
  );
}
