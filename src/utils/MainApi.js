import { MAIN_API } from "./constants";
import { MOVIES_API } from "./constants";

class MainApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleResponce(res) {
    console.log("Response status:", res.status);

    if (res.ok) {
      return res.json();
    }

    if (res.status === 401) {
      console.log("Unauthorized error:", res);
    }

    console.log("Error response:", res);

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getRegisterUser({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((res) => this._handleResponce(res));
  }

  getLoginUser({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => this._handleResponce(res));
  }

  getLogoutUser() {
    return fetch(`${this._url}/signout`, {
      method: "GET",
    }).then((res) => this._handleResponce(res));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponce);
  }

  setUserInfo({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then((res) => this._handleResponce(res));
  }

  getToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponce);
  }

  editUser(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then((res) => this._handleResponce(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._handleResponce(res));
  }

  saveMovie(movie) {
    console.log("Saving movie with data:", movie);
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then((res) => this._handleResponce(res));
  }

  getUserMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._handleResponce(res));
  }
}

const mainApi = new MainApi(MAIN_API);
export default mainApi;
