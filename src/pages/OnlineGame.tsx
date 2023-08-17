import { useState, useEffect, ChangeEvent } from "react";
import PageClass from "../components/PageClass";
import GamePlay from "../components/GamePlay";
import Chat from "../components/Chat";
import { useLocalStorage } from "../services/useLocalStorage";
import { WebSocketProvider, useWebSocket } from "../services/WebSocketContext";
import * as type from "../types";
import { useNavigate } from "react-router-dom";

function OnlineGame() {
  //all states of the GamePlay----------------
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
    ""
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
  //all states of the Chat----------------
  const [messages, setMessages] = useLocalStorage("messages", []);

  //get the onlineGame data from local storage
  const [onlineGame, setOnlineGame] = useLocalStorage("onlineGame", null);
  if (onlineGame !== null) {
    window.history.replaceState({}, document.title, "/Backgammon/");
    console.log(onlineGame);
  }

  //set the player names
  var p1 = onlineGame?.hostName;
  var p2 = onlineGame?.guestName;

  localStorage.setItem("player1", JSON.stringify(p1));
  localStorage.setItem("player2", JSON.stringify(p2));
  if (onlineGame?.status === "Playing") {
    localStorage.setItem("started", JSON.stringify("yes"));
  } else {
    localStorage.setItem("started", JSON.stringify("no"));
  }
  const { sendWebSocketMessage, handleWebSocketMessage } = useWebSocket();

  useEffect(() => {
    handleWebSocketMessage((message) => {
      // Handle the incoming message for Component A
      console.log("Received message in Component A:", message);
      const wsMessage: type.WsData = JSON.parse(message.data.toString());
      console.log("got reply! From Chat ", wsMessage);
      if (wsMessage.type === "chat") {
        setMessages((prevState: any) => [
          {
            msg: wsMessage.msg,
            user: wsMessage.user,
          },
          ...prevState,
        ]);
      }
      //----------------game messages----------------

      //check for joinOnlineGame
      if (wsMessage.type === "gameJoined") {
        let newOnlineData: type.OnlineGame = JSON.parse(wsMessage.msg);
        //update localstorage
        localStorage.setItem("onlineGame", wsMessage.msg);
        //update state
        if (started === "no") {
          setPlayer2(newOnlineData.guestName);
          navigate(`/onlinegame`);
          window.location.reload();
        }
        setStarted("yes");
      }
      if (wsMessage.type === "game") {
        console.log("got reply for Game! ", wsMessage);
        alert(wsMessage.msg);
      }
    });
  }, [handleWebSocketMessage]);
  //--------------------------------------------------------------------------------

  return (
      <div>
        <div className="flex">
          <GamePlay />
          <div className=" w-full mx-auto p-4 sm:px-6 lg:px-8">
            <Chat />
            <p>Game ID: ${onlineGame.matchId}</p>
          </div>
        </div>
      </div>
  );
}

const OnlineGamePage: React.FC = () => {
  return <PageClass inputComponent={OnlineGame} />;
};
export default OnlineGamePage;
