import "./Profile.css";

import Header from "../Header/Header";
import { CurrentUserContext } from "../Context/CurrentUserContext";
import { useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";

export default function Profile() {
  return (
    <>
      <Header />
      <section className="profile">
        <h1 className="profile__title">Привет, Настюша!</h1>
        <form className="profile__form" id="profile__form">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              type="text"
              name="name"
              className="profile__input"
              minLength={2}
              maxLength={30}
              value="Настюша"
            ></input>
            {/* <span className="profile__input-error"></span> */}
          </label>
          <div className="profile__line"></div>
          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>

            <input
              type="email"
              name="email"
              className="profile__input"
              value="Shantuk.shakti@gmail.com"
            ></input>
            {/* <span className="profile__input-error"></span> */}
          </label>
        </form>
        <div className="profile__wrapper">
          <button type="submit" className="profile__button profile__button-submit">
            Редактировать
          </button>
          <button className="profile__button profile__button-exit">Выйти из аккаунта</button>
        </div>
      </section>
    </>
  );
}
