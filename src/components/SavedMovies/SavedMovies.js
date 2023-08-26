import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import mainApi from "../../utils/MainApi";

export default function SavedMovies({ handleSaveMovie }) {
  const [isShortFilmFilterActive, setIsShortFilmFilterActive] = useState(false);
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    mainApi
      .getUserMovies()
      .then((data) => {
        console.log("Saved Movies data:", data);
        setSavedMoviesData(data);
      })
      .catch((error) => {
        console.error("Error while fetching saved movies:", error);
      });
  }, []);

  const handleShortFilmFilterChange = () => {
    setIsShortFilmFilterActive(!isShortFilmFilterActive);
  };

  return (
    <>
      <section className="saved-movies">
        <SearchForm
          checked={isShortFilmFilterActive}
          onChange={handleShortFilmFilterChange}
        />
        <MoviesCardList
          moviesData={savedMoviesData}
          isShortFilmFilterActive={isShortFilmFilterActive}
          searchQuery={searchQuery}
          savedMoviesData={savedMoviesData}
          handleSaveMovie={handleSaveMovie}
        />
      </section>
      <Footer />
    </>
  );
}
