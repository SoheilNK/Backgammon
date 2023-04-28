import AboutBackgammon from "../AboutBackgammon";
import { Intro } from "../Intro";
import Navbar from "../Navbar";
import { Footer } from "../footer";

export function Home() {
  return (
    <div className="  w-screen bg-slate-100">
      <Navbar title={"SoSep Backgammon"} />
      <div className=" w-screen bg-slate-100">
        <div className="container m-auto p-4">
          <div className=" sm:w-3/4 bg-white relative  rounded-md p-8 m-auto">
            <Intro />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
