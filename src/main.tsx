import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import { About } from "./pages/About";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
//
const router = createBrowserRouter([
  {
    path: "/Backgammon",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Backgammon/Game",
    element: <Game />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Backgammon/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
