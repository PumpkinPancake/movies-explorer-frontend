import { MOVIES_API } from "./constants";

class MoviesApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      headers: this._headers,
    }).then((res) => this._handleResponce(res));
  }
}

const moviesApi = new MoviesApi(MOVIES_API);
export default moviesApi;