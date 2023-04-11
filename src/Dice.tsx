import { Color, PlayerNames, TdiceRoll } from "./Game";
import { useState } from "react";
import classNames from "classnames";

interface DiceProps {
  currentDiceRoll: TdiceRoll;
  onRoll: (roll: TdiceRoll) => void;
  currentPlayer: string;
  moveLeft: number;
  onMoveLeft: (allowed: number) => void;
}

export default function Dice({
  currentDiceRoll: newDiceRoll,
  onRoll,
  currentPlayer,
  moveLeft,
  onMoveLeft,
}: DiceProps): JSX.Element {

  const btnClass = classNames("dice", {
    "btn:disabled": moveLeft > 0,
  });

  return (
      <div className="players">
        <span className="dice">{newDiceRoll}</span>
        <button
          id="roll"
          className={btnClass} //btnClass
          type="button"
          disabled={moveLeft > 0}
          onClick={() => {
            newDiceRoll = [
              Math.round(Math.random() * 5 + 1),
              Math.round(Math.random() * 5 + 1),
            ] as TdiceRoll;
            // newDiceRoll = [6, 6]; //for testing
            onRoll(newDiceRoll);
            let newMoveLeft = 2;
            if (newDiceRoll[0] === newDiceRoll[1]) {
              //if the dice roll is a double, the player can move twice
              newMoveLeft = newMoveLeft + 2;
            }
            onMoveLeft(newMoveLeft);
            
          }}
        >
          <span>Roll Dice</span>
        </button>
      </div>
    
  );
}

