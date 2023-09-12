import PageClass from "../components/PageClass";
import { useSearchParams, useLocation } from "react-router-dom";
import { clearGameData, getUser } from "../services/user.service";
import GamePlay from "../components/GamePlay";
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";
import Chat from "../components/Chat";
import { useLocalStorage } from "../services/useLocalStorage";
import { useEffect, useState } from "react";
import { TdiceRoll, winState as initialState } from "../components/GamePlay";
import { leaveOnlineGame } from "../services/GameService";
import history from "../history";


function OnlineGame() {
  //
    const [block, setBlock] = useState(true);

    useEffect(() => {
      let unblock: () => void;
      if (block) {
        // Block navigation and register a callback that
        // fires when a navigation attempt is blocked.
        unblock = history.block((tx) => {
          // Navigation was blocked! Let's show a confirmation dialog
          // so the user can decide if they actually want to navigate
          // away and discard changes they've made in the current page.
          let url = tx.location.pathname;
          if (window.confirm(`Are you sure you want to go to "${url}"?`)) {
            // Unblock the navigation.
            unblock();

            // Retry the transition.
            tx.retry();
          }
        });
      }

      return () => {
        if (typeof unblock === "function") {
          unblock();
        }
      };
    }, [block]);


  //get onlineGame from local storage
  const onlineGame = JSON.parse(localStorage.getItem("onlineGame")!);
  const matchID = onlineGame.matchId;
  const userName = getUser().username.toString();
  if (userName === onlineGame.hostName) {
    var msgFor = "guest";
    var msgFrom = "host";
  } else {
    var msgFor = "host";
    var msgFrom = "guest";
  }
  //GamePlay state----------------
  const [player1, setPlayer1] = useLocalStorage("player1", "");
  const [player2, setPlayer2] = useLocalStorage("player2", "");
  const [scores, setScores] = useLocalStorage("scores", [0, 0]);
  const [currentPlayer, setCurrentPlayer] = useLocalStorage(
    "currentPlayer",
    player1
  );
  const [currentDiceRoll, setDiceRoll] = useLocalStorage("currentDiceRoll", [
    0, 0,
  ] as TdiceRoll);
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
  const [whiteOut, setWhiteOut] = useLocalStorage("whiteOut", 12); //0
  const [blackOut, setBlackOut] = useLocalStorage("blackOut", 12); //0
  const [alertSeen, setAlertSeen] = useLocalStorage("alertSeen", false);
  const [started, setStarted] = useLocalStorage("started", "no");
  //--------------------------
  const updateState = (newState: any) => {
    //update GamePlay state
    setScores(newState.scores);
    setCurrentPlayer(newState.currentPlayer);
    setDiceRoll(newState.currentDiceRoll);
    setCurrentBoardState(newState.currentBoardState);
    setMoveLeft(newState.moveLeft);
    setSelectedColumn(newState.selectedColumn);
    setWhiteBar(newState.whiteBar);
    setBlackBar(newState.blackBar);
    setWhiteOut(newState.whiteOut);
    setBlackOut(newState.blackOut);
    setAlertSeen(newState.alertSeen);
  };

  //get the match id from local storage
  // const [onlineGame, setOnlineGame] = useLocalStorage("onlineGame", null);
  // let onlineGame = JSON.parse(localStorage.getItem("onlineGame") || "{}");
  // if (onlineGame !== null) {
  //   window.history.replaceState({}, document.title, "/Backgammon/");
  //   console.log(onlineGame);
  // }

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
    <div>
      <div className="flex flex-col lg:flex-row">
        <GamePlay
          player1={player1}
          setPlayer1={setPlayer1}
          player2={player2}
          setPlayer2={setPlayer2}
          scores={scores}
          setScores={setScores}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          currentDiceRoll={currentDiceRoll}
          setDiceRoll={setDiceRoll}
          currentBoardState={currentBoardState}
          setCurrentBoardState={setCurrentBoardState}
          moveLeft={moveLeft}
          setMoveLeft={setMoveLeft}
          selectedColumn={selectedColumn}
          setSelectedColumn={setSelectedColumn}
          whiteBar={whiteBar}
          setWhiteBar={setWhiteBar}
          blackBar={blackBar}
          setBlackBar={setBlackBar}
          whiteOut={whiteOut}
          setWhiteOut={setWhiteOut}
          blackOut={blackOut}
          setBlackOut={setBlackOut}
          alertSeen={alertSeen}
          setAlertSeen={setAlertSeen}
          started={started}
          setStarted={setStarted}
        />
        <div className=" w-full mx-auto p-4 sm:px-6 lg:px-8">
          <Chat
            onNewState={updateState}
            player2={player2}
            setPlayer2={setPlayer2}
            started={started}
            setStarted={setStarted}
          />
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
