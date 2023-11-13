import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./pages/error-page";
import GamePage from "./pages/Game";
import HomePage from "./pages/Home";
import UsersPage from "./pages/Users";
import OnlineGamePage from "./pages/OnlineGame";
import { HashRouter, Route, Routes, Link } from "react-router-dom";

import LoginPage from "./pages/SignIn";
import MyProfile from "./pages/MyProfile";
import ForgotPassPage from "./pages/ForgotPass";

import { unstable_HistoryRouter as Router } from "react-router-dom"; //***************** */
import history from "./history";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router history={history}>
      <Routes>
        <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
        <Route
          path="/users"
          element={<UsersPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/game"
          element={<GamePage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/onlinegame"
          element={<OnlineGamePage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/myprofile"
          element={<MyProfile />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/signin"
          element={<LoginPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassPage />}
          errorElement={<ErrorPage />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
