import { Color, PlayerNames, TdiceRoll } from "./GamePlay";
import { useState } from "react";
import classNames from "classnames";
import { anyMoveAvailable, togglePlayer } from "./gameRules";
import Dice3Dv4 from "./Dice3Dv4";

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
  currentDiceRoll: newDiceRoll,
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

  var glowDice = classNames("dice", {
    "opacity-5": disabled,
    "opacity-100": !disabled,
  });

   

  function handleClick() {
    if (disabled) {
      return;
    }
    newDiceRoll = [
      Math.round(Math.random() * 5 + 1),
      Math.round(Math.random() * 5 + 1),
    ] as TdiceRoll;
    // newDiceRoll = [5, 6]; //test
    onRoll(newDiceRoll);
    setRemainingTime(2500); //reset animation time
    //play a sound
    let audio = new Audio("/diceRoll3.m4a");
    audio.play();

    let newMoveLeft = 2;
    if (newDiceRoll[0] === newDiceRoll[1]) {
      //if the dice roll is a double, the player can move twice
      newMoveLeft = 4;
    }
    onMoveLeft(newMoveLeft);
    let moveAllowed = anyMoveAvailable(
      currentBoardState,
      currentPlayer,
      newDiceRoll,
      whiteBar,
      blackBar
    );
    //******************check if any move is available */
    if (!moveAllowed[0] && !moveAllowed[1]) {
      onAlert(
        currentPlayer +
        " has no possible moves with a roll of " +
           newDiceRoll 
      );
      //change player
      onRoll([0, 0]);
      onMoveLeft(0);
      togglePlayer(currentPlayer, onPlayerChange);
    }
  }

  return (
    <div>
      <div className=" group relative max-w-7xl mx-auto">
        <div
          className={
            "absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur transition duration-1000 group-hover:duration-200" +
            glowDice
          }
        ></div>
        <div onClick={handleClick}>
          <Dice3Dv4
            roll1={newDiceRoll[0]}
            roll2={newDiceRoll[1]}
            rotate={true}
            remainingTime={remainingTime}
            onRemainingTime={setRemainingTime}
          />
        </div>
      </div>
    </div>
  );
}
