import PageClass from "../components/PageClass";
import { useSearchParams } from "react-router-dom";
import { getUser } from "../services/user.service";
import GamePlay from "../components/GamePlay";


function OnlineGame() {
  const [searchParams, setSearchParams] = useSearchParams();

  const matchID = searchParams.get("matchID");

  if (matchID !== null) {
    window.history.replaceState({}, document.title, "/Backgammon/");
    console.log(matchID);
    }
    
  //get username from local storage
  const user = getUser();
  var p1 = user.username;
    var p2 = "Guest";
    
    //establish connection with the server
    var socket = new WebSocket("ws://localhost:8001/ws/game/" + matchID + "/");
    socket.onopen = function (e) {
        console.log("Connection established!");
    };
    socket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        console.log(data);
        if (data.type === "player2") {
            p2 = data.message;
        }
        if (data.type === "player1") {
            p1 = data.message;
        }
        if (data.type === "start") {    
            console.log("Game started!");
        }
        if (data.type === "move") {
            console.log("Move made!");
        }
        if (data.type === "turn") {
            console.log("Turn changed!");
        }
        if (data.type === "winner") {
            console.log("Winner declared!");
        }
        if (data.type === "error") {
            console.log("Error!");
        }
    };
    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log("Connection closed cleanly!");
        } else {
            console.log("Connection died!");
        }
        console.log("Code: " + event.code + " Reason: " + event.reason);
    };
    socket.onerror = function (error) {
        console.log("Error: " + error);
    };



  localStorage.setItem("player1", JSON.stringify(p1));
  localStorage.setItem("player2", JSON.stringify(p2));
  localStorage.setItem("started", JSON.stringify("yes"));

  return (
    <div>
      <div className="container m-auto p-1">
        <div className="  bg-white relative  rounded-md p-8 m-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
          <div>
            <h1>Game ID: ${matchID}</h1>
            <GamePlay />
          </div>
        </div>
      </div>
    </div>
  );
}

const OnlineGamePage: React.FC = () => {
  return <PageClass inputComponent={OnlineGame} />;
};
export default OnlineGamePage;
