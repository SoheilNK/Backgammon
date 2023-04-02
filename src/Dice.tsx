import { Color, PlayerNames, TdiceRoll } from "./Game";
import React, { useEffect, useState } from "react";
import classNames from "classnames";

let currentChecker: Color;
let opponentChecker: Color;
export let allowedColumns: number[][] = [];

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
}: DiceProps): JSX.Element {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const btnClass = classNames({
    btn: true,
    "btn-pressed": isPressed,
    "btn-over": !isPressed && isHovered,
  });
  useEffect(() => {
    setAllowedColumns(currentBoardState, currentDiceRoll, currentPlayer);
  }, [currentBoardState, currentDiceRoll]);

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

export function setAllowedColumns(
  currentBoardState: Color[][],
  currentDiceRoll: TdiceRoll,
  currentPlayer: PlayerNames
) {
  allowedColumns = [];
  if (PlayerNames.white == currentPlayer) {
    currentChecker = "White";
    opponentChecker = "Black";
  } else {
    currentChecker = "Black";
    opponentChecker = "White";
  }
  console.log(currentChecker, " vs", opponentChecker);
  // console.log(allowedChecker, currentPlayer);
  currentBoardState.forEach((point, i) => {
    if (point[0] == currentChecker) {
      let target1 = i + currentDiceRoll[0];
      let target2 = i + currentDiceRoll[1];
      //rule#1
      //check if the target is less that 23 and same color or not double opponent checker 
      if (target1 > 23) {
        target1 = -1;
      } else {
        let target1Length = currentBoardState[target1].length;
        let target1Color = currentBoardState[target1][0];
        if (target1Length >= 2 && target1Color == opponentChecker) {
          console.log("can't move");
          target1 = 0;
        } else {
          target1 = target1 + 10;
        }
      }

      if (target2 > 23) {
        target2 = 0;
      } else {
        let target2Length = currentBoardState[target2].length;
        let target2Color = currentBoardState[target2][0];
        if (target2Length >= 2 && target2Color == opponentChecker) {
          target2 = 0;
        } else {
          target2 = target2 + 10;
        }

      }
      allowedColumns[i]=[target1, target2];
    }
  });
  console.log(allowedColumns);
  return allowedColumns;
}
