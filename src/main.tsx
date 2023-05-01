import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
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
    path: "/Backgammon/users",
    element: <Users />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
