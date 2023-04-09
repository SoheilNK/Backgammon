import { useState } from "react";
import { Board } from "./Board";
import Dice from "./Dice";
import Players from "./Players";

export type Color = "White" | "Black";
export type Direction = "rtl" | "ltr";
export type TdiceRoll = [0 | 1 | 2 | 3 | 4 | 5 | 6, 0 | 1 | 2 | 3 | 4 | 5 | 6];
export const PlayerNames: { [key: string]: [string, boolean] } = { 
  //boolean is for if the player has won or not
  'white': ["Player1", false],
  'black': ["Player2", false],
};
// export type PlayerNames = keyof typeof PlayerNames;
interface GameProps {
    diceRoll: TdiceRoll;
  boardState: Color[][];
  playerWon: boolean;
}

function Game({
  
  diceRoll,
  boardState,
  playerWon,
}: GameProps) {
    const [currentBoardState, setCurrentBoardState] =
      useState<Color[][]>(initialState);
  const [currentDiceRoll, setDiceRoll] = useState(diceRoll);
  const [currentPlayer, setCurrentPlayer] = useState<string>(PlayerNames.white[0]);
  const [isDouble, setIsDouble] = useState<boolean>(false);
  const [doubleLeft, setDoubleLeft] = useState<number>(0);
  const [moveAllowed, setMoveAllowed] = useState<boolean>(false);
  const [diceDisabled, setDiceDisabled] = useState<boolean>(false);
  const [message, setMessage] = useState(currentPlayer + " roll the dice");
  const [selectedColumn, setSelectedColumn] = useState(30);
  const [whiteBar, setWhiteBar] = useState(0);
  const [blackBar, setBlackBar] = useState(0);
  const [whiteOut, setWhiteOut] = useState(0);
  const [blackOut, setBlackOut] = useState(0);
  const [whiteWon, setWhiteWon] = useState(false);
  const [blackWon, setBlackWon] = useState(false);
  const [winner, setWinner] = useState("");
  const [isFromBar, setIsFromBar] = useState(false);


  return (
    <div className="game">
      <Players currentPlayer={currentPlayer} anyMoveAvailable={false} />
      <Board
        currentBoardState={currentBoardState}
        onMove={(boardState: Color[][]) => setCurrentBoardState(boardState)}
        currentDiceRoll={currentDiceRoll}
        currentPlayer={currentPlayer}
        onPlayerChange={(player: string) => setCurrentPlayer(player)}
        selectedColumn={selectedColumn}
        onColumnSelect={(column: number) => setSelectedColumn(column)}
        onDiceDisabled={(disabled: boolean) => setDiceDisabled(disabled)}
        onMessage={(message: string) => setMessage(message)}
        onMoveAllowed={(allowed: boolean) => setMoveAllowed(allowed)}
        // moveAllowed={moveAllowed}
        isDouble={isDouble}
        onDoubleLeft={(counter: number) => setDoubleLeft(counter)}
        doubleLeft={doubleLeft}
        whiteBar={whiteBar}
        onWhiteBar={(counter: number) => setWhiteBar(counter)}
        blackBar={blackBar}
        onBlackBar={(counter: number) => setBlackBar(counter)}
        whiteOut={whiteOut}
        onWhiteOut={(counter: number) => setWhiteOut(counter)}
        blackOut={blackOut}
        onBlackOut={(counter: number) => setBlackOut(counter)}
        whiteWon={whiteWon}
        onWhiteWon={(won: boolean) => setWhiteWon(won)}
        blackWon={blackWon}
        onBlackWon={(won: boolean) => setBlackWon(won)}
        winner={winner}
        onWinner={(winner: string) => setWinner(winner)}
        isFromBar={isFromBar}
        onIsFromBar={(isFromBar: boolean) => setIsFromBar(isFromBar)}
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

//*************test state for hit********************* */
let initialState: Color[][] = [
  ["White", "White"],
  [],
  [],
  [],
  ["Black"],
  ["Black", "Black", "Black", "Black"],
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
