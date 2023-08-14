import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import {moviesData} from '../../utils/content';

export default function SavedMovies({ handleSaveMovie }) {
  const [isShortFilmFilterActive, setIsShortFilmFilterActive] = useState(false);
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

    // useEffect(() => {
    //   const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    //   console.log("savedMovies from localStorage:", savedMovies);
    //   setSavedMoviesData(savedMovies);
    
    //   mainApi.getUserMovies()
    //     .then((data) => {
    //       console.log("Saved Movies data:", data);
    //       setSavedMoviesData(data);
    //     })
    //     .catch((error) => {
    //       console.error("Error while fetching saved movies:", error);
    //     });
    // }, []);

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
          moviesData={moviesData}
          isShortFilmFilterActive={isShortFilmFilterActive}
          searchQuery={searchQuery}
          savedMoviesData={savedMoviesData}
          onMovieSave={handleSaveMovie}
        />
      </section>
      <Footer />
    </>
  );
}
