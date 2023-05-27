import AboutBackgammon from "../components/AboutBackgammon";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import AboutMe from "../components/AboutMe";
import Dice3Dv2 from "../components/Dice3Dv2";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="  w-screen bg-slate-100 ">
      <Navbar title={"SoSep Backgammon"} />
      <div className=" w-screen bg-slate-100  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
        <div className="container m-auto p-1">
          <div className=" sm:w-3/4 bg-white relative  rounded-md p-8 m-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
            <div>
              <h1 className=" text-xl text-black text-center text-clip font-bold  m-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                Welcome to SoSep Backgammon
              </h1>
              <Dice3Dv2 roll1={3} roll2={4} rotate={true} />
            </div>
            <AboutMe />
          </div>
        </div>
        <div className="container m-auto p-1">
          <div className="sm:w-3/4 bg-white relative  rounded-md text-center p-8 m-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
            <Link
              to="/users"
              className="bg-blue-900 hover:bg-sky-700 text-white  font-bold py-2 px-4 rounded disabled:bg-blue-200"
            >
              Alright, let's get this party started!{" "}
            </Link>
          </div>
        </div>

        <div className="container m-auto p-1">
          <div className="sm:w-3/4 bg-white relative  rounded-md text-center p-8 m-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
            <h1 className=" text-xl text-black text-center text-clip font-bold  m-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
              A Short Tutorial
            </h1>
            <video
              controls
              className="sm:w-1/2  md:w-1/2 bg-white relative  rounded-md text-center p-8 m-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <source
                src={"screencast700x700_2023-05-24.mp4"}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="container m-auto p-1 ">
          <div className=" sm:w-3/4 bg-white relative  rounded-md p-8 m-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
            <AboutBackgammon />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
