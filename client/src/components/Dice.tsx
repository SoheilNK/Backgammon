import { useState } from "react";
import classNames from "classnames";
import Dice3Dv4 from "./Dice3Dv4";
import { TdiceRoll } from "./GamePlay";
import { useLocalStorage } from "../services/useLocalStorage";
import { getUser } from "../services/user.service";
const audioDice = new Audio("diceRoll3.mp3");

interface DiceProps {
  currentDiceRoll: TdiceRoll;
  onRoll: (roll: TdiceRoll) => void;
  moveLeft: number;
  onMoveLeft: (allowed: number) => void;
  onPlayerChange: (player: string) => void;
  whiteOut: number;
  blackOut: number;
  rollTime: number;
  onAlertSeen: (seen: boolean) => void;
  currentPlayer: string;
  started: string;
}

export default function Dice({
  currentDiceRoll,
  onRoll,
  moveLeft,
  onMoveLeft,
  whiteOut,
  blackOut,
  rollTime,
  onAlertSeen,
  currentPlayer,
  started,
}: DiceProps): JSX.Element {
  const [remainingTime, setRemainingTime] = useState(0); // in milliseconds

  const [online, setOnline] = useLocalStorage("online", false);
  // const [onlineGame, setOnlineGame] = useLocalStorage("onlineGame", null);
  let onlineGame = JSON.parse(localStorage.getItem("onlineGame") || "{}");
  // const [started, setStarted] = useLocalStorage("started", "no");
  const userName = getUser().username.toString();

   let disabled =
    moveLeft > 0 ||
    whiteOut === 15 ||
    blackOut === 15 ||
    (online && currentPlayer !== userName) ||
    started === "no";
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
    // currentDiceRoll = [0,0]; //test

    setRemainingTime(rollTime); //reset animation time
    //play a sound
    audioDice.play();

    let newMoveLeft = 2;
    if (currentDiceRoll[0] === currentDiceRoll[1]) {
      //if the dice roll is a double, the player can move twice
      newMoveLeft = 4;
    }

    setTimeout(() => {
      onRoll(currentDiceRoll);
      onMoveLeft(newMoveLeft);
      onAlertSeen(true);
    }, rollTime - 400);
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
        <strong className={glowDice + " text-xs sm:text-base"}>
          &uarr; Click Me &uarr;
        </strong>
      </span>
    </div>
  );
}