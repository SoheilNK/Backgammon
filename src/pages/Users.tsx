import { Intro } from "../Intro";
import Navbar from "../Navbar";
import { Footer } from "../Footer";
import { useState } from "react";
interface UsersProps {
  isGameStarted: boolean;
}
export function Users({ isGameStarted }: UsersProps) {
  const [isGameStarted1, setIsGameStarted1] = useState(isGameStarted);

  return (
    <div className="  w-screen bg-slate-100 ">
      <Navbar title={"SoSep Backgammon"} />
      <div className=" w-screen bg-slate-100  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
        <div className="container m-auto p-4 ">
          <div className=" sm:w-3/4 bg-white relative  rounded-md p-8 m-auto  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
            <Intro
              isGameStarted={isGameStarted}
              onGameStarted={setIsGameStarted1}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
