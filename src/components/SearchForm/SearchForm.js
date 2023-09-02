import React, { useState } from "react";
import "./SearchForm.css";
import searchImg from "../../images/search-icon.svg";
import { useLocation } from "react-router-dom";

export default function SearchForm(props) {
  const location = useLocation();
  const inSavedMoviePage = location.pathname === "/saved-movies";
  const [userInput, setUserInput] = useState(
    inSavedMoviePage ? props.searchSavedQuery : props.searchQuery,
  );
  const [isChecked, setIsChecked] = useState(
    inSavedMoviePage ? props.checkedSaved : props.checked,
  );

  // ОБРАБОТКА ИЗМЕНЕНИЯ ИНПУТА
  const handleInputEdit = (e) => {
    setUserInput(e.target.value);
  };
  // ОБРАБОТКА ПОИСКА
  function handleSubmit(e) {
    e.preventDefault();
    inSavedMoviePage
      ? props.onSavedSearch(userInput)
      : props.onSearch(userInput);
  }

  const handleToggle = () => {
    const newStatus = !isChecked;
    setIsChecked(newStatus);
    inSavedMoviePage
      ? props.onSavedToggle(newStatus)
      : props.onToggle(newStatus);
    inSavedMoviePage
      ? props.onSavedSearch(userInput)
      : props.onSearch(userInput);
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-form__label">
          <input
            className="search-form__input"
            placeholder="Movie"
            maxLength={40}
            value={userInput}
            onChange={handleInputEdit}
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
              onChange={handleToggle}
              className="search-form__short-checkbox"
              checked={isChecked}
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
