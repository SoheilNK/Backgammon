import { Board } from "./Board";
import Dice from "./Dice";
import Players from "./Players";
import { Message } from "./Message";
import { Alert } from "./Alert";
import { useLocalStorage } from "../services/useLocalStorage";
import { togglePlayer } from "../services/gameRules";
import { getUser } from "../services/user.service";
import { useEffect, useState } from "react";
import { getWebSocketClient } from "../services/websocketService";
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";
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
}

function GamePlay({
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
}: GamePlayProps) {
  const rollTime = 2500; // in milliseconds

  PlayerNames = {
    white: [player1],
    black: [player2],
  };

  //change player
  if (alertSeen && moveLeft == 0 && whiteOut !== 15 && blackOut !== 15) {
    togglePlayer(currentPlayer, setCurrentPlayer);
    setDiceRoll([0, 0]);
    setAlertSeen(false);
  }

  //manage state for online game
  const [onlineGame, setOnlineGame] = useLocalStorage("onlineGame", null);

  useEffect(() => {
    // const fetchData = async () => {
    console.log("currentPlayer has changed:", currentPlayer);
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

      sendWsMessage(wsMessage);
    }
    // };
    // fetchData();
  }, [currentPlayer]);

  return (
    <div className="flex flex-col items-center">
      <div className="  players relative flex flex-col gap-1">
        <Message
          currentPlayer={currentPlayer}
          moveLeft={moveLeft}
          whiteOut={whiteOut}
          blackOut={blackOut}
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
          />
        </div>
      </div>
    </div>
  );
}

export default GamePlay;

export let initialState: Color[][] = [
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
let winState: Color[][] = [
  //test state for winner
  ["Black", "Black"],
  [],
  ["Black"],
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
  ["White"],
  [],
  ["White"],
  [],
  [],
  ["White"],
];
