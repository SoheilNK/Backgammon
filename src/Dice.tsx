import { Color,  TdiceRoll } from "./GamePlay";
import { useState } from "react";
import classNames from "classnames";
import { anyMoveAvailable, togglePlayer } from "./gameRules";
import Dice3Dv4 from "./Dice3Dv4";
let audio = new Audio("diceRoll3.m4a");


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
  whiteOut: number;
  blackOut: number;
  onAlert: (message: string) => void;
}

export default function Dice({
  currentDiceRoll,
  onRoll,
  currentPlayer,
  onPlayerChange,
  moveLeft,
  onMoveLeft,
  currentBoardState,
  whiteBar,
  blackBar,
  whiteOut,
  blackOut,
  onAlert,
}: DiceProps): JSX.Element {
  const [remainingTime, setRemainingTime] = useState(0); // in milliseconds
  let disabled = moveLeft > 0 || whiteOut === 15 || blackOut === 15;

  var glowDice = classNames("", {
    "opacity-5": disabled,
    "opacity-100": !disabled,
  });

   

  function handleClick() {
    if (disabled) {
      return;
    }
    currentDiceRoll = [
      Math.round(Math.random() * 5 + 1),
      Math.round(Math.random() * 5 + 1),
    ] as TdiceRoll;
    // currentDiceRoll = [1, 1]; //test
    onRoll(currentDiceRoll);
    setRemainingTime(2500); //reset animation time
    //play a sound
    audio.play();

    let newMoveLeft = 2;
    if (currentDiceRoll[0] === currentDiceRoll[1]) {
      //if the dice roll is a double, the player can move twice
      newMoveLeft = 4;
    }
    onMoveLeft(newMoveLeft);
    let moveAllowed = anyMoveAvailable(
      currentBoardState,
      currentPlayer,
      currentDiceRoll,
      whiteBar,
      blackBar
    );
    //******************check if any move is available */
    if (!moveAllowed[0] && !moveAllowed[1]) {
      onAlert(
        currentPlayer +
        " has no possible moves with a roll of " +
           currentDiceRoll 
      );
      //change player
      onRoll([0, 0]);
      onMoveLeft(0);
      togglePlayer(currentPlayer, onPlayerChange);
    }
  }

  return (
    <div className=" flex flex-col items-center -mt-4 ">
      <div className="group relative  mx-auto">
        <div
          className={
            "z-0 absolute  -inset-1 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg blur transition duration-1000 group-hover:duration-200 " +
            glowDice
          }
        ></div>
        <div onClick={handleClick} className="hover:cursor-pointer">
          <Dice3Dv4
            roll1={currentDiceRoll[0]}
            roll2={currentDiceRoll[1]}
            rotate={true}
            remainingTime={remainingTime}
            onRemainingTime={setRemainingTime}
          />
        </div>
      </div>
      <span
        className=" text-center w-full text-white hover:cursor-pointer"
        onClick={handleClick}
      >
        <strong className={glowDice + " text-xs sm:text-base"}>&uarr; Click Me &uarr;</strong>
      </span>
    </div>
  );
}
