import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";

export default function Movies() {
  const [isShortFilmFilterActive, setIsShortFilmFilterActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [moviesData, setMoviesData] = useState(() => {
    const data = JSON.parse(localStorage.getItem("moviesData")) || [];
    return data;
  });

  const [savedMoviesData, setSavedMoviesData] = useState(() => {
    const data = JSON.parse(localStorage.getItem("savedMovies")) || [];
    return data;
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    const data = localStorage.getItem("searchQuery") || "";
    return data;
  });

  const [filteredMovies, setFilteredMovies] = useState([]);

  const updateFilteredMovies = (filteredData) => {
    setFilteredMovies(filteredData);
    if (isShortFilmFilterActive) {
      const shortFilms = filteredData.filter((movie) => movie.duration <= 40);
      setFilteredMovies(shortFilms);
    }
  };

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    setSavedMoviesData(savedMovies);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    moviesApi
      .getMovies()
      .then((data) => {
        localStorage.setItem("moviesData", JSON.stringify(data));
        setMoviesData(data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

          localStorage.setItem("moviesData", JSON.stringify(updatedMoviesData));

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
            moviesData={moviesData}
            updateFilteredMovies={updateFilteredMovies}
          />

          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              moviesData={
                filteredMovies.length > 0 ? filteredMovies : moviesData
              }
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
