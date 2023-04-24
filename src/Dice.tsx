import { Color, PlayerNames, TdiceRoll } from "./GamePlay";
import { useState } from "react";
import classNames from "classnames";
import { anyMoveAvailable, togglePlayer } from "./gameRules";
import Dice3Dv4 from "./Dice3Dv4";

interface DiceProps {
  currentDiceRoll: TdiceRoll;
  onRoll: (roll: TdiceRoll) => void;
  currentPlayer: string;
  moveLeft: number;
  onMoveLeft: (allowed: number) => void;
  currentBoardState: Color[][];
  onPlayerChange: (player: string) => void;
  whiteBar: number;
  blackBar: number;
  whiteOut: number;
  blackOut: number;
}

export default function Dice({
  currentDiceRoll: newDiceRoll,
  onRoll,
  currentPlayer,
  onPlayerChange,
  moveLeft,
  onMoveLeft,
  currentBoardState,
  whiteBar,
  blackBar,
  whiteOut,
  blackOut,
}: DiceProps): JSX.Element {
  const [remainingTime, setRemainingTime] = useState(1500); // in milliseconds

  const btnClass = classNames("dice", {
    "btn:disabled": moveLeft > 0,
  });

  function handleClick() {
    newDiceRoll = [
      Math.round(Math.random() * 5 + 1),
      Math.round(Math.random() * 5 + 1),
    ] as TdiceRoll;
    // newDiceRoll = [3, 5]; //test
    onRoll(newDiceRoll);
    setRemainingTime(1500);
    let newMoveLeft = 2;
    if (newDiceRoll[0] === newDiceRoll[1]) {
      //if the dice roll is a double, the player can move twice
      newMoveLeft = 4;
    }
    onMoveLeft(newMoveLeft);
    let moveAllowed = anyMoveAvailable(
      currentBoardState,
      currentPlayer,
      newDiceRoll,
      whiteBar,
      blackBar
    );
    //******************check if any move is available */
    if (!moveAllowed[0] && !moveAllowed[1]) {
      alert(
        "No move available for " +
          currentPlayer +
          " with this dice roll " +
          newDiceRoll
      );
      //change player
      onRoll([0, 0]);
      onMoveLeft(0);
      togglePlayer(currentPlayer, onPlayerChange);
    }
  }

  return (
    <div className="players">
      <span className="dice">
        <Dice3Dv4
          roll1={newDiceRoll[0]}
          roll2={newDiceRoll[1]}
          rotate={true}
          remainingTime={remainingTime}
          onRemainingTime={setRemainingTime}
        />{" "}
      </span>
      <button
        id="roll"
        className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200"
        type="button"
        disabled={moveLeft > 0 || whiteOut === 15 || blackOut === 15}
        onClick={handleClick}
      >
        <span>Roll Dice</span>
      </button>
    </div>
  );
}
