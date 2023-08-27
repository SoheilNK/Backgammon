import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../services/useLocalStorage";
import { clearGameData } from "../services/user.service";

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
  const [p1, setPlayer1] = useLocalStorage("player1", "");
  const [p2, setPlayer2] = useLocalStorage("player2", "");
  const [scores, setScores] = useLocalStorage("scores", [0, 0]);
  let player1 = p1;
  let player2 = p2;

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [oldPlayer, setOldPlayer] = useState("");
  const [animation, setAnimation] = useState(false);

  let winner1 = "";
  let newMessage = "";

  //check for winner
  //set Scores
  //We have a winner
  let newScores = [...scores];
  if (whiteOut == 15) {
    newScores[0] = scores[0] + 1;
    winner1 = player1;
  }
  if (blackOut == 15) {
    newScores[1] = scores[1] + 1;
    winner1 = player2;
  }

  useEffect(() => {
    if (moveLeft === 0) {
      setAnimation(true);

      // Disable the animation after a delay
      setTimeout(() => {
        setAnimation(false);
      }, 1000);
    }
  }, [moveLeft]);

  if (winner1 != "") {
    return (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
        <div
          style={{ backgroundColor: "#8E8268" }}
          className=" flex-col  text-lg px-8  max-w-md smx-auto rounded-xl shadow-lg sm:flex sm:items-center   sm:py-1 text-center "
        >
          <h2>GAME OVER!</h2>
          <h2 className=" text-xl">
            <strong>{winner1}</strong> won this game!
          </h2>
          <h1>SCORES</h1>
          <div className="flex w-full p-2 gap-4">
            <strong className="w-1/2 bg-yellow-200 text-black rounded-md p-1">
              {player1 + ": " + newScores[0]}
            </strong>{" "}
            <strong className="w-1/2 bg-yellow-200 text-black rounded-md p-1">
              {player2 + ": " + newScores[1]}
            </strong>{" "}
          </div>
          <div className="flex w-full p-4 gap-4">
            <button
              onClick={() => (
                clearGameData(),
                localStorage.setItem("player1", JSON.stringify(player1)),
                localStorage.setItem("player2", JSON.stringify(player2)),
                localStorage.setItem("scores", JSON.stringify(newScores)),
                window.location.reload()
              )}
              className="w-1/2 bg-blue-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              Continue
            </button>
            <button
              onClick={() => (
                clearGameData(), navigate("/users"), window.location.reload()
              )}
              className="w-1/2 bg-blue-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              New Players
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    if (moveLeft === 0) {
      newMessage = currentPlayer + " Roll the Dice!";
    } else {
      newMessage = currentPlayer + " You have " + moveLeft + " moves left.";
    }

    if (message != newMessage) {
      setMessage(newMessage);
      setOldPlayer(currentPlayer);
    }

    return (
      <div id="chat" className=" text-xs sm:text-base w-3/4  m-auto">
        <div
          style={{ backgroundColor: "#8E8268" }}
          className={
            " scale-90  text-white py-1 px-2 mx-2 rounded-xl shadow-lg sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 sm:py-1 text-center " +
            (animation ? " animate-spin" : "")
          }
        >
          <div className="p-1 ">
            {/* <strong className=" truncate bg-yellow-200 text-black rounded-md p-1">
              {currentPlayer}
            </strong> */}
            {newMessage}
          </div>
        </div>
      </div>
    );
  }
}
