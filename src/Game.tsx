import { Board } from "./Board";

export type Color = "White" | "Black";
export type Direction = "rtl" | "ltr";


import { render } from "react-dom";

import Dice1 from "./Dice";

const rootElement = document.getElementById("root");

function Game() {
  return (
    <div>
      <Board currentState={initialState} />
      <Dice1 d1={1} d2={2} />
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





