import { Color, PlayerNames, TdiceRoll } from "./Game";
import {  useState } from "react";
import classNames from "classnames";

interface DiceProps {
  currentDiceRoll: TdiceRoll;
  onRoll: (roll: TdiceRoll) => void;
  disabled: boolean;
  currentPlayer: PlayerNames;
}

export default function Dice({
  currentDiceRoll,
  onRoll,
  disabled,
  currentPlayer,
}: DiceProps): JSX.Element {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [nextMove, setNextMove] = useState("Player1 roll the dice");
  const btnClass = classNames({
    btn: true,
    "btn-pressed": isPressed,
    "btn-over": !isPressed && isHovered,
  });


  return (
    <div>
      <h2>{currentDiceRoll}</h2>
      <button
        id="roll"
        className={btnClass}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        type="button"
        disabled={disabled}
        onClick={() => {
          currentDiceRoll = [
            Math.floor(Math.random() * 5 + 1),
            Math.floor(Math.random() * 5 + 1),
          ] as TdiceRoll;
          // setDiceRoll(currentDiceRoll);
          onRoll(currentDiceRoll);
          setNextMove(currentPlayer + " : Select a checker");
          // disable button id="roolBtn"
          // setDiceDisabled(true);
          // setAllowedChecker(1);
          

        }}
      >
        Roll Dice
      </button>
      <h3 id="alert">{nextMove}</h3>
    </div>
  );
}

