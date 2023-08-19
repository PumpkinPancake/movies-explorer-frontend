import React, { useState } from "react";
import "./SearchForm.css";
import searchImg from "../../../images/search-icon.svg";
import useFormValidation from "../../Hooks/useFormValidation";

export default function SearchForm({
  isShortFilmFilterActive,
  setIsShortFilmFilterActive,
  onSearch,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [onChange, setOnChange] = useState();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setOnChange(!isChecked);
    setIsShortFilmFilterActive(!isShortFilmFilterActive);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <>
      <form className="search-form">
        <label className="search-form__label">
          <input
            className="search-form__input"
            placeholder="Фильм"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button
            className="search-form__button"
            onClick={handleSearchFormSubmit}
          >
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
    </>
  );
}