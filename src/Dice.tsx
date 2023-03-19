import * as React from "react";
import Dice from "react-dice-roll";
import { DiceRoll } from "./Game";
import TDiceRef from "react-dice-roll";
// import "./styles.css";
import "./index.css";
import { forwardRef, useRef } from "react";

interface Dice1Props {
  diceRoll: DiceRoll;
  disabled: true | false;
}
export default function Dice1({ diceRoll,  disabled }: Dice1Props) {
  // let currentDiceRoll: [DiceRoll, DiceRoll];
  return (
    <div>
      <button type="button" onClick={() => rollDice(diceRoll)}>
        Roll the dice
      </button>

      <Dice
        cheatValue={diceRoll[0]}
        // onRoll={(value) => {
        //   console.log(value);
        //   currentDiceRoll[0] = value;
        // }}
        size={80}
        sound="./dice-142528.mp3"
        disabled={disabled}
      />
      <Dice
        cheatValue={diceRoll[1]}
        // onRoll={(value) => {
        //   console.log(value);
        //   currentDiceRoll[1] = value;
        // }}
        size={80}
        sound="./dice-142528.mp3"
        disabled={disabled}
      />
    </div>
  );

  
  function rollDice(currentDiceRoll: DiceRoll) {
    // console.log(d1, d2);
    // let diceElement: HTMLCollectionOf<HTMLElement> =
    //   document.getElementsByClassName(
    //     "_space3d"
    //   ) as HTMLCollectionOf<HTMLElement>;

    currentDiceRoll = [
      Math.floor(Math.random() * 5 + 1),
      Math.floor(Math.random() * 5 + 1),
    ] as DiceRoll;

    // callback(currentDiceRoll);

    // diceElement.item(0)!.click();
    // diceElement.item(1)!.click();

    // console.log(currentDiceRoll);
  }
}
