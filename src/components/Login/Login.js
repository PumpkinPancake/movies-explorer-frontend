import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import mainApi from "../../utils/MainApi";
import useFormValidation from "../../Hooks/useFormValidation";
import { errorMessage, inputErrorMessage } from "../../utils/Constants";

const validationMessages = {
  email: inputErrorMessage.email,
  password: inputErrorMessage.passwordLogin,
};

export default function Login({ handleLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const [loginError, setLoginError] = useState("");
  const { errors, resetErrors, handleChange } = useFormValidation();

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
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      title="Рады видеть!"
      name="login"
      submitButtonText={isLoading ? "Вход..." : "Войти"}
      text="Ещё не зарегистрированы?"
      linkPath="/signup"
      linkText="Регистрация"
    >
      <label className="auth-form-label">
        E-mail
        <input
          onChange={handleChangeValue}
          value={formValue.email}
          className={`auth-form-input ${
            errors.email ? "auth-form-input_error" : ""
          }`}
          type="email"
          name="email"
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

      <label className="auth-form-label auth-form-label_login">
        Пароль
        <input
          onChange={handleChangeValue}
          value={formValue.password}
          className={`auth-form-input ${
            errors.password ? "auth-form-input_error" : ""
          }`}
          type="password"
          name="password"
          required
          minLength={8}
          id="password-input"
          placeholder="Введите ваш пароль"
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
      <span className="auth-form-input-error-span">{loginError}</span>
    </AuthForm>
  );
}
