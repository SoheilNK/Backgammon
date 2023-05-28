import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./pages/error-page";
import Game from "./pages/Game";
import HomePage from "./pages/Home";
import UsersPage from "./pages/Users";
import { HashRouter, Route, Routes } from "react-router-dom";

import Profile from "./components/Profile";
import LoginPage from "./pages/SignIn";
import Register from "./components/Register";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
        <Route
          path="/users"
          element={<UsersPage />}
          errorElement={<ErrorPage />}
        />
        <Route path="/game" element={<Game />} errorElement={<ErrorPage />} />
        <Route
          path="/profile"
          element={<Profile />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/signin"
          element={<LoginPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/signup"
          element={<Register />}
          errorElement={<ErrorPage />}
        />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
