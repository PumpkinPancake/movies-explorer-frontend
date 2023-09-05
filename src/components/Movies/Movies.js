import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { FilterMovies } from "../../utils/FilterMovies";
import { useResize } from "../../utils/HandleResize";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function Movies(props) {
  const showCountMovies = useResize();

  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("queryMovies") || ""
  );

  const [isShort, setIsShort] = useState(() => {
    const savedShortMovies = localStorage.getItem("shortMovies");
    return savedShortMovies ? JSON.parse(savedShortMovies) : false;
  });

  const [movieCount, setMovieCount] = useState(0);

  useEffect(() => {
    setMovieCount(showCountMovies.moviesOnPage);
  }, [showCountMovies]);

  useEffect(() => {
    localStorage.setItem("queryMovies", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("shortMovies", JSON.stringify(isShort));
  }, [isShort]);

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function handleToggleShort(checked) {
    setIsShort(checked);
  }

  const filteredMovies = FilterMovies(
    props.moviesData,
    searchQuery,
    isShort,
    movieCount
  );

  const moviesCards = filteredMovies.filteredMovies.map((el, index) => {
    return (
      <li className="movies-card__item" key={index}>
        <MoviesCard
          key={el.id}
          class={el.class}
          movie={el}
          onRemove={props.handleDelete}
          onSave={props.handleSave}
        />
      </li>
    );
  });

  function addMovies() {
    setMovieCount(movieCount + showCountMovies.addMoviesOnPage);
  }

  return (
    <>
      <main>
        <section className="movies">
          <SearchForm
            onSearch={handleSearch}
            onToggle={handleToggleShort}
            checked={isShort}
            searchQuery={searchQuery}
          />

          <MoviesCardList
            addMovies={addMovies}
            moviesData={moviesCards}
            maxMovies={filteredMovies.maxMovies}
            loading={props.loading}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
