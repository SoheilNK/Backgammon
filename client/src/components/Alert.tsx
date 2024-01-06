import { Color, TdiceRoll } from "./GamePlay";
import { anyMoveAvailable } from "../services/gameRules";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser } from "../services/user.service";
interface AlertProps {
  gameState: string;
  onGameState: (gameState: string) => void;
  alertSeen: boolean;
  onAlertSeen: (seen: boolean) => void;
  currentBoardState: Color[][];
  currentPlayer: string;
  currentDiceRoll: TdiceRoll;
  whiteBar: number;
  blackBar: number;
  rollTime: number;
  moveLeft: number;
  whiteOut: number;
  blackOut: number;
  onMoveLeft: (moves: number) => void;
  onResetState: () => void;
}
export function Alert({
  gameState,
  onGameState,
  alertSeen,
  onAlertSeen,
  currentBoardState,
  currentPlayer,
  currentDiceRoll,
  whiteBar,
  blackBar,
  moveLeft,
  whiteOut,
  blackOut,
  onMoveLeft,
  onResetState,
}: AlertProps) {
  let alertMessage: string = "";
  let isOnline = localStorage.getItem("online");
  let noMoves = false;
  let username = getUser().username;
    
  const navigate = useNavigate();
  //define a countdown timer state
  const [countDown, setCountDown] = useState(5);
  

  if (gameState === "starting") {
    alertSeen = false;
    //show a count down timer from 5 to 1
    alertMessage = "The game will start in " + countDown + " seconds";
    //set a timer to start the game after 5 seconds
    setTimeout(() => {
      if (countDown === 0) {
        onGameState("playing");
        setCountDown(5);
      }
      setCountDown(countDown - 1);
    }, 1000);
  }


  if (gameState === "abandoned") {
    alertSeen = false;
    alertMessage = "The opponent has left the game, you are the host now";
  }
  if (gameState === "new" && isOnline === "true") {
    alertSeen = false;
    alertMessage = "Please wait for an opponent to join the game or";
    if (countDown !== 5) {
      setCountDown(5);
    }
  }

  //******************check if any move is available */
  let moveAllowed: boolean[] = [true, true];
  moveAllowed = anyMoveAvailable(
    currentBoardState,
    currentPlayer,
    currentDiceRoll,
    whiteBar,
    blackBar
  );

  if (
    (!moveAllowed[0] && !moveAllowed[1] && moveLeft !== 0) ||
    (moveLeft == 0 &&
      whiteOut !== 15 &&
      blackOut !== 15 &&
      (currentDiceRoll[0] != 0 || currentDiceRoll[1] != 0))
  ) {
    alertSeen = false;
    onGameState("noMoves");
    noMoves = true;
    alertMessage =
      currentPlayer +
      " has no possible moves with a roll of " +
      currentDiceRoll;
  }

  if (alertMessage === "") {
    alertSeen = true;
    return null;
  } else {
    return (
      <div
        id="Alert"
        className="absolute top-1/2 left-1/6 transform -translate-x-1/6 -translate-y-1/2 z-20 max-w-xs"
      >
        <div
          style={{ backgroundColor: "#8E8268" }}
          className=" flex-col  text-lg p-2  max-w-md smx-auto rounded-xl shadow-lg sm:flex sm:items-center   sm:py-1 text-center "
        >
          <div className="flex w-full p-4 gap-4">
            <strong className="w-full p-4 bg-yellow-200 text-black rounded-md">
              {alertMessage}
            </strong>{" "}
          </div>
          {gameState === "new" && (
            <button
              onClick={() => {
                onAlertSeen(true);
                navigate("/game");
              }}
              className="bg-blue-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded m-2"
            >
              Go back to the Online Games Table
            </button>
          )}
          {(gameState !== "new" &&
            gameState !== "starting" && !(isOnline && noMoves && currentPlayer === username))&&(
                <button
                  onClick={() => {
                    if (gameState === "noMoves") {
                      onAlertSeen(true);
                      onMoveLeft(0);
                    }
                    if (gameState === "abandoned") {
                      onAlertSeen(true);
                      onGameState("new");
                      onResetState();
                    }
                  }}
                  className="bg-blue-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded m-2"
                >
                  OK
                </button>
              )}
        </div>
      </div>
    );
  }
}
