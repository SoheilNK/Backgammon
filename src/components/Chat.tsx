import React, { useState, useEffect, ChangeEvent } from "react";
import { Card, Avatar, Input, Typography } from "antd";
import { getUser } from "../services/user.service";
import { getWebSocketClient } from "../services/websocketService";
import { useLocalStorage } from "../services/useLocalStorage";
import * as type from "../types";
import { useWebSocket } from "../services/WebSocketContext";
import { useNavigate } from "react-router-dom";
import { updateOnlineGame } from "../services/GameService";

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

function Chat() {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(true);
  //----------------game states----------------
  const [player1, setPlayer1] = useLocalStorage("player1", "");
  const [player2, setPlayer2] = useLocalStorage("player2", "");
  const [started, setStarted] = useLocalStorage("started", "");

  // const [messages, setMessages] = useState<type.WsMessage[]>([]);
  const [messages, setMessages] = useLocalStorage("messages", []);
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

  const { sendWebSocketMessage, handleWebSocketMessage } = useWebSocket();

  const sendMessage = (value: string) => {
    sendWebSocketMessage(value);
  };

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
      // //check for userID
      // if (wsMessage.type === "userID") {
      //   //add userID to onlineGame *****update in onlineGame
      //   if (userName === onlineGame.hostName) {
      //     onlineGame.hostId = wsMessage.msg;
      //   } else {
      //     onlineGame.guestId = wsMessage.msg;
      //   }
      //   localStorage.setItem("onlineGame", JSON.stringify(onlineGame));
      //   //send onlineGame to server to update
      //   updateOnlineGame(onlineGame);
      //   navigate(`/onlinegame`);
      // }
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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchVal(e.target.value);
  };

  const handleSearchSubmit = (value: string): void => {
    sendMessage(
      JSON.stringify({
        type: "chat",
        msg: value,
        user: userName,
        matchId: matchID,
        msgFor: msgFor,
      })
    );
    setSearchVal("");
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
            {messages.map((message: type.WsData) => (
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
}

export default Chat;
