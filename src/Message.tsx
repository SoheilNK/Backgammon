import classNames from "classnames";
import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { Board } from "./Board";

interface MessageProps {
  currentPlayer: string;
  moveLeft: number;
  whiteOut: number;
  blackOut: number;
  scores: number[];
}
export function Message({
  currentPlayer,
  moveLeft,
  whiteOut,
  blackOut,
  scores,
}: MessageProps) {
  const { state } = useLocation();
  const { player1, player2 } = state; // Read values passed on state
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  let winner1 = "";
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
          <h2 className=" text-xl">
            <strong>{winner1}</strong> won this game!
          </h2>
          <h2>SCORES</h2>
          <h2>{player1 + " " + scores[0] + " " + player2 + " " + scores[1]}</h2>
          <div className="flex p-4 gap-4">
            <button
              onClick={() => (
                navigate("/Backgammon/Game", {
                  state: {
                    player1: player1,
                    player2: player2,
                    newScores: scores,
                  },
                }),
                //reload page
                window.location.reload()
              )
              }
              className="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              Continue
            </button>
            <button
              onClick={() => (navigate("/Backgammon"),
               window.location.reload())}
              className="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              New Players
            </button>
          </div>
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
          className={
            " scale-90 sm:scale-125 py-1 px-8 max-w-sm mx-auto rounded-xl bg-amber-900 text-white shadow-lg sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 sm:py-1 text-center "
          }
        >
          <div>{newMessage}</div>
        </div>
      </div>
    );
  }
}
