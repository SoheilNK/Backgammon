import PageClass from "../components/PageClass";
import { useSearchParams } from "react-router-dom";
import { getUser } from "../services/user.service";
import GamePlay from "../components/GamePlay";
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";
import Chat from "../components/Chat";
import { useLocalStorage } from "../services/useLocalStorage";

function OnlineGame() {
  //get the match id from local storage
  const [onlineGame, setOnlineGame] = useLocalStorage("onlineGame", null);
  if (onlineGame !== null) {
    window.history.replaceState({}, document.title, "/Backgammon/");
    console.log(onlineGame);
  }

  //set the player names
  var p1 = onlineGame?.hostName;
  var p2 = onlineGame?.guestName;

  // //establish connection with the server
  // var socket = new WebSocket("ws://localhost:8001/ws/game/" + matchID + "/");
  // socket.onopen = function (e) {
  //     console.log("Connection established!");
  // };
  // socket.onmessage = function (event) {
  //     var data = JSON.parse(event.data);
  //     console.log(data);
  //     if (data.type === "player2") {
  //         p2 = data.message;
  //     }
  //     if (data.type === "player1") {
  //         p1 = data.message;
  //     }
  //     if (data.type === "start") {
  //         console.log("Game started!");
  //     }
  //     if (data.type === "move") {
  //         console.log("Move made!");
  //     }
  //     if (data.type === "turn") {
  //         console.log("Turn changed!");
  //     }
  //     if (data.type === "winner") {
  //         console.log("Winner declared!");
  //     }
  //     if (data.type === "error") {
  //         console.log("Error!");
  //     }
  // };
  // socket.onclose = function (event) {
  //     if (event.wasClean) {
  //         console.log("Connection closed cleanly!");
  //     } else {
  //         console.log("Connection died!");
  //     }
  //     console.log("Code: " + event.code + " Reason: " + event.reason);
  // };
  // socket.onerror = function (error) {
  //     console.log("Error: " + error);
  // };

  localStorage.setItem("player1", JSON.stringify(p1));
    localStorage.setItem("player2", JSON.stringify(p2));
    if (onlineGame?.status === "Playing") {
        localStorage.setItem("started", JSON.stringify("yes"));
    } else {
        localStorage.setItem("started", JSON.stringify("no"));
  }
  
  const [player1, setPlayer1] = useLocalStorage("player1", null);
  const [player2, setPlayer2] = useLocalStorage("player2", null);
  const [started, setStarted] = useLocalStorage("started", null);


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
