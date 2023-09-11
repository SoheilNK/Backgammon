import { useState, useEffect, ChangeEvent } from "react";
import PageClass from "../components/PageClass";
import { useSearchParams, useLocation, prompt } from "react-router-dom";
import { clearGameData, getUser } from "../services/user.service";
import GamePlay from "../components/GamePlay";
import Chat from "../components/Chat";
import { useLocalStorage } from "../services/useLocalStorage";
import { useEffect, useState } from "react";
import { TdiceRoll, winState as initialState } from "../components/GamePlay";
import { leaveOnlineGame } from "../services/GameService";


function OnlineGame() {
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

useEffect(() => {
  const handleUrlChange = () => {
    console.log("URL changed[popstate]:", window.location.href);
  };

  window.addEventListener("popstate", handleUrlChange);

  return () => {
    window.removeEventListener("popstate", handleUrlChange);
  };
}, []);

  // let location = useLocation();

  // useEffect(() => {
  //   console.log("location changed");
  //   //ask if the user wants to leave the game
  //   if (location.pathname !== "/onlinegame") {
  //     if (window.confirm("Do you want to leave the game?")) {
  //       //leave the game
  //       console.log(
  //         "Leaving the game... , Clearing Game Data... Match Id: " + matchID
  //       );
  //       clearGameData();
  //       //leave the game
  //       leaveOnlineGame(onlineGame, msgFrom);
  //     } else {
  //       //stay in the game
  //       window.history.replaceState(
  //         {},
  //         document.title,
  //         "/Backgammon/OnlineGame"
  //       );
  //     }
  //   }
  // }, [location]);

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
  // var p1 = onlineGame?.hostName;
  // var p2 = onlineGame?.guestName || "Waiting for player 2...";
  useEffect(() => {
    setPlayer1(onlineGame?.hostName);
    setPlayer2(onlineGame?.guestName || "Waiting for player 2...");
  }, [onlineGame]);

  // localStorage.setItem("player1", JSON.stringify(p1));
  // localStorage.setItem("player2", JSON.stringify(p2));
  // if (onlineGame?.status === "Playing") {
  //   localStorage.setItem("started", JSON.stringify("yes"));
  // } else {
  //   localStorage.setItem("started", JSON.stringify("no"));
  // }
  const { sendWebSocketMessage, handleWebSocketMessage } = useWebSocket();

  useEffect(() => {
    handleWebSocketMessage((message) => {
      // Handle the incoming messages in OnlineGame
      console.log("Received message in OnlineGame:", message);
      const wsMessage: type.WsData = JSON.parse(message.data.toString());
      console.log("Message of type: ", wsMessage);
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
        let newOnlineData = wsMessage.msg;
        //update localstorage
        setOnlineGame(newOnlineData);
        // setPlayer2(newOnlineData.guestName);
        setStarted("yes");
      }

      if (wsMessage.type === "game") {
        console.log("got reply for Game! ", wsMessage);
        alert(wsMessage.msg);
      }

      if (wsMessage.type === "chat") {
        console.log("got reply! for Chat ", wsMessage);
        setMessages((prevState: any) => [
          {
            msg: wsMessage.msg,
            user: wsMessage.user,
          },
          ...prevState,
        ]);
      }
    });
  }, [handleWebSocketMessage]);
  //--------------------------------------------------------------------------------
  //update state
  if (started === "yes") {
    // setPlayer2(p2);
    // setStarted("yes");
    // navigate(`/onlinegame`);
    // window.location.reload();
  }

  return (
    <div>
      <div className="flex">
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
  const [isNavigating, setIsNavigating] = useState(false);

  // This effect will set isNavigating to true when the user tries to navigate away
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      setIsNavigating(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Prompt
        when={isNavigating}
        message="Are you sure you want to leave this page? Your progress may be lost."
      />
      <PageClass inputComponent={OnlineGame} />;
    </>
  );
};

export default OnlineGamePage;

// let location = useLocation();

// console.log("location: ", location);
// useEffect(() => {
//   console.log("location changed");
//   //ask if the user wants to leave the game
//   if (location.pathname !== "/onlinegame") {
//     if (window.confirm("Do you want to leave the game room?")) {
//       //leave the game
//       console.log(
//         "Leaving the OnlineGame... , Clearing Game Data... Match Id: " +
//           matchID
//       );
//       clearGameData();
//       //leave the game
//       leaveOnlineGame(onlineGame, msgFrom);
//     } else {
//       //stay in the game
//       window.history.replaceState(
//         {},
//         document.title,
//         "/Backgammon/OnlineGame"
//       );
//     }
//   }
// }, [location]);
