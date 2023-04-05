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
  const [currentDiceRoll, setDiceRoll] = useState(diceRoll );
  // const [currentBoardState, setBoardState] = useState(initialState);
  const [diceDisabled, setDiceDisabled] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerNames>(
    PlayerNames.white
  );
    const [message, setMessage] = useState(currentPlayer + " roll the dice") ;



  // const [player, setPlayer] = useState(currentPlayer);
  // const [won, setPlayerWon] = useState(playerWon);
  //add state for allowed columns from board.tsx
  
  // const [selectedChecker, setSelectedChecker] = useState<number>(0);
  const [selectedColumn, setSelectedColumn] = useState(23);
  // const [nextMove, setNextMove] = useState("Player1 roll the dice");
  // const [player1, setPlayer1] = useState<whitePlayer>({
  //   name: PlayerNames.white,
  //   won: false,
  // });
  // const [player2, setPlayer2] = useState<blackPlayer>({
  //   name: PlayerNames.black,
  //   won: false,
  // });
  // const [currentChecker, setCurrentChecker] = useState<Color>("White");
  // const [currentDiceRoll, setCurrentDiceRoll] = useState<TdiceRoll>([0, 0]);
  const [currentBoardState, setCurrentBoardState] = useState<Color[][]>(
    initialState
  );
  // const [playerWon, setPlayerWon] = useState<boolean>(false);
  // const [diceRoll, setDiceRoll] = useState<TdiceRoll>([0, 0]);
  // const [allowedChecker, setAllowedChecker] = useState<number>(0);
  
  console.log(currentDiceRoll);
  //player 1 starts the game
  //player 1 rolls the dice
  //player 1 selects a checker
  //player 1 selects a column to move the checker to
  //player 2 rolls the dice
  //player 2 selects a checker
  //player 2 selects a column to move the checker to

  return (
    <div>
      <Board
        currentBoardState={initialState}
        onMove={(boardState: Color[][]) => setCurrentBoardState(boardState)}
        currentDiceRoll={currentDiceRoll}
        currentPlayer={currentPlayer}
        onPlayerChange={(player: PlayerNames) => setCurrentPlayer(player)}
        selectedColumn={selectedColumn}
        onColumnSelect={(column: number) => setSelectedColumn(column)}
        onDiceDisabled={(disabled: boolean) => setDiceDisabled(disabled)}
      />
      <Dice
        currentDiceRoll={currentDiceRoll}
        onRoll={(roll: TdiceRoll) => setDiceRoll(roll)}
        currentPlayer={currentPlayer}
        onDiceDisabled={(disabled: boolean) => setDiceDisabled(disabled)}
        diceDisabled={diceDisabled}
        message={message}
        onMessage={(message: string) => setMessage(message)}
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
