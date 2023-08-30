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

  // ПОЛУЧИТЬ СОХРАНЕННЫЕ ФИЛЬМЫ
  const [savedMovie, setSavedMovie] = useState(() => {
    const data = JSON.parse(localStorage.getItem("savedMovie")) || [];
    return data;
  });

  useEffect(() => {
    getMovies();
    getUserMovie();
  }, []);

  function getMovies() {
    moviesApi
      .getMovies()
      .then((res) => {
        setMoviesData(res);
      })
      .catch((err) => console.log(err));
  }

  function getUserMovie() {
    return mainApi
      .getUserMovies()
      .then((res) => setSavedMovie(res))
      .catch((err) => console.log("getUserMovies Catch ERROR ->", err));
  }

  

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
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
            savedMovie={savedMovie}
          />
        </section>
      </main>
      <Footer />
    </>
  );
  }
