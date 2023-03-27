import { PlayerNames, TdiceRoll } from "./Game";
import React, { useState } from "react";
import classNames from "classnames";
interface DiceProps {
  currentDiceRoll: TdiceRoll;
  callback: Function;
  disabled: boolean;
  setPlayer: Function; //test
  setPlayerWon: Function;//test
}

export default function Dice({
  currentDiceRoll,
  callback,
  disabled,
  setPlayer, //test
  setPlayerWon, //test
}: DiceProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const btnClass = classNames({
    btn: true,
    "btn-pressed": isPressed,
    "btn-over": !isPressed && isHovered,
  });

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
          callback(currentDiceRoll);
          setPlayer(PlayerNames.black); //test
          setPlayerWon(false); //test
          // console.log(currentDiceRoll);
        }}
      >
        Roll Dice
      </button>
    </div>
  );
}