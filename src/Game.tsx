import { useState } from "react";
import { Board } from "./Board";
import Dice from "./Dice";
import Players from "./Players";

export type Color = "White" | "Black";
export type Direction = "rtl" | "ltr";
export type TdiceRoll = [0 | 1 | 2 | 3 | 4 | 5 | 6, 0 | 1 | 2 | 3 | 4 | 5 | 6];
export const PlayerNames: { [key: string]: [string] } = {
  //boolean is for if the player has won or not
  white: ["Player1"],
  black: ["Player2"],
};
// export type PlayerNames = keyof typeof PlayerNames;
interface GameProps {

  playerWon: boolean;
}

function Game({ playerWon }: GameProps) {
  const [currentBoardState, setCurrentBoardState] =
    useState<Color[][]>(initialState);
  const [currentDiceRoll, setDiceRoll] = useState([3, 4] as TdiceRoll);
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    PlayerNames.white[0]
  );
  const [moveLeft, setMoveLeft] = useState<number>(0); //number of moves left
  const [message, setMessage] = useState(currentPlayer + " roll the dice");
  const [selectedColumn, setSelectedColumn] = useState(30);
  const [whiteBar, setWhiteBar] = useState(1); // value 1 for test //number of white checkers on the bar
  const [blackBar, setBlackBar] = useState(0);
  const [whiteOut, setWhiteOut] = useState(0);
  const [blackOut, setBlackOut] = useState(0);
  const [winner, setWinner] = useState("");

  return (
    <div className="game">
      <Players currentPlayer={currentPlayer} anyMoveAvailable={false} />
      <Board
        currentBoardState={currentBoardState}
        onMove={(boardState) => setCurrentBoardState(boardState)}
        currentDiceRoll={currentDiceRoll}
        currentPlayer={currentPlayer}
        onPlayerChange={(player) => setCurrentPlayer(player)}
        selectedColumn={selectedColumn}
        onColumnSelect={(column) => setSelectedColumn(column)}
        onMessage={(message) => setMessage(message)}
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
        winner={winner}
        onWinner={(winner) => setWinner(winner)}
      />
      <Dice
        currentDiceRoll={currentDiceRoll}
        onRoll={(roll) => setDiceRoll(roll)}
        currentPlayer={currentPlayer}
        moveLeft={moveLeft}
        onMoveLeft={(allowed) => setMoveLeft(allowed)}
        message={message}
        onMessage={(message) => setMessage(message)}
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


