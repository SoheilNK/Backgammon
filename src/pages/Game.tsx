"use client";

import { ErrorBoundary } from "react-error-boundary";
import GamePlay from "../components/GamePlay";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import PageClass from "../components/PageClass";

function Game() {

  return (
    // <div className="  w-screen bg-slate-100">
    //   <Navbar title={"SoSep Backgammon"} />
    //   <div className=" relative w-screen bg-slate-100">
    //     <div className="container m-auto p-2">
    //       <div className=" md:w-3/4 bg-white relative  rounded-md m-auto">
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              {" "}
              <GamePlay />
            </ErrorBoundary>
  //         </div>
  //       </div>
  //     </div>
  //     <Footer />
  //   </div>
  );
}

const GamePage: React.FC = () => {
  return (
    <div className="w-1/2">
      <PageClass inputComponent={Game} />
    </div>
  );
};

export default GamePage;
