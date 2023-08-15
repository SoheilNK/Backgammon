//online game user
export type OnlineUser = {
  userId: string;
  userName: string;
  status: string;
};

//online users array
export type OnlineUsers = {
  users: OnlineUser[];
};

export type WsData = {
  type: "chat" | "game" | "userID" | "gameJoined";
  msg: string;
  user: string; //sender username
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
