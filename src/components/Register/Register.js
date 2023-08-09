import React, { useState } from "react";
import "./Register.css";
import AuthForm from "../AuthForm/AuthForm";
import mainApi from "../../utils/MainApi";

export default function Register({ handleRegister }) {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { name, email, password } = formValue;
      await mainApi.getRegisterUser({ name, email, password });
      setIsLoading(false);
      handleRegister();
    } catch (err) {
      setIsLoading(false);
      setRegistrationError("Ошибка при регистрации");
    }
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      title="Добро пожаловать!"
      name="register"
      submitButtonText={isLoading ? "Регистрация..." : "Зарегистрироваться"}
      text="Уже зарегистрированы?"
      linkPath="/login"
      linkText="Войти"
    >
      <label className="auth-form__label">
        Имя
        <input
          onChange={handleChange}
          className="auth-form__input auth-form__input_type-name"
          type="text"
          name="name"
          required
          id="name-input"
        ></input>
        <span className="auth-form__input-error name-input-error"></span>
      </label>

      <label className="auth-form__label">
        E-mail
        <input
          onChange={handleChange}
          className="auth-form__input auth-form__input_type-email"
          type="email"
          name="email"
          required
          id="email-input"
        ></input>
        <span className="auth-form__input-error email-input-error"></span>
      </label>

      <label className="auth-form__label">
        Пароль
        <input
          onChange={handleChange}
          className="auth-form__input auth-form__input_type-password"
          type="password"
          name="password"
          required
          id="password-input"
        ></input>
        <span className="auth-form__input-error password-input-error"></span>
      </label>
      <span className="auth-form__input-error">{registrationError}</span>
    </AuthForm>
  );
}
