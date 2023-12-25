import { Board } from "./Board";
import Dice from "./Dice";
import Players from "./Players";
import { Message } from "./Message";
import { Alert } from "./Alert";
import { togglePlayer } from "../services/gameRules";
import { getUser } from "../services/user.service";
import { useEffect } from "react";
import * as type from "../types";
import { sendWsMessage } from "./Chat";

//----------------------------------------------
export type Color = "White" | "Black" | null;
export type Direction = "rtl" | "ltr";
export type TdiceRoll = [0 | 1 | 2 | 3 | 4 | 5 | 6, 0 | 1 | 2 | 3 | 4 | 5 | 6];
export let PlayerNames = {
  white: ["Player 1"],
  black: ["Player 2"],
};

interface GamePlayProps {
  onResetState: () => void;
  gameState: string;
  setGameState: (gameState: string) => void;
  player1: string;
  setPlayer1: (player: string) => void;
  player2: string;
  setPlayer2: (player: string) => void;
  scores: number[];
  setScores: (scores: number[]) => void;
  currentPlayer: string;
  setCurrentPlayer: (player: string) => void;
  currentDiceRoll: TdiceRoll;
  setDiceRoll: (roll: TdiceRoll) => void;
  currentBoardState: Color[][];
  setCurrentBoardState: (boardState: Color[][]) => void;
  moveLeft: number;
  setMoveLeft: (moves: number) => void;
  selectedColumn: number;
  setSelectedColumn: (column: number) => void;
  whiteBar: number;
  setWhiteBar: (counter: number) => void;
  blackBar: number;
  setBlackBar: (counter: number) => void;
  whiteOut: number;
  setWhiteOut: (counter: number) => void;
  blackOut: number;
  setBlackOut: (counter: number) => void;
  alertSeen: boolean;
  setAlertSeen: (seen: boolean) => void;
  started: string;
  setStarted: (started: string) => void;
}

function GamePlay({
  onResetState: onResetState,
  gameState,
  setGameState,
  player1,
  setPlayer1,
  player2,
  setPlayer2,
  scores,
  setScores,
  currentPlayer,
  setCurrentPlayer,
  currentDiceRoll,
  setDiceRoll,
  currentBoardState,
  setCurrentBoardState,
  moveLeft,
  setMoveLeft,
  selectedColumn,
  setSelectedColumn,
  whiteBar,
  setWhiteBar,
  blackBar,
  setBlackBar,
  whiteOut,
  setWhiteOut,
  blackOut,
  setBlackOut,
  alertSeen,
  setAlertSeen,
  started,
  setStarted,
}: GamePlayProps) {
  const rollTime = 2500; // in milliseconds

  PlayerNames = {
    white: [player1],
    black: [player2],
  };

  //manage state for online game
  // const [onlineGame, setOnlineGame] = useLocalStorage("onlineGame", null);
  let onlineGame = JSON.parse(localStorage.getItem("onlineGame") || "{}");

  useEffect(() => {
    //change player
    if (alertSeen && moveLeft == 0 && whiteOut !== 15 && blackOut !== 15) {
      togglePlayer(currentPlayer, setCurrentPlayer);
      setDiceRoll([0, 0]);
      setAlertSeen(false);
    }

    // const fetchData = async () => {
    console.log("state has changed:", currentPlayer);
    //send the state to the server
    if (onlineGame !== null) {
      const username = getUser().username;
      const matchId = onlineGame.matchId;
      const hostName = onlineGame.hostName;
      const wsMessage: type.WsMessage = {
        type: "state",
        msg: {
          scores: scores,
          currentPlayer: currentPlayer,
          currentDiceRoll: currentDiceRoll,
          currentBoardState: currentBoardState,
          moveLeft: moveLeft,
          selectedColumn: selectedColumn,
          whiteBar: whiteBar,
          blackBar: blackBar,
          whiteOut: whiteOut,
          blackOut: blackOut,
          alertSeen: alertSeen,
        },
        user: username,
        matchId: matchId,
        msgFor: hostName === username ? "guest" : "host",
      };
      if (currentPlayer === username) {
        sendWsMessage(wsMessage);
      }
    }
    // };
    // fetchData();
  }, [
    scores,
    currentPlayer,
    currentDiceRoll,
    currentBoardState,
    moveLeft,
    selectedColumn,
    whiteBar,
    blackBar,
    whiteOut,
    blackOut,
    alertSeen,
  ]);

  return (
    <div id='GamePlay' className="flex flex-col items-center ">
      <div className="  players relative flex flex-col gap-1">
        <Message
          scores={scores}
          onSetScores={(scores) => setScores(scores)}
          onResetState={onResetState}
          currentPlayer={currentPlayer}
          onCurrentPlayer={(player) => setCurrentPlayer(player)}
          player1={player1}
          player2={player2}
          moveLeft={moveLeft}
          whiteOut={whiteOut}
          blackOut={blackOut}
          started={started}
          onStarted={(started) => setStarted(started)}
        />
        <Players
          currentPlayer={currentPlayer}
          anyMoveAvailable={true}
          scores={scores}
          currentBoardState={currentBoardState}
          currentDiceRoll={currentDiceRoll}
          whiteBar={whiteBar}
          blackBar={blackBar}
          moveLeft={moveLeft}
          whiteOut={whiteOut}
          blackOut={blackOut}
          alertSeen={alertSeen}
          onAlertSeen={(seen) => setAlertSeen(seen)}
          onPlayerChange={(player) => setCurrentPlayer(player)}
          onMoveLeft={(moveLeft) => setMoveLeft(moveLeft)}
          onRoll={(roll) => setDiceRoll(roll)}
        />
      </div>
      <div className=" relative flex flex-col items-center mb-2 mt-6 sm:mt-3">
        <Alert
          gameState={gameState}
          onGameState={(gameState: string) => setGameState(gameState)}
          alertSeen={alertSeen}
          onAlertSeen={(seen) => setAlertSeen(seen)}
          currentBoardState={currentBoardState}
          currentPlayer={currentPlayer}
          currentDiceRoll={currentDiceRoll}
          whiteBar={whiteBar}
          blackBar={blackBar}
          rollTime={rollTime}
          moveLeft={moveLeft}
          whiteOut={whiteOut}
          blackOut={blackOut}
          onMoveLeft={(moves) => setMoveLeft(moves)}
          onResetState={onResetState}
        />
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
          alertSeen={alertSeen}
          onAlertSeen={(seen) => setAlertSeen(seen)}
        />
        <div className="absolute -top-3 sm:-top-1">
          <Dice
            currentDiceRoll={currentDiceRoll}
            onRoll={(roll) => setDiceRoll(roll)}
            moveLeft={moveLeft}
            onMoveLeft={(allowed) => setMoveLeft(allowed)}
            onPlayerChange={(player) => setCurrentPlayer(player)}
            whiteOut={whiteOut}
            blackOut={blackOut}
            rollTime={rollTime}
            onAlertSeen={(seen) => setAlertSeen(seen)}
            currentPlayer={currentPlayer}
            started={started}
          />
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
