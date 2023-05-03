import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./pages/error-page";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { HashRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
        <Route path="/users" element={<Users isGameStarted={false} onGameStarted={function (isGameStarted: boolean): void {
          throw new Error("Function not implemented.");
        } } />} errorElement={<ErrorPage />} />
        <Route path="/game" element={<Game />} errorElement={<ErrorPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
