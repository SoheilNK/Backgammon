import { Color, PlayerNames, TdiceRoll } from "./GamePlay";
import { useState } from "react";
import classNames from "classnames";
import { anyMoveAvailable, togglePlayer } from "./gameRules";

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
}: DiceProps): JSX.Element {
  const btnClass = classNames("dice", {
    "btn:disabled": moveLeft > 0,
  });

  return (
    <div className="players">
      <span className="dice">{newDiceRoll}</span>
      <button
        id="roll"
        className="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        disabled={moveLeft > 0}
        onClick={() => {
          newDiceRoll = [
            Math.round(Math.random() * 5 + 1),
            Math.round(Math.random() * 5 + 1),
          ] as TdiceRoll;
          // newDiceRoll = [6, 6]; //test
          onRoll(newDiceRoll);
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
          if (moveAllowed[0] === false && moveAllowed[1] === false) {
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
        }}
      >
        <span>Roll Dice</span>
      </button>
    </div>
  );
}
