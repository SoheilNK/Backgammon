import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Intro } from "./Intro";
import { Footer } from "./footer";
import ErrorPage from "./error-page";
import GamePlay from "./GamePlay";
//

const router = createBrowserRouter([
  {
    path: "Backgammon/",
    element: (
      <div className=" bg-slate-100 h-screen">
        <Intro />
        <Footer />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "Backgammon/Game/",
    element: (
      <div className=" bg-slate-100 h-screen">
        <GamePlay />
        <Footer />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
