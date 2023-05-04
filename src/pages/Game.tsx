import GamePlay from "../GamePlay";
import Navbar from "../Navbar";
import { Footer } from "../Footer";
import { useLocalStorage } from "../useLocalStorage";

export function Game() {
    const [started, setStarted] = useLocalStorage("started", "yes");

    

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
