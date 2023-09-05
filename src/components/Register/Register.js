import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import mainApi from "../../utils/MainApi";
import useFormValidation from "../../Hooks/useFormValidation";
import { inputErrorMessage, errorMessage } from "../../utils/Constants";

const validationMessages = {
  name: inputErrorMessage.name,
  email: inputErrorMessage.email,
  password: inputErrorMessage.password,
};

export default function Register({ handleLogin }) {
  const { errors, resetErrors, handleChange } = useFormValidation();
  const [loginError, setLoginError] = useState("");

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });

    handleChange(e);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    mainApi
      .getRegisterUser(formValue)
      .then(() => {
        const { email, password } = formValue;
        mainApi
          .getLoginUser(formValue)
          .then((res) => {
            localStorage.setItem("jwt", res.token);
            handleLogin();
          })
          .catch((err) => {
            setLoginError(errorMessage.login);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 409) {
            setRegistrationError(errorMessage.conflict);
          } else {
            setRegistrationError(errorMessage.other);
          }
        } else {
          setRegistrationError(errorMessage.other);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthForm
      isFormValid={isFormValid}
      title="Добро пожаловать!"
      name="register"
      submitButtonText={isLoading ? "Регистрация..." : "Зарегистрироваться"}
      text="Уже зарегистрированы?"
      linkPath="/signin"
      linkText="Войти"
      onSubmit={handleSubmit}
    >
      <label className="auth-form-label">
        Имя
        <input
          onChange={handleChangeValue}
          className={`auth-form-input ${
            errors.name ? "auth-form-input_error" : ""
          }`}
          type="text"
          name="name"
          value={formValue.name}
          minLength={2}
          maxLength={40}
          required
          id="name-input"
          placeholder="Придумайте имя"
        ></input>
        {errors.name && (
          <span
            className={`auth-form-input-error-text ${
              errors.name ? "auth-form-input-error-text_active" : ""
            }`}
          >
            {validationMessages.name}
          </span>
        )}
      </label>

      <label className="auth-form-label">
        E-mail
        <input
          onChange={handleChangeValue}
          className={`auth-form-input ${
            errors.email ? "auth-form-input_error" : ""
          }`}
          type="email"
          name="email"
          value={formValue.email}
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          required
          id="email-input"
          placeholder="example@gmail.ru"
        ></input>
        {errors.email && (
          <span
            className={`auth-form-input-error-text ${
              errors.email ? "auth-form-input-error-text_active" : ""
            }`}
          >
            {validationMessages.email}
          </span>
        )}
      </label>

      <label className="auth-form-label auth-form-label_register">
        Пароль
        <input
          onChange={handleChangeValue}
          className={`auth-form-input ${
            errors.password ? "auth-form-input_error" : ""
          }`}
          type="password"
          name="password"
          value={formValue.password}
          minLength={8}
          required
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          id="password-input"
          placeholder="Придумайте пароль"
        ></input>
        {errors.password && (
          <span
            className={`auth-form-input-error-text ${
              errors.password ? "auth-form-input-error-text_active" : ""
            }`}
          >
            {validationMessages.password}
          </span>
        )}
      </label>
      <span className="auth-form-input-error-span">
        {registrationError || loginError}
      </span>
    </AuthForm>
  );
}
