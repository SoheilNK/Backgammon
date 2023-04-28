import AboutBackgammon from "../AboutBackgammon";
import Navbar from "../Navbar";
import { Footer } from "../footer";

export function About() {
  return (
    <div className="  w-screen bg-slate-100">
      <Navbar title={"SoSep Backgammon"} />
      <div className=" w-screen bg-slate-100">
        <div className="container m-auto p-4">
          <div className=" sm:w-3/4 bg-white relative  rounded-md p-8 m-auto">
            <AboutBackgammon />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
