// // websocketService.ts

import { w3cwebsocket as W3CWebSocket } from "websocket";

const WebSocketURL = "ws://localhost:";
let client: W3CWebSocket | null = null;

export const getWebSocketClient = (port: number) => {
    if (!client || client.readyState === client.CLOSED) {
        client = new W3CWebSocket(WebSocketURL + port);
        console.log("new client created on port: " + port);
    }
    return client;
};