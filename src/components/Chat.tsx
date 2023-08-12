import React, { useState, useEffect, ChangeEvent } from "react";
import { Card, Avatar, Input, Typography } from "antd";
import { getUser } from "../services/user.service";
import { getWebSocketClient } from "../services/websocketService";
import { useLocalStorage } from "../services/useLocalStorage";
import { useNavigate } from "react-router-dom";
import * as type from "../types";
import { useWebSocket } from "../services/WebSocketContext";
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

function Chat() {
  const [isLoggedIn] = useState(true);
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
      console.log("Received message in Component A:", message.data);
      const dataFromServer: type.DataFromServer = JSON.parse(
        message.data.toString()
      );
      console.log("got reply! From Chat ", dataFromServer);
      if (dataFromServer.type === "message") {
        setMessages((prevState: any) => [
          {
            msg: dataFromServer.msg,
            user: dataFromServer.user,
          },
          ...prevState,
        ]);
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
        type: "message",
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
            {messages.map((message: type.WsMessage) => (
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
