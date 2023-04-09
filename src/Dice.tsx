import { Color, PlayerNames, TdiceRoll } from "./Game";
import { useState } from "react";
import classNames from "classnames";

interface DiceProps {
  currentDiceRoll: TdiceRoll;
  onRoll: (roll: TdiceRoll) => void;
  currentPlayer: string;
  onDiceDisabled: (disabled: boolean) => void;
  diceDisabled: boolean;
  message: string;
  onMessage: (message: string) => void;
  onDouble: (double: boolean) => void;
  onDoubleLeft: (doubleLeft: number) => void;
  onMoveLeft: (moveLeft: number[]) => void;
}

export default function Dice({
  currentDiceRoll: newDiceRoll,
  onRoll,
  currentPlayer,
  onDiceDisabled,
  diceDisabled,
  message,
  onMessage,
  onDouble,
  onDoubleLeft,
  onMoveLeft,
}: DiceProps): JSX.Element {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const btnClass = classNames("dice", {
    "btn-pressed": isPressed,
    "btn-over": !isPressed && isHovered,
    "btn-disabled": diceDisabled,
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
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          type="button"
          disabled={diceDisabled}
          onClick={() => {
            onDouble(false);
            onDiceDisabled(true);
            newDiceRoll = [
              Math.round(Math.random() * 5 + 1),
              Math.round(Math.random() * 5 + 1),
            ] as TdiceRoll;
            newDiceRoll = [2, 3] //test value
            onRoll(newDiceRoll);
            onMessage(currentPlayer + " move a checker");
            onMoveLeft([1, 1]);
            if (newDiceRoll[0] === newDiceRoll[1]) {
              //if the dice roll is a double, the player can move twice
              onDouble(true);
              onDoubleLeft(4);
              onMoveLeft([1, 1]);
              onMessage(
                currentPlayer + " rolled a double, you have 4 moves left"
              );
            }
          }}
        >
          <span>Roll Dice</span>
        </button>
      </div>
    </div>
  );
}

