import * as React from "react";
import Dice from "react-dice-roll";
import { DiceRoll } from "./Game";
import TDiceRef from "react-dice-roll";
// import "./styles.css";
import "./index.css";
import { forwardRef, useRef } from "react";

interface Dice1Props {
  currentDiceRoll: [DiceRoll, DiceRoll];
  callback: Function;
  disabled: true | false;
}
export default function Dice1({ currentDiceRoll,  callback, disabled }: Dice1Props) {
  return (
    <div>
      <button type="button" id="rollDice" onClick={rollDice}>
        Roll the dice
      </button>

      <Dice
        cheatValue={currentDiceRoll[0]}
        size={80}
        sound="./dice-142528.mp3"
        disabled={disabled}
        // triggers={["click"]}
      />
      <Dice
        cheatValue={currentDiceRoll[1]}
        size={80}
        sound="./dice-142528.mp3"
        disabled={disabled}
      />
    </div>
  );
}


function rollDice() {
  let diceElement: HTMLCollectionOf<Element> =
    document.getElementsByClassName("_space3d six false");
  
    diceElement.item(0).click()
  diceElement.item(1).click()
}

