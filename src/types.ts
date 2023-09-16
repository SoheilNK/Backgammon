
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
  msgFor: "host" | "guest" | "all";
};

export type ChatState = {
  userName: string;
  isLoggedIn: boolean;
  messages: WsData[];
  searchVal: string;
};

// Define an type for the OnlineGame object
export type OnlineGame = {
  matchId: string;
  hostName: string;
  guestName: string;
  hostId: string;
  guestId: string;
  status: string;
};
