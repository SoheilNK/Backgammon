import { Component, ChangeEvent } from "react";
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";
import { Card, Avatar, Input, Typography } from "antd";
import { getUser } from "../services/user.service";
import { getWebSocketClient } from "../services/websocketService";

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

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

class Chat extends Component<{}, ChatState> {
  user: string = getUser().username.toString();
  state: ChatState = {
    userName: this.user,
    isLoggedIn: true,
    messages: [],
    searchVal: "",
  };

  webSocketClient: W3CWebSocket | null = null;

  componentDidMount(): void {
    this.webSocketClient = getWebSocketClient();
    this.webSocketClient.onopen = (): void => {
      console.log("WebSocket Client Connected");
    };

    this.webSocketClient.onmessage = (message: IMessageEvent): void => {
      const dataFromServer: DataFromServer = JSON.parse(
        message.data.toString()
      );
      console.log("got reply! ", dataFromServer);
      if (dataFromServer.type === "message") {
        this.setState((prevState) => ({
          messages: [
            {
              msg: dataFromServer.msg,
              user: dataFromServer.user,
            },
            ...prevState.messages,
          ],
        }));
      }
    };
  }

  handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchVal: e.target.value });
  };

  handleSearchSubmit = (value: string): void => {
    this.onButtonClicked(value);
  };

  onButtonClicked = (value: string): void => {
    if (this.webSocketClient) {
      this.webSocketClient.send(
        JSON.stringify({
          type: "message",
          msg: value,
          user: this.state.userName,
        })
      );
      this.setState({ searchVal: "" });
    }
  };

  componentWillUnmount(): void {
    // Clean up WebSocket event listeners here (if needed)
    if (this.webSocketClient) {
      this.webSocketClient.onmessage = () => {};
      this.webSocketClient.onerror = () => {};
      // Close the WebSocket connection when the component unmounts (optional)
      this.webSocketClient.close();
    }
  }

  render() {
    return (
      <div className=" border p-4 rounded-md border-cyan-700" id="wrapper">
        {this.state.isLoggedIn ? (
          <div>
            <div className="title">
              <Text
                id="main-heading"
                type="secondary"
                style={{ fontSize: "36px" }}
              >
                Websocket Chat: {this.state.userName}
              </Text>
            </div>
            <div className="">
              <Search
                placeholder="input message and send"
                enterButton="Send"
                value={this.state.searchVal}
                size="large"
                onChange={this.handleSearchChange}
                onSearch={this.handleSearchSubmit}
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
              {this.state.messages.map((message) => (
                <Card
                  key={message.msg}
                  style={{
                    width: 300,
                    margin: "16px 4px 0 4px",
                    alignSelf:
                      this.state.userName === message.user
                        ? "flex-end"
                        : "flex-start",
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
}

export default Chat;