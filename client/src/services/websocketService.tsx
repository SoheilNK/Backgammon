// websocketService.ts

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { getUser } from "./user.service";
let client: W3CWebSocket | null = null;
const wsUrl = import.meta.env.VITE_WS_URL;

export const getWebSocketClient = () => {
  const user = getUser().username.toString();
  const WebSocketURL = `${wsUrl}?username=${user}`;
  if (!client || client.readyState === client.CLOSED) {
    client = new W3CWebSocket(WebSocketURL);
    console.log("New client created for: ", WebSocketURL);
    console.log("Client: ", client);
  } else {
    console.log("WebSocket Client already connected");
    console.log("ClientID: ", client);
  }
  return client;
};
