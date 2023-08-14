import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { moviesData } from "../../utils/content";

export default function Movies() {
  // const [moviesData, setMoviesData] = useState([]);
  const [isShortFilmFilterActive, setIsShortFilmFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedMoviesData, setSavedMoviesData] = useState([]);

  // useEffect(() => {
  //   const savedSearchQuery = localStorage.getItem("searchQuery");
  //   if (savedSearchQuery) {
  //     setSearchQuery(savedSearchQuery);
  //   }
  //   moviesApi
  //     .getMovies()
  //     .then((data) => {
  //       console.log("Movies data:", data);
  //       setMoviesData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Ошибка при получении данных:", error);
  //     });

  //   // const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
  //   // setSavedMoviesData(savedMovies);
  // }, []);

  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  //   localStorage.setItem("searchQuery", query);
  // };

  // const handleSaveMovie = (movie, isSaved) => {
  //   console.log("handleSaveMovie called with:", movie, isSaved);

  //   if (isSaved) {
  //     console.log("Deleting movie:", movie._id);

  //     mainApi
  //       .deleteMovie(movie._id)
  //       .then(() => {
  //         console.log("Movie deleted:", movie._id);

  //         const updatedSavedMovies = savedMoviesData.filter(
  //           (savedMovie) => savedMovie._id !== movie._id
  //         );
  //         console.log("Updated saved movies:", updatedSavedMovies);

  //         setSavedMoviesData(updatedSavedMovies);
  //         localStorage.setItem(
  //           "savedMovies",
  //           JSON.stringify(updatedSavedMovies)
  //         );
  //       })
  //       .catch((error) => {
  //         console.error("Error while deleting movie:", error);
  //       });
  //   } else {
  //     console.log("Saving movie:", movie);

  //     mainApi
  //       .saveMovie(movie)
  //       .then((savedMovie) => {
  //         console.log("Movie saved:", savedMovie);

  //         const updatedSavedMovies = [...savedMoviesData, savedMovie];
  //         console.log("Updated saved movies:", updatedSavedMovies);

  //         setSavedMoviesData(updatedSavedMovies);
  //         localStorage.setItem(
  //           "savedMovies",
  //           JSON.stringify(updatedSavedMovies)
  //         );

  //         const savedMoviesFromLocalStorage =
  //           JSON.parse(localStorage.getItem("savedMovies")) || [];
  //         console.log(
  //           "savedMovies from localStorage:",
  //           savedMoviesFromLocalStorage
  //         );
  //       })
  //       .catch((error) => {
  //         console.error("Error while saving movie:", error);
  //       });
  //   }
  // };

  return (
    <>
      <main>
        <section className="movies">
          <SearchForm
            isShortFilmFilterActive={isShortFilmFilterActive}
            setIsShortFilmFilterActive={setIsShortFilmFilterActive}
            // onSearch={handleSearch}
          />
          <MoviesCardList
            moviesData={moviesData}
            // isShortFilmFilterActive={isShortFilmFilterActive}
            // searchQuery={searchQuery}
            // savedMoviesData={savedMoviesData}
            // onMovieSave={handleSaveMovie}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
