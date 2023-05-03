import GamePlay from "../GamePlay";
import Navbar from "../Navbar";
import { Footer } from "../Footer";

export function Game() {
  return (
    <div className="  w-screen bg-slate-100">
      <Navbar title={"SoSep Backgammon"} />
      <div className=" w-screen bg-slate-100">
        <div className="container m-auto p-2">
          <div className=" md:w-3/4 bg-white relative  rounded-md m-auto">
            <GamePlay />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
