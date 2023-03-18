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
        // cheatValue={d1}
        onRoll={(value) => {
          console.log(value);
          currentDiceRoll[0] = value;
        }}
        size={80}
        sound="./dice-142528.mp3"
        disabled={disabled}
      />
      <Dice
        // cheatValue={d2}
        onRoll={(value) => {
          console.log(value);
          currentDiceRoll[1] = value;
        }}
        size={80}
        sound="./dice-142528.mp3"
        disabled={disabled}
      />
      {/* {console.log(currentDiceRoll)} */}
    
    </div>
    
    );
      

  function rollDice() {
    // let currentDiceRoll[0] =
    let d1: DiceRoll = Math.round(Math.random() * 5 + 1) as DiceRoll;
    let d2: DiceRoll = Math.round(Math.random() * 5 + 1) as DiceRoll;

    console.log(d1, d2);
    let diceElement: HTMLCollectionOf<HTMLElement> =
      document.getElementsByClassName(
        "_space3d six false"
      ) as HTMLCollectionOf<HTMLElement>;
    
    // diceElement.item(0)?.

    diceElement.item(0)!.click();
    diceElement.item(1)!.click();
          
            console.log(currentDiceRoll);
          

  }
  
}




