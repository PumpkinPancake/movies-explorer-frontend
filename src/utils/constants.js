export const MOVIES_API = {
  url: "https://api.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
};

export const MAIN_API = {
  url: "https://api.shakti.nomoredomains.work",
  headers: {
    authorization: "2c59af59-10dc-43f4-ae75-be202fc5c582",
    "Content-Type": "application/json",
  },
};

export const inputErrorMessage = {
  name: "Имя должно содержать не менее трёх символов.",
  email: "Пожалуйста, введите допустимый адрес электронной почты.",
  password:
    "Пароль должен содержать не менее четырёх символов, включая заглавные буквы, цифры и специальные символы.",
  search: "Пожалуйста, начните вводить название для поиска.",
  login:
    "Проверьте ваш логин и пароль, убедитесь, что они введены правильно, либо выполните регистрацию, если у вас ещё нет аккаунта.",
};

export const errorMessage = {
  conflict: "Пользователь с таким e-mail уже существует",
  other: "Ошибка при регистрации.",
  login: "Неверный email или пароль.",
};
