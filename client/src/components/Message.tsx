import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../services/useLocalStorage";
import { clearGameData, getUser } from "../services/user.service";
import { on } from "events";
import { sendWsMessage } from "./Chat";
import * as type from "../types";

interface MessageProps {
  scores: number[];
  onSetScores: (scores: number[]) => void;
  onResetState: () => void;
  currentPlayer: string;
  onCurrentPlayer: (player: string) => void;
  player1: string;
  player2: string;
  moveLeft: number;
  whiteOut: number;
  blackOut: number;
  started: string;
  onStarted: (started: string) => void;
}
export function Message({
  scores,
  onSetScores,
  onResetState,
  currentPlayer,
  onCurrentPlayer,
  player1,
  player2,
  moveLeft,
  whiteOut,
  blackOut,
  started,
  onStarted,
}: MessageProps): JSX.Element {
  const [online, setOnline] = useLocalStorage("online", false);

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [oldPlayer, setOldPlayer] = useState("");
  const [animation, setAnimation] = useState(false);
  const username = getUser().username.toString();
  let onlineGame: type.OnlineGame;
  let matchId = "";
  let hostName = "";
  if (online) {
    //get onlineGame from local storage
    onlineGame = JSON.parse(localStorage.getItem("onlineGame")!);
    matchId = onlineGame.matchId;
    hostName = onlineGame.hostName;
    if (username === hostName) {
      var msgFor = "guest";
      var msgFrom = "host";
    } else {
      var msgFor = "host";
      var msgFrom = "guest";
    }
  }

  let winner1 = "";
  let newMessage = "";

  //check for winner
  //set Scores
  //We have a winner
  let newScores = [...scores];
  if (whiteOut === 15) {
    newScores[0] = scores[0] + 1;
    winner1 = player1;
  }
  if (blackOut === 15) {
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

  if (winner1 !== "") {
    return (
      <div
        id="winnerMessage"
        className="absolute top-1/2 translate-y-1/2 left-1/2 transform -translate-x-1/2 z-20"
      >
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
              onClick={() => {
                onResetState();
                onSetScores(newScores);
                onCurrentPlayer(winner1);
                onStarted("yes");
              }}
              className="w-1/2 bg-blue-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              Continue
            </button>
            <button
              onClick={() => {
                if (!online) {
                  clearGameData();
                }
                navigate("/users");
                window.location.reload();
              }}
              className="w-1/2 bg-blue-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              New Game
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

    if (message !== newMessage) {
      setMessage(newMessage);
      setOldPlayer(currentPlayer);
    }

    return (
      <div id="gameMessage" className=" text-xs sm:text-base w-3/4  m-auto">
        <div
          style={{ backgroundColor: "#8E8268" }}
          className={
            " scale-90  text-white py-1 px-2 mx-2 rounded-xl shadow-lg sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 sm:py-1 text-center " +
            (animation ? " animate-spin" : "")
          }
        >
          <div className="p-1 ">{newMessage}</div>
        </div>
      </div>
    );
  }
}
