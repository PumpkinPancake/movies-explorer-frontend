import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import mainApi from "../../utils/MainApi";
import "./SavedMovies.css";

export default function SavedMovies() {
  const [isShortFilmFilterActive, setIsShortFilmFilterActive] = useState(false);
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    localStorage.setItem("searchQuery", query);
  };

  const updateFilteredSavedMovies = (filteredData) => {
    if (isShortFilmFilterActive) {
      const shortFilms = filteredData.filter((movie) => movie.duration <= 40);
      setFilteredSavedMovies(shortFilms);
    } else {
      setFilteredSavedMovies(filteredData);
    }
  };

  useEffect(() => {
    mainApi
      .getUserMovies()
      .then((data) => {
        setSavedMoviesData(data);
        setFilteredSavedMovies(data);
      })
      .catch((error) => {
        console.error("Error while fetching saved movies:", error);
      });
  }, []);

  const handleDeleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const updatedSavedMovies = savedMoviesData.filter(
          (savedMovie) => savedMovie.movie._id !== movieId
        );
        setSavedMoviesData(updatedSavedMovies);
        updateFilteredSavedMovies(updatedSavedMovies);
      })
      .catch((error) => {
        console.error("Error while deleting movie:", error);
      });
  };

  return (
    <>
      <main>
        <section className="saved-movies">
          <SearchForm
            isShortFilmFilterActive={isShortFilmFilterActive}
            setIsShortFilmFilterActive={setIsShortFilmFilterActive}
            onSearch={handleSearch}
            moviesData={savedMoviesData}
            updateFilteredMovies={updateFilteredSavedMovies}
          />
          <MoviesCardList
            moviesData={filteredSavedMovies}
            isShortFilmFilterActive={isShortFilmFilterActive}
            searchQuery={searchQuery}
            handleSaveMovie={handleDeleteMovie}
            savedMoviesData={savedMoviesData}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
