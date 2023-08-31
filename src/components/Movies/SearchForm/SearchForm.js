import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import searchImg from "../../images/search-icon.svg";
import { useLocation } from "react-router-dom";

export default function SearchForm({
  isShortFilmFilterActive,
  setIsShortFilmFilterActive,
  onSearch,
  moviesData,
  updateFilteredMovies,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [formSearchQuery, setFormSearchQuery] = useState("");
  const [isEmptyQuery, setIsEmptyQuery] = useState(false);
  const [noMatchingResults, setNoMatchingResults] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);


  const handleCheckboxChange = () => {  
    setIsChecked(!isChecked);
    setIsShortFilmFilterActive(!isShortFilmFilterActive);
  
    const filteredMovies = filterMovies(formSearchQuery, moviesData);
    updateFilteredMovies(filteredMovies);
  };

  const handleSearchInputChange = (e) => {
    setFormSearchQuery(e.target.value);
    setIsEmptyQuery(false);
  };
  const filterMovies = (query) => {
    return moviesData.filter((movie) =>
      movie.nameRU.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();

    if (formSearchQuery.trim().length === 0) {
      setIsEmptyQuery(true);
      return;
    }

    setIsEmptyQuery(false);
    setNoMatchingResults(filteredMovies.length === 0);
    onSearch(formSearchQuery);
  };


  const inputPlaceholder = isEmptyQuery
    ? "Нужно ввести ключевое слово"
    : "Фильм";

  return (
    <>
      <form className="search-form" onSubmit={handleSearchFormSubmit}>
        <label className="search-form__label">
          <input
            className="search-form__input"
            placeholder={inputPlaceholder}
            value={formSearchQuery}
            onChange={handleSearchInputChange}
          />
          <button className="search-form__button">
            <img
              className="search-form__button-img"
              src={searchImg}
              alt="Иконка поиска фильма"
            />
          </button>
        </label>

        <label className="search-form__label-short">
          <span className="search-form__label-short-text">Короткометражки</span>
          <div className="search-form__wrapper">
            <input
              type="checkbox"
              className="search-form__short-checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <div
              className={`search-form__checkbox-indicator ${
                isChecked ? "checked" : ""
              }`}
            />
          </div>
        </label>
      </form>

      <div className="search-form__line"></div>
      <span className="search-form__no-results">
        {noMatchingResults && "Ничего не найдено"}
      </span>
    </>
  );
}
