import { useState } from "react";
import { Board } from "./Board";
import Dice from "./Dice";

export type Color = "White" | "Black";
export type Direction = "rtl" | "ltr";
export type TdiceRoll = [0 | 1 | 2 | 3 | 4 | 5 | 6, 0 | 1 | 2 | 3 | 4 | 5 | 6];
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
  // currentPlayer: PlayerNames;
  diceRoll: TdiceRoll;
  boardState: Color[][];
  playerWon: boolean;
}

function Game({
  // currentPlayer,
  diceRoll,
  boardState,
  playerWon,
}: GameProps) {
  //Define if the player can move the checker

  const [isDouble, setIsDouble] = useState<boolean>(false);
  const [doubleLeft, setDoubleLeft] = useState<number>(0);
  const [moveAllowed, setMoveAllowed] = useState<boolean>(false);

  const [currentDiceRoll, setDiceRoll] = useState(diceRoll);
  // const [currentBoardState, setBoardState] = useState(initialState);
  const [diceDisabled, setDiceDisabled] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerNames>(
    PlayerNames.white
  );
  const [message, setMessage] = useState(currentPlayer + " roll the dice");

  const [selectedColumn, setSelectedColumn] = useState(23);
  const [currentBoardState, setCurrentBoardState] =
    useState<Color[][]>(initialState);
  console.log(currentDiceRoll);
  return (
    <div>
      <Board
        currentBoardState={currentBoardState}
        onMove={(boardState: Color[][]) => setCurrentBoardState(boardState)}
        currentDiceRoll={currentDiceRoll}
        currentPlayer={currentPlayer}
        onPlayerChange={(player: PlayerNames) => setCurrentPlayer(player)}
        selectedColumn={selectedColumn}
        onColumnSelect={(column: number) => setSelectedColumn(column)}
        onDiceDisabled={(disabled: boolean) => setDiceDisabled(disabled)}
        onMessage={(message: string) => setMessage(message)}
        onMoveAllowed={(allowed: boolean) => setMoveAllowed(allowed)}
        // moveAllowed={moveAllowed}
        isDouble={isDouble}
        onDoubleLeft={(counter: number) => setDoubleLeft(counter)}
        doubleLeft={doubleLeft}
      />
      <Dice
        currentDiceRoll={currentDiceRoll}
        onRoll={(roll: TdiceRoll) => setDiceRoll(roll)}
        currentPlayer={currentPlayer}
        onDiceDisabled={(disabled: boolean) => setDiceDisabled(disabled)}
        diceDisabled={diceDisabled}
        message={message}
        onMessage={(message: string) => setMessage(message)}
        onDouble={(isDouble: boolean) => setIsDouble(isDouble)}
        onDoubleLeft={(counter: number) => setDoubleLeft(counter)}
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
