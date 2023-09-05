import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import mainApi from "../../utils/MainApi";
import "./SavedMovies.css";
import { FilterMovies } from "../../utils/FilterMovies";
import { useResize } from "../../utils/HandleResize";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function SavedMovies(props) {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("querySavedMovies") || "",
  );

  const [isShort, setIsShort] = useState(() => {
    const savedShortMovies = localStorage.getItem("shortSavedMovies");
    return savedShortMovies ? JSON.parse(savedShortMovies) : false;
  });

  useEffect(() => {
    localStorage.setItem("querySavedMovies", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("shortSavedMovies", JSON.stringify(isShort));
  }, [isShort]);

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function handleToggleShort(checked) {
    setIsShort(checked);
  }

  const filteredMovies = FilterMovies(
    props.savedMoviesData,
    searchQuery,
    isShort,
  );

  const moviesCards = filteredMovies.filteredMovies.map((el, index) => {
    return (
      <li className="movies-card__item" key={index}>
        <MoviesCard
          key={el.id}
          class={el.class}
          movie={el}
          onRemove={props.handleDelete}
        />
      </li>
    );
  });

  return (
    <>
      <main>
        <section className="saved-movies">
          <SearchForm
            onSavedSearch={handleSearch}
            onSavedToggle={handleToggleShort}
            checkedSaved={isShort}
            searchSavedQuery={searchQuery}
          />
          <MoviesCardList
            moviesData={moviesCards}
            maxMovies={filteredMovies.maxMovies}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
