import React, { useState, useEffect } from "react";
import mainApi from "../../utils/MainApi";
import "./Profile.css";
import { inputErrorMessage } from "../../utils/Constants";
import useFormValidation from "../../Hooks/useFormValidation";

export default function Profile({ handleLogout }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
  });
  const [editingValue, setEditingValue] = useState({
    name: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { errors, resetErrors, handleChange } = useFormValidation();

  const validationMessages = {
    email: inputErrorMessage.email,
    name: inputErrorMessage.name,
  };

  useEffect(() => {
    setIsLoading(true);
    mainApi
      .getUserInfo()
      .then((userInfo) => {
        setFormValue({
          name: userInfo.name,
          email: userInfo.email,
        });
        setEditingValue({
          name: userInfo.name,
          email: userInfo.email,
        });
      })
      .catch((err) => {
        console.error("Ошибка при загрузке данных пользователя:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
    setIsDataChanged(value !== editingValue[name]);

    const form = e.target.closest("form");
    if (form) {
      const isValid = form.checkValidity();
      setIsFormValid(isValid);
    }

    if (!value) {
      resetErrors({ ...errors, [name]: "" });
    } else {
      const { validity } = e.target;
      resetErrors({
        ...errors,
        [name]: validity.valid ? "" : validationMessages[name],
      });
    }
  };

  const handleEditClick = () => {
    if (!isEditing) {
      setEditingValue({ ...formValue });
      setIsDataChanged(false);
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    mainApi
      .setUserInfo(formValue)

      .then((res) => {
        setFormValue({
          name: res.name,
          email: res.email,
        });
        setEditingValue({
          name: res.name,
          email: res.email,
        });
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Ошибка при обновлении данных пользователя:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <main>
        <section className="profile">
          <h1 className="profile__title">Привет, {formValue.name}!</h1>
          <form className="profile__form" id="profile__form">
            <label className="profile__label">
              <span className="profile__label-text">Имя</span>
              <input
                type="text"
                name="name"
                className="profile__input"
                minLength={2}
                maxLength={40}
                value={formValue.name}
                onChange={handleChangeValue}
                readOnly={!isEditing}
              ></input>
            </label>
            {errors.name && (
              <span
                className={`auth-form-input-error-text ${
                  errors.name ? "auth-form-input-error-text_active" : ""
                }`}
              >
                {validationMessages.name}
              </span>
            )}

            <div className="profile__line"></div>
            <label className="profile__label">
              <span className="profile__label-text">E-mail</span>
              <input
                type="email"
                name="email"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                className="profile__input"
                value={formValue.email}
                onChange={handleChangeValue}
                readOnly={!isEditing}
              ></input>
            </label>
            {errors.email && (
              <span
                className={`auth-form-input-error-text ${
                  errors.email ? "auth-form-input-error-text_active" : ""
                }`}
              >
                {validationMessages.email}
              </span>
            )}
          </form>
          <div className="profile__wrapper">
            {isEditing ? (
              <button
                type="submit"
                disabled={!isDataChanged || !isFormValid}
                className={`${
                  isDataChanged && isFormValid
                    ? "profile__button profile__button-submit"
                    : "profile__button-submit_disabled"
                }`}
                onClick={handleSubmit}
              >
                Сохранить
              </button>
            ) : (
              <button
                type="button"
                className="profile__button profile__button-edit"
                onClick={handleEditClick}
              >
                Редактировать
              </button>
            )}
            <button
              onClick={handleLogout}
              className="profile__button profile__button-exit"
            >
              Выйти из аккаунта
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
