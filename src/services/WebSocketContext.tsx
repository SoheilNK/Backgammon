// WebSocketContext.tsx

import React, { createContext, useContext, useCallback } from "react";
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";
import { getWebSocketClient } from "../services/websocketService";

type WebSocketContextType = {
  webSocketClient: W3CWebSocket | null;
  sendWebSocketMessage: (message: string) => void;
  handleWebSocketMessage: (handler: (message: IMessageEvent) => void) => void;
};

//get online user from local storage
const onlineUser = localStorage.getItem("onlineUser");

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
}

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const webSocketClient = getWebSocketClient(); // Initialize WebSocket client here

  const sendWebSocketMessage = (message: string) => {
    if (webSocketClient) {
      webSocketClient.send(message);
    }
  };

  const handleWebSocketMessage = (
    handler: (message: IMessageEvent) => void
  ) => {
    if (webSocketClient) {
      webSocketClient.onmessage = handler;
    }
  };

  const contextValue: WebSocketContextType = {
    webSocketClient,
    sendWebSocketMessage,
    handleWebSocketMessage,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};
