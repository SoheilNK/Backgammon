export interface WsMessage {
  type: string;
  msg: string;
  user: string;
  matchId: string;
  msgFor: string;
}

export interface DataFromServer {
  type: string;
  data: string;
}

export interface ChatState {
  userName: string;
  isLoggedIn: boolean;
  messages: WsMessage[];
  searchVal: string;
}

// Define an interface for the OnlineGame object
export interface OnlineGame {
  matchId: string;
  hostName: string;
  guestName: string;
  hostId: string;
  guestId: string;
  status: string;
}
