import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

export default function Movies() {
  const [moviesData, setMoviesData] = useState([]);
  const [isShortFilmFilterActive, setIsShortFilmFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((data) => {
        setMoviesData(data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });

    setIsLoading(true);

    mainApi
      .getUserMovies()
      .then((data) => {
        setSavedMoviesData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching saved movies:", error);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    localStorage.setItem("searchQuery", query);
  };

  const handleSaveMovie = (movieId, newIsSave) => {
    const movieToSave = moviesData.find((movie) => movie.id === movieId);

    if (!movieToSave) {
      console.error("Movie not found for ID:", movieId);
      return;
    }

    if (newIsSave) {
      setIsLoading(true);
      mainApi
        .saveMovie(movieToSave)
        .then((savedMovie) => {
          setSavedMoviesData([...savedMoviesData, savedMovie]);
          localStorage.setItem(
            "savedMovies",
            JSON.stringify([...savedMoviesData, savedMovie])
          );
          const updatedMoviesData = moviesData.map((movie) =>
            movie.id === movieId ? { ...movie, isSaved: true } : movie
          );
          setMoviesData(updatedMoviesData);
          setIsLoading(false);
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

          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              moviesData={moviesData}
              isShortFilmFilterActive={isShortFilmFilterActive}
              searchQuery={searchQuery}
              handleSaveMovie={handleSaveMovie}
              savedMoviesData={savedMoviesData}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
