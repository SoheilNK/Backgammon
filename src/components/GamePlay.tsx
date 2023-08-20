import { Board } from "./Board";
import Dice from "./Dice";
import Players from "./Players";
import { Message } from "./Message";
import { Alert } from "./Alert";
import { useLocalStorage } from "../services/useLocalStorage";
import { togglePlayer } from "../services/gameRules";
import { getUser } from "../services/user.service";
import { useEffect } from "react";
import { getWebSocketClient } from "../services/websocketService";
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";
import * as type from "../types";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../services/WebSocketContext";

//----------------------------------------------
export let PlayerNames = {
  white: ["Player 1"],
  black: ["Player 2"],
};

function GamePlay() {
  const [player1, setPlayer1] = useLocalStorage("player1", "");
  const [player2, setPlayer2] = useLocalStorage("player2", "");
  const [scores, setScores] = useLocalStorage("scores", [0, 0]);
  const [currentPlayer, setCurrentPlayer] = useLocalStorage(
    "currentPlayer",
    player1
  );
  const [currentDiceRoll, setDiceRoll] = useLocalStorage("currentDiceRoll", [
    0, 0,
  ] as type.TdiceRoll);
  const [currentBoardState, setCurrentBoardState] = useLocalStorage(
    "currentBoardState",
    initialState
  );
  const [moveLeft, setMoveLeft] = useLocalStorage("moveLeft", 0);
  const [selectedColumn, setSelectedColumn] = useLocalStorage(
    "selectedColumn",
    50
  );
  const [whiteBar, setWhiteBar] = useLocalStorage("whiteBar", 0);
  const [blackBar, setBlackBar] = useLocalStorage("blackBar", 0);
  const [whiteOut, setWhiteOut] = useLocalStorage("whiteOut", 0);
  const [blackOut, setBlackOut] = useLocalStorage("blackOut", 0);
  const [alertSeen, setAlertSeen] = useLocalStorage("alertSeen", false);
  const rollTime = 2500; // in milliseconds

  const [online, setOnline] = useLocalStorage("online", false);
  const [started, setStarted] = useLocalStorage("started", "");
  const navigate = useNavigate();
  const [messages, setMessages] = useLocalStorage("messages", []);

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

  let handelClick = () => {};

  if (online === true) {
    //------------It is an online game---------------
    //get onlineGame data from local storage
    const onlineGame = JSON.parse(localStorage.getItem("onlineGame")!);
    const matchID = onlineGame.matchId;
    const userName = getUser().username.toString();
    if (userName === onlineGame.hostName) {
      var msgFor = "guest";
    } else {
      var msgFor = "host";
    }

    //-------------web socket client-----------------
    const { sendWebSocketMessage, handleWebSocketMessage } = useWebSocket();

    const sendMessage = (value: string) => {
      sendWebSocketMessage(value);
    };
    handelClick = () => {
      console.log("handelClick");
      const message: type.WsData = {
        type: "game",
        msg: "test",
        user: userName,
        matchId: matchID,
        msgFor: msgFor as "host" | "guest",
      };
      console.log("message: ", message);
      sendMessage(JSON.stringify(message));
    };

    //-------------web socket client-----------------
  } else {
    //------------It is a local game-----------------
  }

  return (
    <div className="flex flex-col items-center">
      <div className="  players relative flex flex-col gap-1">
        <div className="testWS">
          <button onClick={handelClick}>testWS</button>
        </div>

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
          onRoll={(roll) => setDiceRoll(roll) as type.TdiceRoll}
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
          onRoll={(roll) => setDiceRoll(roll) as type.TdiceRoll}
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
          />
        </div>
      </div>
    </div>
  );
}

export default GamePlay;

let initialState: type.Color[][] = [
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

let initialState1: type.Color[][] = [
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
let initialState2: type.Color[][] = [
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
let winState: type.Color[][] = [
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
