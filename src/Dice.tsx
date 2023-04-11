import { Color, PlayerNames, TdiceRoll } from "./Game";
import { useState } from "react";
import classNames from "classnames";

interface DiceProps {
  currentDiceRoll: TdiceRoll;
  onRoll: (roll: TdiceRoll) => void;
  currentPlayer: string;
  moveLeft: number;
  onMoveLeft: (allowed: number) => void;
  message: string;
  onMessage: (message: string) => void;
}

export default function Dice({
  currentDiceRoll: newDiceRoll,
  onRoll,
  currentPlayer,
  moveLeft,
  onMoveLeft,
  message,
  onMessage,
}: DiceProps): JSX.Element {

  const btnClass = classNames("dice", {
    "btn:disabled": moveLeft > 0,
  });

  return (
    <div className="actionPanel">
      <span id="alert" className="card">
        {message}
      </span>

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
            // newDiceRoll = [2, 3]; //for testing
            onRoll(newDiceRoll);
            onMessage(currentPlayer + " move a checker");
            let newMoveLeft = 2;
            if (newDiceRoll[0] === newDiceRoll[1]) {
              //if the dice roll is a double, the player can move twice
              newMoveLeft = newMoveLeft + 2;
            }
            onMoveLeft(newMoveLeft);
              onMessage(
                currentPlayer +
                  " you have " +
                  newMoveLeft +
                  " moves left"
              );
            
          }}
        >
          <span>Roll Dice</span>
        </button>
      </div>
    </div>
  );
}

