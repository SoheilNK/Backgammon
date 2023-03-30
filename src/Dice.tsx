import { Color, PlayerNames, TdiceRoll } from "./Game";
import React, { useEffect ,useState } from "react";
import classNames from "classnames";
interface DiceProps {
  currentDiceRoll: TdiceRoll;
  setDiceRoll: Function;
  disabled: boolean;
  currentBoardState: Color[][];
  currentPlayer: PlayerNames;
}

export default function Dice({
  currentDiceRoll,
  setDiceRoll: setDiceRoll,
  disabled,
  currentBoardState,
  currentPlayer,
}: DiceProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const btnClass = classNames({
    btn: true,
    "btn-pressed": isPressed,
    "btn-over": !isPressed && isHovered,
  });
  useEffect(() => {
    console.log("useEffect " + currentDiceRoll);
    calcAllowedColumns(currentPlayer, currentBoardState, currentDiceRoll)
  })


  return (
    <div>
      <h2>{currentDiceRoll}</h2>
      <button
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
          setDiceRoll(currentDiceRoll);
          console.log(currentDiceRoll);

        }}
      >
        Roll Dice
      </button>
      <h3>{currentPlayer}: It is your turn to move the checkers</h3>
    </div>
  );
}
function calcAllowedColumns(currentPlayer: PlayerNames, currentBoardState: Color[][], currentDiceRoll: TdiceRoll) {
  
  currentBoardState.forEach((point) => {
    console.log("allowed columns= " + point[0])  
  })
}

