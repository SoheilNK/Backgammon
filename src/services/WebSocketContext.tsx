import { createContext, useContext, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";

const WebSocketContext = createContext<W3CWebSocket | null>(null);

export function useWebSocket() {
  return useContext(WebSocketContext);
}

// Utility function for sending messages
export function useWebSocketSendMessage(message: string) {
  const webSocketClient = useWebSocket();

  if (webSocketClient) {
    webSocketClient.send(message);
  }
}

// Utility function for handling incoming messages and sending messages
export function useWebSocketMessageHandler(
  onMessage: (message: IMessageEvent) => void
) {
  const webSocketClient = useWebSocket();

  useEffect(() => {
    if (webSocketClient) {
      const handleMessage = (message: IMessageEvent) => {
        onMessage(message);
      };

      webSocketClient.onmessage = handleMessage;

      return () => {
        webSocketClient.onmessage = () => {};
      };
    }
  }, [webSocketClient, onMessage]);
}


let webSocketClient: W3CWebSocket | null = null;
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
//   const webSocketClient = getWebSocketClient(); // Initialize WebSocket client here
    
    const WebSocketURL = `ws://localhost:8001`;
  if (
    !webSocketClient ||
    webSocketClient.readyState === webSocketClient.CLOSED
  ) {
    webSocketClient = new W3CWebSocket(WebSocketURL);
    console.log("New client created for: ", WebSocketURL);
  }

  return (
    <WebSocketContext.Provider value={webSocketClient}>
      {children}
    </WebSocketContext.Provider>
  );
};
