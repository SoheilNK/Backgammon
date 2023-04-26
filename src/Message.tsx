import classNames from "classnames";
import { useEffect, useState } from "react";

interface MessageProps {
  currentPlayer: string;
  moveLeft: number;
  whiteOut: number;
  blackOut: number;
}
export function Message({
  currentPlayer,
  moveLeft,
  whiteOut,
  blackOut,
}: MessageProps) {
  const [message, setMessage] = useState("");
  let winner1 = "";
  let showFlash;
  let newMessage = "";

  //check for winner
  if (whiteOut == 15 || blackOut == 15) {
    winner1 = currentPlayer;
  }

  if (winner1 != "") { 
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className=" flex-col   bg-amber-900  text-yellow-200 text-lg px-8  max-w-md smx-auto rounded-xl shadow-lg sm:flex sm:items-center   sm:py-1 text-center ">
          <h2>GAME OVER!</h2>
          <h2 className=" text-xl">{winner1} won the game!</h2>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          >
            Play again
          </button>
        </div>
      </div>
    );
  } else {
    if (moveLeft === 0) {
      newMessage = currentPlayer + " roll the dice";
    } else {
      newMessage = currentPlayer + " you have " + moveLeft + " moves left";
    }

    if (message != newMessage) {
      setMessage(newMessage);
    }

    return (
      <div className=" container flex">
        <div
          id="alert"
          className={classNames(
            " scale-90 sm:scale-125 py-1 px-8 max-w-sm mx-auto rounded-xl bg-amber-900 text-white shadow-lg sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 sm:py-1 text-center "
          )}
        >
          <div id="alert">{message}</div>
        </div>
      </div>
    );
  }
}
