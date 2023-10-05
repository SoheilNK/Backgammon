import PageClass from "../components/PageClass";
import { useSearchParams } from "react-router-dom";
import { clearGameData, getUser } from "../services/user.service";
import GamePlay, { Color } from "../components/GamePlay";
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";
import Chat from "../components/Chat";
import { useLocalStorage } from "../services/useLocalStorage";
import { useEffect, useState } from "react";
import { TdiceRoll } from "../components/GamePlay";

import history from "../history";
import { leaveOnlineGame } from "../services/GameService";

function OnlineGame() {
  const initialState: Color[][] = [
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
  const allAtHomelState: Color[][] = [
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
  const moveOutState: Color[][] = [
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
  const winState: Color[][] = [
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

  //
  const [block, setBlock] = useState(true);

  useEffect(() => {
    //handle leaving the game
    let unblock: () => void;
    if (block) {
      // Block navigation and register a callback that
      // fires when a navigation attempt is blocked.
      unblock = history.block((tx) => {
        // Navigation was blocked! Let's show a confirmation dialog
        // so the user can decide if they actually want to navigate
        // away and discard changes they've made in the current page.
        let url = tx.location.pathname;
        if (
          window.confirm(
            `Are you sure you want to leave the game? \n You will lose the game if you leave!`
          )
        ) {
          // Unblock the navigation.
          unblock();
          // Retry the transition.
          tx.retry();
          //leave the game
          leaveOnlineGame();
          clearGameData();
          // localStorage.setItem(
          //   "currentBoardState",
          //   JSON.stringify("undefined")
          // );
        }
      });
    }

    return () => {
      if (typeof unblock === "function") {
        unblock();
      }
    };
  }, [block]);

  const userName = getUser().username.toString();
  //GamePlay state----------------
  const [gameState, setGameState] = useLocalStorage("gameState", "new"); //use it to show Alert component
  const [started, setStarted] = useLocalStorage("started", "no");
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
    // initialState
    // allAtHomelState
    // moveOutState
    winState
  );
  const [moveLeft, setMoveLeft] = useLocalStorage("moveLeft", 0);
  const [selectedColumn, setSelectedColumn] = useLocalStorage(
    "selectedColumn",
    50
  );
  const [whiteBar, setWhiteBar] = useLocalStorage("whiteBar", 0);
  const [blackBar, setBlackBar] = useLocalStorage("blackBar", 0);
  // const [whiteOut, setWhiteOut] = useLocalStorage("whiteOut", 0); //intialState
  // const [blackOut, setBlackOut] = useLocalStorage("blackOut", 0); //intialState
  const [whiteOut, setWhiteOut] = useLocalStorage("whiteOut", 12); //winState
  const [blackOut, setBlackOut] = useLocalStorage("blackOut", 12); //winState
  const [alertSeen, setAlertSeen] = useLocalStorage("alertSeen", false);
  //--------------------------
  const resetState = () => {
    setScores([0, 0]);
    setCurrentPlayer(player1);
    setDiceRoll([0, 0]);
    setCurrentBoardState(initialState);
    setMoveLeft(0);
    setSelectedColumn(50);
    setWhiteBar(0);
    setBlackBar(0);
    setWhiteOut(0);
    setBlackOut(0);
    setAlertSeen(false);
    setStarted("no");
  };
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
  let onlineGame = JSON.parse(localStorage.getItem("onlineGame") || "{}");
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
          gameState={gameState}
          setGameState={setGameState}
          started={started}
          setStarted={setStarted}
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
          onResetState={resetState}
        />
        <div className=" w-full mx-auto p-4 sm:px-6 lg:px-8">
          <Chat
            gameState={gameState}
            onGameState={(gameState: string) =>
              setGameState(gameState as never as string)
            }
            onNewState={updateState}
            onResetState={resetState}
            // player1={player1}
            onPlayer1={(player: string) => setPlayer1(player)}
            // player2={player2}
            onPlayer2={(player: string) => setPlayer2(player)}
            onCurrentPlayer={(player: string) => setCurrentPlayer(player)}
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

