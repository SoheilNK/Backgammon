import { Board } from "./Board";
// import rollDice from "./Dice";

export type Color = "White" | "Black";
export type Direction = "rtl" | "ltr";
export type DiceRoll = [1 | 2 | 3 | 4 | 5 | 6 | undefined, 1 | 2 | 3 | 4 | 5 | 6 | undefined];


import Dice1 from "./Dice";
import { useState } from "react";

const rootElement = document.getElementById("root");
interface GameProps {
  currentDiceRoll: DiceRoll;
}
function Game({ currentDiceRoll }: GameProps) {
  const [diceRoll, setDiceRoll] = useState(currentDiceRoll= [1,1]);
  console.log(diceRoll);

  return (
    <div>
      <Board currentState={initialState} />
      <Dice1 diceRoll={currentDiceRoll} disabled={false} />
    </div>
  );
}

export default Game;



let initialState: Color[][] = [
  ["White", "White"],
  [],
  [],
  [],
  [],
  ["Black", "Black", "Black", "Black", "Black"],
  [],
  ["Black", "Black", "Black"],
  [],
  [],
  [],
  ["White", "White", "White", "White", "White"],
  ["Black", "Black", "Black", "Black", "Black"],
  [],
  [],
  [],
  ["White", "White", "White"],
  [],
  ["White", "White", "White", "White", "White"],
  [],
  [],
  [],
  [],
  ["Black", "Black"],
];





