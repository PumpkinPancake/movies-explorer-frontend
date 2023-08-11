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
  name: "Имя должно быть длинее твоего члена/клитора",
  email: "Присутствуют недопустимые (как твое поведение) символы",
  password:
    "Пароль должен быть не меньше (?твой член : клитор)*4, буквы допустимы только из вражеского языка англосаксов, необходимо использовать заглавную там фигню, цифры и спецсимволы, будто ты в 10 лет придумываешь ник в соц-сети.",
  search: "Че смотришь? Начни вводить назв..",
  login:
    "Проверь-ка, не отсталый ли ты (и логин с паролем), повтори попытку или зарегистрируйся",
};

export const errorMessage = {
  conflict: "Пользователь с таким e-mail уже существует",
  other: "Ошибка при регистрации.",
  login: "Неверный email или пароль.",
};
