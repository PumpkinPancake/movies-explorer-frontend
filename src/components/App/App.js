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

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/signin");
  };

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser({});
    navigate("/signin");
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setLoggedIn(false);
      return;
    }
    mainApi
      .getToken(jwt)
      .then((res) => {
        if (res) {
          mainApi.getUserInfo().then((userInfo) => {
            setCurrentUser(userInfo);
            setLoggedIn(true);
          });
        }
      })
      .catch((err) => {
        console.log("Error response:", err.response);
        console.log("Error message:", err.message);
      });
  };

  useEffect(() => {
    tokenCheck();
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
          path="/signup"
          element={<Register handleRegister={handleRegister} />}
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
              <ProtectedRoute loggedIn={loggedIn} component={Movies} />
            </>
          }
        ></Route>
        <Route
          path="/saved-movies"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <ProtectedRoute loggedIn={loggedIn} component={SavedMovies} />
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
