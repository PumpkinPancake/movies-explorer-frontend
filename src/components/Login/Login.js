import React, { useState } from "react";
import "./Login.css";
import AuthForm from "../AuthForm/AuthForm";

export default function Login(handleLogin) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin(formValue.email, formValue.password);
  };

  return (
    <AuthForm
      title="Рады видеть!"
      name="login"
      submitButtonText="Войти"
      text="Ещё не зарегистрированы?"
      linkPath="/register"
      linkText="Регистрация"
    >
      <label className="auth-form__label">
        E-mail
        <input
          className="auth-form__input auth-form__input_type-email"
          type="email"
          name="email"
          required
          id="email-input"
          value="Shantuk.shakti@gmail.ru"
        ></input>
        <span className="auth-form__input-error email-input-error"></span>
      </label>

      <label className="auth-form__label">
        Пароль
        <input
          className="auth-form__input auth-form__input_type-password"
          type="password"
          name="password"
          required
          id="password-input"
          value="123456"
        ></input>
        <span className="auth-form__input-error password-input-error"></span>
      </label>
    </AuthForm>
  );
}
