import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { CurrentUserContext } from "../Context/CurrentUserContext";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import mainApi from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main />}></Route>

        <Route path="/profile" element={<Profile />}></Route>
        <Route
          path="/register"
          element={<Register handleRegister={() => navigate("/login")} />}
        ></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/saved-movies" element={<SavedMovies />} />
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
