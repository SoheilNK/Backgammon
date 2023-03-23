import { useState } from "react";
import { Board } from "./Board";
import Dice from "./Dice";

export type Color = "White" | "Black";
export type Direction = "rtl" | "ltr";
export type TdiceRoll = [1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6];
export enum PlayerNames { white = "Player1", black = "Player2"}
interface GameProps {
  currentDiceRoll: TdiceRoll;
  currentBoardState: Color[][];
  // currentPlayer: enum
  currentPlayer: PlayerNames;
}

function Game({ currentDiceRoll, currentBoardState, currentPlayer }: GameProps) {
  const [diceRoll, setDiceRoll] = useState(currentDiceRoll);
  const [boardState, setBoardState] = useState(currentBoardState);
  const [player, setPlayer] = useState(currentPlayer);

  console.log(diceRoll);
  console.log(player);

  return (
    <div>
      <Board currentState={initialState} setBoardState={setBoardState} />
      <Dice
        setPlayer={setPlayer} //test
        currentDiceRoll={diceRoll}
        callback={setDiceRoll}
        disabled={false}
      />
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
