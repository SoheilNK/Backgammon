"use client";

import { ErrorBoundary } from "react-error-boundary";
import GamePlay from "../GamePlay";
import Navbar from "../Navbar";
import { Footer } from "../Footer";
import { useLocalStorage } from "../useLocalStorage";
import {Alert} from "../Alert";

export function Game() {
    // const [started, setStarted] = useLocalStorage("started", "yes");
  // const [alertMessage, setAlertMessage] = useLocalStorage("alertMessage", "");
    

  return (
    <div className="  w-screen bg-slate-100">
      <Navbar title={"SoSep Backgammon"} />
      <div className=" relative w-screen bg-slate-100">
        <div className="container m-auto p-2">
          <div className=" md:w-3/4 bg-white relative  rounded-md m-auto">
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              {" "}
              <GamePlay />
            </ErrorBoundary>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
