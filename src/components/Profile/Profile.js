import "./Profile.css";

import React, { useState, useEffect } from "react";
import mainApi from "../../utils/MainApi";

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
  };

  const handleEditClick = () => {
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
            <div className="profile__line"></div>
            <label className="profile__label">
              <span className="profile__label-text">E-mail</span>

              <input
                type="email"
                name="email"
                className="profile__input"
                value={formValue.email}
                onChange={handleChangeValue}
                readOnly={!isEditing}
              ></input>
            </label>
          </form>
          <div className="profile__wrapper">
            {isEditing ? (
              <button
                type="submit"
                className="profile__button profile__button-submit"
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
