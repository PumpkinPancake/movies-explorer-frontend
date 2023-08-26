import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

export default function Movies() {
  const [moviesData, setMoviesData] = useState([]);
  const [isShortFilmFilterActive, setIsShortFilmFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedMoviesData, setSavedMoviesData] = useState([]);

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem("searchQuery");
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }

    moviesApi
      .getMovies()
      .then((data) => {
        console.log("Movies data:", data);
        setMoviesData(data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
    setSavedMoviesData(JSON.parse(localStorage.getItem("savedMovies")) || []);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    localStorage.setItem("searchQuery", query);
  };

  const handleSaveMovie = (movie) => {
    const isSaved = savedMoviesData.some(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );

    if (isSaved) {
      // Если фильм уже сохранен, удаляем его
      const movieToDelete = savedMoviesData.find(
        (savedMovie) => savedMovie.movieId === movie.movieId
      );

      mainApi
        .deleteMovie(movieToDelete._id)
        .then(() => {
          console.log("Movie deleted:", movieToDelete._id);
          const updatedSavedMovies = savedMoviesData.filter(
            (savedMovie) => savedMovie._id !== movieToDelete._id
          );
          setSavedMoviesData(updatedSavedMovies);
          localStorage.setItem(
            "savedMovies",
            JSON.stringify(updatedSavedMovies)
          );
        })
        .catch((error) => {
          console.error("Error while deleting movie:", error);
        });
    } else {
      // Если фильм не сохранен, сохраняем его
      mainApi
        .saveMovie(movie)
        .then((savedMovie) => {
          console.log("Movie saved:", savedMovie);
          const updatedSavedMovies = [...savedMoviesData, savedMovie];
          setSavedMoviesData(updatedSavedMovies);
          localStorage.setItem(
            "savedMovies",
            JSON.stringify(updatedSavedMovies)
          );
        })
        .catch((error) => {
          console.error("Error while saving movie:", error);
        });
    }
  };

  return (
    <>
      <main>
        <section className="movies">
          <SearchForm
            isShortFilmFilterActive={isShortFilmFilterActive}
            setIsShortFilmFilterActive={setIsShortFilmFilterActive}
            onSearch={handleSearch}
          />
          <MoviesCardList
            moviesData={moviesData}
            isShortFilmFilterActive={isShortFilmFilterActive}
            searchQuery={searchQuery}
            handleSaveMovie={handleSaveMovie}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
