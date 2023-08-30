export const MOVIES_API = {
  url: "https://api.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
};

export const MAIN_API = {
  url: "https://api.shakti.nomoredomains.work",
  headers: {
    "Content-Type": "application/json",
  },
};

export const inputErrorMessage = {
  name: "Имя должно содержать более двух символов.",
  email: "Пожалуйста, введите допустимый адрес электронной почты.",
  password:
    "Пароль должен состоять минимум из 4-х различных символов, включая заглавные буквы, цифры и специальные символы.",
  search: "Пожалуйста, начните вводить название...",
  login:
    "Проверьте, не допущены ли ошибки в логине и пароле. Пожалуйста, повторите попытку или зарегистрируйтесь.",
};

export const errorMessage = {
  conflict: "Пользователь с таким e-mail уже существует",
  other: "Ошибка при регистрации.",
  login: "Неверный email или пароль.",
};
