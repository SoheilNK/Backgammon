import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./pages/error-page";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { HashRouter, Route, Routes } from "react-router-dom";

import Profile from "./components/Profile";
import LoginPage from "./pages/SignIn";
import Register from "./components/Register";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
        <Route path="/users" element={<Users />} errorElement={<ErrorPage />} />
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
