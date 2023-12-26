import { Color, TdiceRoll } from "./GamePlay";
import { anyMoveAvailable } from "../services/gameRules";
import { on } from "events";

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

  if (gameState === "started") {
    alertSeen = false;
    //show a count down timer from 5 to 1
    alertMessage = "The game will start in " + 5 + " seconds";
    //set a timer to start the game after 5 seconds
    setTimeout(() => {
      onGameState("playing");
    }, 5000);
  }


  if (gameState === "abandoned") {
    alertSeen = false;
    alertMessage = "The opponent has left the game, you are the host now";
  }
  if (gameState === "new") {
    alertSeen = false;
    alertMessage = "Waiting for an opponent to join";
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
        id="Aert"
        className="absolute top-1/2 left-1/6 transform -translate-x-1/6 -translate-y-1/2 z-20"
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
            ok
          </button>
        </div>
      </div>
    );
  }
}
