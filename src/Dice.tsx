import { Color, PlayerNames, TdiceRoll } from "./Game";
import {  useState } from "react";
import classNames from "classnames";

interface DiceProps {
  currentDiceRoll: TdiceRoll;
  onRoll: (roll: TdiceRoll) => void;
  currentPlayer: PlayerNames;
  onDiceDisabled: (disabled: boolean) => void;
  diceDisabled: boolean;
}

export default function Dice({
  currentDiceRoll,
  onRoll,
  currentPlayer,
  onDiceDisabled,
  diceDisabled,
}: DiceProps): JSX.Element {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [nextMove, setNextMove] = useState("Player1 roll the dice");
  const btnClass = classNames("btn",{
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
        disabled={diceDisabled}
        onClick={() => {
          onDiceDisabled(true);
          currentDiceRoll = [
            Math.floor(Math.random() * 5 + 1),
            Math.floor(Math.random() * 5 + 1),
          ] as TdiceRoll;
          onRoll(currentDiceRoll);
          setNextMove(currentPlayer + " : Move a checker");

          // setAllowedChecker(1);
        }}
      >
        Roll Dice
      </button>
      <h3 id="alert">{nextMove}</h3>
    </div>
  );
}

