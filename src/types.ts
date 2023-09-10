
//online game user
export interface OnlineUser {
  userId: string;
  userName: string;
  status: string;
}

export interface WsMessage {
  type: string;
  msg: any;
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
