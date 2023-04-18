import { useState } from "react";
import { Board } from "./Board";
import Dice from "./Dice";
import Players from "./Players";
import { Message } from "./Message";

export type Color = "White" | "Black";
export type Direction = "rtl" | "ltr";
export type TdiceRoll = [0 | 1 | 2 | 3 | 4 | 5 | 6, 0 | 1 | 2 | 3 | 4 | 5 | 6];
export let PlayerNames = {
  white: ["Player 1"],
  black: ["Player 2"],
};

interface GamePlayProps {
  player1: string;
  player2: string;
}

function GamePlay({ player1, player2 }: GamePlayProps) {
  const [currentBoardState, setCurrentBoardState] =
    useState<Color[][]>(initialState); //test
  const [currentDiceRoll, setDiceRoll] = useState([0, 0] as TdiceRoll);
  const [currentPlayer, setCurrentPlayer] = useState<string>(player1);
  const [moveLeft, setMoveLeft] = useState<number>(0); //number of moves left
  const [selectedColumn, setSelectedColumn] = useState(50);
  const [whiteBar, setWhiteBar] = useState(0);
  const [blackBar, setBlackBar] = useState(0);
  const [whiteOut, setWhiteOut] = useState(0); //test
  const [blackOut, setBlackOut] = useState(0); //test
  PlayerNames = {
    white: [player1],
    black: [player2],
  };

  return (
    <div className="game">
      <div className="container mx-auto p-4">
        <Message
          currentPlayer={currentPlayer}
          moveLeft={moveLeft}
          whiteOut={whiteOut}
          blackOut={blackOut}
        />
      </div>

      <Players currentPlayer={currentPlayer} anyMoveAvailable={true} />
      <Board
        currentBoardState={currentBoardState}
        onMove={(boardState) => setCurrentBoardState(boardState)}
        currentDiceRoll={currentDiceRoll}
        onRoll={(roll) => setDiceRoll(roll)}
        currentPlayer={currentPlayer}
        onPlayerChange={(player) => setCurrentPlayer(player)}
        selectedColumn={selectedColumn}
        onColumnSelect={(column) => setSelectedColumn(column)}
        moveLeft={moveLeft}
        onMoveLeft={(allowed) => setMoveLeft(allowed)}
        whiteBar={whiteBar}
        onWhiteBar={(counter) => setWhiteBar(counter)}
        blackBar={blackBar}
        onBlackBar={(counter) => setBlackBar(counter)}
        whiteOut={whiteOut}
        onWhiteOut={(counter) => setWhiteOut(counter)}
        blackOut={blackOut}
        onBlackOut={(counter) => setBlackOut(counter)}
      />
      <Dice
        currentDiceRoll={currentDiceRoll}
        onRoll={(roll) => setDiceRoll(roll)}
        currentPlayer={currentPlayer}
        moveLeft={moveLeft}
        onMoveLeft={(allowed) => setMoveLeft(allowed)}
        currentBoardState={currentBoardState}
        onPlayerChange={(player) => setCurrentPlayer(player)}
        whiteBar={whiteBar}
        blackBar={blackBar}
        whiteOut={whiteOut}
        blackOut={blackOut}
      />
      <div className="copyright">&copy; 2023 By Soheil Najmabadi Kia.</div>
    </div>
  );
}

export default GamePlay;

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

let initialState1: Color[][] = [
  //test state for all at home
  ["White", "White"],
  [],
  ["Black", "Black"],
  ["Black", "Black", "Black", "Black", "Black"],
  ["Black", "Black"],
  ["Black", "Black", "Black", "Black", "Black"],
  [],
  ["Black"],
  [],
  [],
  [],
  ["White", "White", "White", "White", "White"],
  [],
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
  [],
];
let initialState2: Color[][] = [
  //test state for move out
  ["Black", "Black", "Black", "Black", "Black"],
  ["Black", "Black", "Black", "Black", "Black", "Black"],
  ["Black", "Black"],
  [],
  ["Black", "Black"],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  ["White", "White"],
  ["White", "White"],
  ["White", "White"],
  ["White", "White", "White"],
  ["White", "White"],
  ["White", "White", "White", "White"],
];
let winnertest: Color[][] = [
  //test state for winner
  ["Black", "Black"],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  ["White", "White"],
];