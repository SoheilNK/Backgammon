import React, { useState, useEffect, ChangeEvent } from "react";
import { w3cwebsocket as W3CWebSocket, Message } from "websocket";
import { Card, Avatar, Input, Typography } from "antd";
import { clearGameData, getUser } from "../services/user.service";
import { getWebSocketClient } from "../services/websocketService";
import { useLocalStorage } from "../services/useLocalStorage";
import { useNavigate } from "react-router-dom";
import * as type from "../types";
import { audioDice } from "./Dice";
import { audioMove } from "./Board";

const { Search } = Input;
const { Text } = Typography;
let chatWebSocketClient: W3CWebSocket | null = null;
export const sendWsMessage = (wsMessage: type.WsMessage) => {
  if (chatWebSocketClient) {
    chatWebSocketClient.send(JSON.stringify(wsMessage));
  }
};

interface chatProps {
  gameState: string;
  onGameState: (gameState: string) => void;
  onNewState: (newState: any) => void;
  onResetState: () => void;
  onPlayer1: (player: string) => void;
  onPlayer2: (player: string) => void;
  onCurrentPlayer: (player: string) => void;
  started: string;
  setStarted: (started: string) => void;
}

const Chat: React.FC<chatProps> = (props) => {
  const [gameState, onGameState] = useLocalStorage("gameState", "new"); //use it to show Alert component
  const [started, setStarted] = useLocalStorage("started", "no");
  const navigate = useNavigate();
  const [player2, setPlayer2] = useLocalStorage("player2", "");
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
    var msgFrom = "host";
  } else {
    var msgFor = "host";
    var msgFrom = "guest";
  }

  useEffect(
    () => {
      const fetchData = async () => {
        chatWebSocketClient = await getWebSocketClient();

        chatWebSocketClient.onopen = () => {
          console.log("chatWebSocket Client Connected");
        };

        chatWebSocketClient.onmessage = (message) => {
          const dataFromServer: type.DataFromServer = JSON.parse(
            message.data.toString()
          );
          console.log("got reply(chat.tsx)! ", dataFromServer);
          //handle chcker move sound
          if (dataFromServer.type === "checkerMoved") {
            console.log("got reply for checkerMoved! ", dataFromServer);
            //play a sound
            audioMove.play();
          }
          //handle dice sound and animation
          if (dataFromServer.type === "diceRoll") {
            console.log("got reply for diceRoll! ", dataFromServer);
            //play a sound
            audioDice.play();
          }

          //handle hostLeft
          if (dataFromServer.type === "hostLeft") {
            console.log("got reply for hostLeft! ", dataFromServer);
            // alert("Host has left the game, you will be the new host");
            props.onGameState("abandoned");
            //reset the game
            clearGameData();
            //update localstorage
            localStorage.setItem(
              "onlineGame",
              JSON.stringify(dataFromServer.data)
            );
            //update state
            props.onPlayer1(userName);
            props.onPlayer2("");
            // props.onCurrentPlayer(userName);
            props.setStarted("no");
            //reset the game
            props.onResetState();
          }
          //handle guestLeft
          if (dataFromServer.type === "guestLeft") {
            console.log("got reply for guestLeft! ", dataFromServer);
            // alert("Guest has left the game");
            props.onGameState("abandoned");
            //reset the game
            clearGameData();
            //update localstorage
            localStorage.setItem(
              "onlineGame",
              JSON.stringify(dataFromServer.data)
            );
            //update state
            props.onPlayer2("");
            // props.onCurrentPlayer(userName);
            props.setStarted("no");
            //reset the game
            props.onResetState();
          }

          //gameUpdate
          if (dataFromServer.type === "gameUpdate") {
            console.log("got reply for GameUpdate! ", dataFromServer);
            const newOnlineGame =
              dataFromServer.data as unknown as type.WsMessage;
            localStorage.setItem("onlineGame", JSON.stringify(newOnlineGame));
          }

          //handle state updates
          if (dataFromServer.type === "state") {
            console.log("got reply for State! ", dataFromServer);
            const wsMessage = dataFromServer.data as unknown as type.WsMessage;
            const newState = wsMessage.msg as any;
            props.onNewState(newState);
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
            // if (started === "no") {
            let msg = dataFromServer.data as unknown as type.OnlineGame;
            props.onPlayer2(msg.guestName);
            // navigate(`/onlinegame`);
            // window.location.reload();
            // }
            props.setStarted("yes");
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
      // // Cleanup function when leaving the component
      // return () => {
      //   console.log(
      //     "Leaving the game... , Clearing Game Data... Match Id: " + matchID
      //   );
      //   clearGameData();
      //   //leave the game
      //   leaveOnlineGame(onlineGame, msgFrom);
      //   if (chatWebSocketClient) {
      //     chatWebSocketClient.onmessage = () => {};
      //     chatWebSocketClient.onerror = () => {};
      //     chatWebSocketClient.close();
      //     console.log(
      //       "chatWebSocket Client Disconnected, online user: " + getUser()
      //     );
      //   }
      // };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
    <div
      className="border p-2 min-w-min rounded-md border-cyan-700"
      id="wrapper"
    >
      {isLoggedIn ? (
        <div>
          <div className="title flex">
            <Text
              id="main-heading"
              type="secondary"
              style={{ fontSize: "14px" }}
            >
              In Game Chat: <strong>{userName}</strong>
            </Text>
            <Text
              className="ml-auto"
              id="main-heading"
              type="secondary"
              style={{ fontSize: "14px" }}
            >
              Game ID: <strong>{onlineGame.matchId}</strong>
            </Text>
          </div>
          <div className="">
            <Search
              placeholder="input message and send"
              enterButton="Send"
              value={searchVal}
              style={{ fontSize: "14px" }}
              onChange={handleSearchChange}
              onSearch={handleSearchSubmit}
            />
          </div>
          <div className="flex flex-col pb-12 w-full" id="messages">
            {messages.map((message) => (
              <div
                key={message.msg}
                className={`w-full my-1 py-0 ${
                  userName === message.user ? "self-end" : "self-start"
                }`}
                // loading={false}
              >
                <div
                  className={`flex items-center w-full ${
                    userName === message.user ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar
                    style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                    className={`${userName === message.user ? "ml-2" : "mr-2"}`}
                  >
                    {message.user[0].toUpperCase()}
                  </Avatar>
                  <span className="font-thin scale-x-75">[{message.user}]</span>
                  <span
                    style={{ fontSize: "14px" }}
                    className="text-sm sm:text-base md:text-lg break-words"
                  >
                    {message.msg}
                  </span>
                </div>
              </div>
            ))}
          </div>{" "}
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
