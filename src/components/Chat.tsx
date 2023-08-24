import React, { useState, useEffect, ChangeEvent } from "react";
import { w3cwebsocket as W3CWebSocket, Message } from "websocket";
import { Card, Avatar, Input, Typography } from "antd";
import { getUser } from "../services/user.service";
import { getWebSocketClient } from "../services/websocketService";
import { useLocalStorage } from "../services/useLocalStorage";
import { updateOnlineGame } from "../services/GameService";
import { useNavigate } from "react-router-dom";
import * as type from "../types";
import { TdiceRoll, initialState } from "./GamePlay";

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

let chatWebSocketClient: W3CWebSocket | null = null;
export const sendWsMessage = (wsMessage: type.WsMessage) => {
  if (chatWebSocketClient) {
    chatWebSocketClient.send(JSON.stringify(wsMessage));
  }
};

const Chat = () => {
  //GamePlay state
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
    const [whiteOut, setWhiteOut] = useLocalStorage("whiteOut", 0);
    const [blackOut, setBlackOut] = useLocalStorage("blackOut", 0);
    const [alertSeen, setAlertSeen] = useLocalStorage("alertSeen", false);
//--------------------------
  const [started, setStarted] = useLocalStorage("started", "");
  const navigate = useNavigate();
  // const [player2, setPlayer2] = useLocalStorage("player2", "");
  const user = getUser().username.toString();
  const [isLoggedIn] = useState(true);
  const [messages, setMessages] = useState<type.WsMessage[]>([]);
  const [searchVal, setSearchVal] = useState("");
  //get onlineGame from local storage
  const onlineGame = JSON.parse(localStorage.getItem("onlineGame")!);
  const matchID = onlineGame.matchId;
  const userName = getUser().username.toString();
  if (userName === onlineGame.hostName) {
    var msgFor = "guest";
  } else {
    var msgFor = "host";
  }

  useEffect(() => {
    const fetchData = async () => {
      chatWebSocketClient = await getWebSocketClient();

      chatWebSocketClient.onopen = () => {
        console.log("chatWebSocket Client Connected");
      };

      chatWebSocketClient.onmessage = (message) => {
        const dataFromServer: type.DataFromServer = JSON.parse(
          message.data.toString()
        );
        console.log("got reply! ", dataFromServer);

        //handle state updates
        if (dataFromServer.type === "state") {
          console.log("got reply for State! ", dataFromServer);
          const wsMessage = dataFromServer.data as unknown as type.WsMessage;
          const newState = wsMessage.msg as any;
          //update GamePlay state
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
        }

        //check for userID
        if (dataFromServer.type === "userID") {
          //add userID to onlineGame
          if (userName === onlineGame.hostName) {
            onlineGame.hostId = dataFromServer.data;
          } else {
            onlineGame.guestId = dataFromServer.data;
          }

          localStorage.setItem("onlineGame", JSON.stringify(onlineGame));
          //send onlineGame to server to update
          updateOnlineGame(onlineGame);
          navigate(`/onlinegame`);
        }

        //************************************************************ */
        //check for joinOnlineGame
        if (dataFromServer.type === "gameJoined") {
          //update localstorage
          localStorage.setItem(
            "onlineGame",
            JSON.stringify(dataFromServer.data)
          );
          //update state
          if (started === "no") {
            let msg = dataFromServer.data as unknown as type.OnlineGame;
            setPlayer2(msg.guestName);
            navigate(`/onlinegame`);
            window.location.reload();
          }
          setStarted("yes");
        }

        if (dataFromServer.type === "chat") {
          let wsMessage = dataFromServer.data as unknown as type.WsMessage;
          console.log("got reply for Chat! ", dataFromServer);
          setMessages((prevState) => [wsMessage, ...prevState]);
        }
        if (dataFromServer.type === "game") {
          console.log("got reply for Game! ", dataFromServer);
          alert(dataFromServer.data);
        }
      };
    };

    fetchData();
    // Cleanup function to close the WebSocket connection on unmount
    return () => {
      if (chatWebSocketClient) {
        chatWebSocketClient.onmessage = () => {};
        chatWebSocketClient.onerror = () => {};
        // chatWebSocketClient.close();
      }
    };
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchVal(e.target.value);
  };

  const handleSearchSubmit = (value: string): void => {
    onButtonClicked(value);
  };

  const onButtonClicked = (value: string): void => {
    if (chatWebSocketClient) {
      chatWebSocketClient.send(
        JSON.stringify({
          type: "chat",
          msg: value,
          user: userName,
          matchId: matchID,
          msgFor: msgFor,
        })
      );
      setSearchVal("");
    }
  };

  return (
    <div className="border p-4 rounded-md border-cyan-700" id="wrapper">
      {isLoggedIn ? (
        <div>
          <div className="title">
            <Text
              id="main-heading"
              type="secondary"
              style={{ fontSize: "18px" }}
            >
              In Game Chat: <strong>{userName}</strong>
            </Text>
          </div>
          <div className="">
            <Search
              placeholder="input message and send"
              enterButton="Send"
              value={searchVal}
              size="large"
              onChange={handleSearchChange}
              onSearch={handleSearchSubmit}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: 50,
            }}
            id="messages"
          >
            {messages.map((message) => (
              <Card
                key={message.msg}
                style={{
                  width: 300,
                  margin: "16px 4px 0 4px",
                  alignSelf:
                    userName === message.user ? "flex-end" : "flex-start",
                }}
                loading={false}
              >
                <Meta
                  avatar={
                    <Avatar
                      style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                    >
                      {message.user[0].toUpperCase()}
                    </Avatar>
                  }
                  title={message.user + ":"}
                  description={message.msg}
                />
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ padding: "200px 40px" }}>
          You are not logged in, please enter your username to start chatting
        </div>
      )}
    </div>
  );
};

export default Chat;
