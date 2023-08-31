import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import React from "react";
import "./AuthForm.css";

export default function AuthForm(props) {
  const formClass = `auth-form__form auth-form__form_type_${props.name}`;
  const submitClass = `auth-form__button auth-form__button_type_${props.name}`;

  return (
    <section className="auth-form">
      <div className="auth-form__container">
        <Link to="/">
          <img className="auth-form__img" src={logo} alt="Логотип сайта" />
        </Link>
        <h1 className="auth-form__title">{props.title}</h1>
        <form
          className={formClass}
          name={`${props.name}`}
          onSubmit={props.onSubmit}
        >
          {props.children}

          <div className="auth-form__wrapper">
            <button type="submit" className={submitClass}>
              {props.submitButtonText}
            </button>
            <p className="auth-form__text">
              {props.text}
              <Link to={props.linkPath} className="auth-form__link">
                {props.linkText}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

