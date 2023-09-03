import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import { CurrentUserContext } from "../Context/CurrentUserContext";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [moviesData, setMoviesData] = useState([]);
  const [savedMoviesData, setSavedMoviesData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // const handleRegister = () => {
  //   handleLogin();
  //   navigate("/movies");
  // };

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/movies");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.clear();
    setCurrentUser({});
    navigate("/signin");
  };

  const tokenCheck = async () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      return mainApi
        .getToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser({
            ...currentUser,
            ...res,
          });
        })
        .then(() => {
          navigate(location, { replace: true });
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    tokenCheck()
      .then()
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([moviesApi.getMovies(), mainApi.getUserMovies()]).then(
        (res) => {
          const movies = res[0];
          const savedMovies = res[1];

          const updatesMovies = movies.map((movie) => {
            const savedMovie = savedMovies.find(
              (saved) => saved.movieId === movie.id,
            );
            if (savedMovie) {
              return {
                ...movie,
                class: "isSaved",
                key: movie.id,
              };
            }
            return { ...movie, class: "isNotSaved", key: movie.id };
          });

          const updatedSavedMovies = savedMovies.map((movie) => {
            return { ...movie, class: "isRemove", key: movie.id };
          });
          setMoviesData(updatesMovies);
          setSavedMoviesData(updatedSavedMovies);
        },
      );
    }
  }, [loggedIn]);

  function handleSave(movie) {
    mainApi
      .saveMovie(movie)
      .then((res) => {
        setMoviesData((state) =>
          state.map((el) =>
            el.id === res.movieId ? { ...el, class: "isSaved" } : el,
          ),
        );
        res.class = "isRemove";
        setSavedMoviesData((data) => [...data, res]);
      })

      .catch((err) => console.log(err));
  }

  function handleDelete(deleteMovieId) {
    const deleteMovie = savedMoviesData.find(
      (movie) => movie.movieId === deleteMovieId,
    );

    mainApi
      .deleteMovie(deleteMovie._id)
      .then(() => {
        setSavedMoviesData((state) =>
          state.filter((el) => el.movieId !== deleteMovieId),
        );

        setMoviesData((state) =>
          state.map((el) =>
            el.id === deleteMovieId ? { ...el, class: "isNotSaved" } : el,
          ),
        );
      })
      .catch((err) => console.error(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <Main />
            </>
          }
        ></Route>

        <Route
          path="/profile"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Profile}
                handleLogout={handleLogout}
              />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header loggedIn={loggedIn} />

              <ProtectedRoute
                loggedIn={loggedIn}
                component={Profile}
                handleLogout={handleLogout}
              />
            </>
          }
        />
        <Route
          path="/signup"
          element={<Register handleLogin={handleLogin}/>}
        ></Route>

        <Route
          path="/signin"
          element={<Login handleLogin={handleLogin} />}
        ></Route>
        <Route
          path="/movies"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Movies}
                moviesData={moviesData}
                handleSave={handleSave}
                handleDelete={handleDelete}
              />
            </>
          }
        ></Route>
        <Route
          path="/saved-movies"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <ProtectedRoute
                loggedIn={loggedIn}
                component={SavedMovies}
                handleDelete={handleDelete}
                savedMoviesData={savedMoviesData}
              />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <NotFound />
            </>
          }
        ></Route>
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
