export const MOVIES_API = {
  url: "https://api.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
};

export const MAIN_API = {
  url: "https://api.shakti.nomoredomains.work",
  // url: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
};

export const inputErrorMessage = {
  name: "Имя должно содержать более двух символов.",
  email: "Пожалуйста, введите допустимый адрес электронной почты.",
  password:
    "Пароль должен состоять минимум из 8 символов, включая заглавные буквы, цифры и специальные символы.",
  search: "Пожалуйста, начните вводить название...",
  login:
    "Проверьте, не допущены ли ошибки в логине и пароле. Пожалуйста, повторите попытку или зарегистрируйтесь.",
  passwordLogin: "Пароль слишком короткий.",
};

export const errorMessage = {
  conflict: "Пользователь с таким e-mail уже существует",
  other: "Ошибка при регистрации.",
  login: "Неверный email или пароль.",
  search: "Нужно ввести ключевое слово.",
  moviesCardErr:
    "Во время запроса произошла ошибка. Подождите немного и попробуйте еще раз.",
  movieNotFound: "Ничего не найдено",

  name: "Имя должно содержать не менее трёх символов.",
  email: "Пожалуйста, введите допустимый адрес электронной почты.",
  password:
    "Пароль должен содержать не менее четырёх символов, включая заглавные буквы, цифры и специальные символы.",
};

export const SHORTMOVIESDURATION = 40;
export const MAXMOVIESONPAGE = 12;
export const MAXADDMOVIES = 3;
