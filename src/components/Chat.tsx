import React, { useState, useEffect, ChangeEvent } from "react";
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";
import { Card, Avatar, Input, Typography } from "antd";
import { getUser } from "../services/user.service";
import { getWebSocketClient } from "../services/websocketService";
import { useLocalStorage } from "../services/useLocalStorage";

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

// const onlineGame = JSON.parse(localStorage.getItem("onlineGame")!);
// const matchID = onlineGame.matchId;

interface Message {
  msg: string;
  user: string;
}

interface DataFromServer {
  type: string;
  msg: string;
  user: string;
}

interface ChatState {
  userName: string;
  isLoggedIn: boolean;
  messages: Message[];
  searchVal: string;
}
let chatWebSocketClient: W3CWebSocket | null = null;


const Chat = () => {
  const user = getUser().username.toString();
  const [userName] = useState(user);
  const [isLoggedIn] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchVal, setSearchVal] = useState("");


useEffect(() => {

  const fetchData = async () => {
    chatWebSocketClient = await getWebSocketClient(8001);

    chatWebSocketClient.onopen = () => {
      console.log("chatWebSocket Client Connected");
    };

    chatWebSocketClient.onmessage = (message: IMessageEvent) => {
      const dataFromServer: DataFromServer = JSON.parse(
        message.data.toString()
      );
      console.log("got reply! ", dataFromServer);
      if (dataFromServer.type === "message") {
        console.log("got reply for Chat! ", dataFromServer);
        setMessages((prevState) => [
          {
            msg: dataFromServer.msg,
            user: dataFromServer.user,
          },
          ...prevState,
        ]);
      }
      if (dataFromServer.type === "game") {
        console.log("got reply for Game! ", dataFromServer);
        alert(dataFromServer.msg);
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
          type: "message",
          msg: value,
          user: userName,
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
