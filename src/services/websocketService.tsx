// websocketService.ts

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { updateOnlineGame } from "./GameService";


let client: W3CWebSocket | null = null;

export const getWebSocketClient = () => {
    const WebSocketURL = `ws://localhost:8001`;
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