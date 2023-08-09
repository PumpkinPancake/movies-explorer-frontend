import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";

export default function Movies() {
  const [moviesData, setMoviesData] = useState([]);
  const [isShortFilmFilterActive, setIsShortFilmFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem("searchQuery");
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }
    moviesApi
      .getMovies()
      .then((data) => {
        setMoviesData(data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    localStorage.setItem("searchQuery", query);
  };

  return (
    <>
      <Header />
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
        />
      </section>
      <Footer />
    </>
  );
}
