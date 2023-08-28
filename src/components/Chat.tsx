import React, { useState, useEffect, ChangeEvent } from "react";
import { w3cwebsocket as W3CWebSocket, Message } from "websocket";
import { Card, Avatar, Input, Typography } from "antd";
import { getUser } from "../services/user.service";
import { getWebSocketClient } from "../services/websocketService";
import { useLocalStorage } from "../services/useLocalStorage";
import { updateOnlineGame } from "../services/GameService";
import { useNavigate } from "react-router-dom";
import * as type from "../types";

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;
let chatWebSocketClient: W3CWebSocket | null = null;
export const sendWsMessage = (wsMessage: type.WsMessage) => {
  if (chatWebSocketClient) {
    chatWebSocketClient.send(JSON.stringify(wsMessage));
  }
};

interface chatProps {
  onNewState: (newState: any) => void;
  player2: string;
  setPlayer2: (player: string) => void;
}

const Chat: React.FC<chatProps> = (props) => {
  const [started, setStarted] = useLocalStorage("started", "");
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

        //gameUpdate
        if (dataFromServer.type === "gameUpdate") {
          console.log("got reply for GameUpdate! ", dataFromServer);
          const newOnlineGame = dataFromServer.data as unknown as type.WsMessage;
          localStorage.setItem("onlineGame", JSON.stringify(newOnlineGame));
        }

        //handle state updates
        if (dataFromServer.type === "state") {
          console.log("got reply for State! ", dataFromServer);
          const wsMessage = dataFromServer.data as unknown as type.WsMessage;
          const newState = wsMessage.msg as any;
          props.onNewState(newState);
        }

        //check for userID
        if (dataFromServer.type === "userID") {
          //add userID to onlineGame
          if (userName === onlineGame.hostName) {
            onlineGame.hostId = dataFromServer.data;
            //send onlineGame to server to update
            updateOnlineGame(onlineGame, "host");
          } else {
            onlineGame.guestId = dataFromServer.data;
            //send onlineGame to server to update
            updateOnlineGame(onlineGame, "guest");
          }

          localStorage.setItem("onlineGame", JSON.stringify(onlineGame));
          
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
            props.setPlayer2(msg.guestName);
            navigate(`/onlinegame`);
            // window.location.reload();
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
        chatWebSocketClient.close();
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
