import React, { useState } from "react";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

export default function SavedMovies() {
  const [isShortFilmFilterActive, setIsShortFilmFilterActive] = useState(false);
  const savedMoviesData = [];

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
          isShortFilmFilterActive={isShortFilmFilterActive}
          moviesData={savedMoviesData}
        />
      </section>
      <Footer />
    </>
  );
}
