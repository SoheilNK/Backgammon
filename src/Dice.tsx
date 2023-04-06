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
}: DiceProps): JSX.Element {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const btnClass = classNames("btn", {
    "btn-pressed": isPressed,
    "btn-over": !isPressed && isHovered,
  });

  return (
    <div className="players">
      <h2 className="player">{newDiceRoll}</h2>
      <button
        id="roll"
        className={"player " + btnClass} 
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
          /************************************************************ */
          // currentDiceRoll = [2, 2] as TdiceRoll; //for testing double
          onRoll(newDiceRoll);
          onMessage(currentPlayer + " move a checker");

          if (newDiceRoll[0] === newDiceRoll[1]) {
            //if the dice roll is a double, the player can move twice
            onDouble(true);
            onDoubleLeft(4);
            onMessage(
              currentPlayer + " rolled a double, you have four moves left"
            );
          }
        }}
      >
        Roll Dice
      </button>
      <h3 id="alert" className="player">
        {message}
      </h3>
    </div>
  );
}
