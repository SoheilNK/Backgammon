import { Board } from "./Board";

export type Color = "White" | "Black";
export type Direction = "rtl" | "ltr";
export type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6 | undefined;

import { render } from "react-dom";

import Dice1 from "./Dice";

const rootElement = document.getElementById("root");

function Game() {
  return (
    <div>
      <Board currentState={initialState} />
      <Dice1 currentDiceRoll={[1, 1]} callback={undefined} disabled={false}/>
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





