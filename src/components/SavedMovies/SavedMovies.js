import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import { moviesData } from "../../utils/content";
import './SavedMovies.css';

export default function SavedMovies({ handleSaveMovie }) {
  const [isShortFilmFilterActive, setIsShortFilmFilterActive] = useState(false);
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");



  return (
    <>
    <main>
      <section className="saved-movies">
        <SearchForm
          checked={isShortFilmFilterActive}
        />
        <MoviesCardList
          moviesData={moviesData}
          isShortFilmFilterActive={isShortFilmFilterActive}
          searchQuery={searchQuery}
          savedMoviesData={savedMoviesData}
          handleSaveMovie={handleSaveMovie}
        />
      </section>
      </main>
      <Footer />
    </>
  );
}