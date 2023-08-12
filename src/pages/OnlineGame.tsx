import PageClass from "../components/PageClass";
import GamePlay from "../components/GamePlay";
import Chat from "../components/Chat";
import { useLocalStorage } from "../services/useLocalStorage";
import { WebSocketProvider } from "../services/WebSocketContext";

function OnlineGame() {
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

  return (
    <WebSocketProvider>
      <div>
        <div className="flex">
          <GamePlay />
          <div className=" w-full mx-auto p-4 sm:px-6 lg:px-8">
            <Chat />
            <p>Game ID: ${onlineGame.matchId}</p>
          </div>
        </div>
      </div>
    </WebSocketProvider>
  );
}

const OnlineGamePage: React.FC = () => {
  return <PageClass inputComponent={OnlineGame} />;
};
export default OnlineGamePage;
