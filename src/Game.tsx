import { useState } from "react";
import classNames from "classnames";
import { Board } from "./Board";
import Dice from "./Dice";

export type Color = "White" | "Black";
export type Direction = "rtl" | "ltr";
export type TdiceRoll = [1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6];
export enum PlayerNames {
  white = "Player1",
  black = "Player2",
}
export interface whitePlayer {
  name: PlayerNames.white;
  won: boolean;
}
export interface blackPlayer {
  name: PlayerNames.black;
  won: boolean;
}
interface GameProps {
  currentDiceRoll: TdiceRoll;
  currentBoardState: Color[][];
  currentPlayer: PlayerNames;
  playerWon: boolean;
}

function Game({
  currentPlayer,
  currentDiceRoll,
  currentBoardState,
  playerWon,
}: GameProps) {
  const [diceRoll, setDiceRoll] = useState(currentDiceRoll);
  const [boardState, setBoardState] = useState(currentBoardState);
  const [player, setPlayer] = useState(currentPlayer);
  const [won, setPlayerWon] = useState(playerWon);
  console.log(diceRoll);

  return (
    <div>
      <Board
        boardState={initialState}
        currentDiceRoll={currentDiceRoll}
        currentPlayer={currentPlayer}
      />
      <Dice
        currentDiceRoll={diceRoll}
        setDiceRoll={setDiceRoll}
        disabled={false}
        currentBoardState={currentBoardState}
        currentPlayer={currentPlayer}
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
