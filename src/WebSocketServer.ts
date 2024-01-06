import { IMessageEvent, w3cwebsocket } from "ws";
import * as types from "./types";
import { onlineGames } from "./controllers/GameController";

export class WebSocketServer {
  private clients: Map<string, w3cwebsocket>;
  private webSocketServer: any; // Type it properly to avoid any
  public onlineUsers: types.OnlineUser[] = [];

  constructor() {
    //read wsPort from .env file
    const wsPort = process.env.WS_PORT;
    this.clients = new Map<string, w3cwebsocket>();
    const webSocketServer = require("websocket").server;
    const http = require("http");

    const server = http.createServer();
    server.listen(wsPort);
    console.log(`WebSocketServer listening on wsPort ${wsPort}`);

    this.webSocketServer = new webSocketServer({
      httpServer: server,
    });

    this.webSocketServer.on("request", (request: any) => {
      let userID: string;
      let newOnlineUser: types.OnlineUser;
      const { origin } = request;
      //read username from the request
      const username = request.resourceURL.query.username;
      console.log(`Received a new connection from origin ${origin}.`);

      const connection = request.accept(null, request.origin);

      userID = request.key;

      newOnlineUser = {
        userId: userID,
        userName: username, //+++++++++check to receive it from the client
        status: "Online",
      };
      //check if the user is already online
      let userIndex = this.onlineUsers.findIndex(
        (user) => user.userName === username
      );
      //if the user is already online, remove it from the onlineUsers array and add the newOnlineUser
      if (userIndex !== -1) {
        this.onlineUsers.splice(userIndex, 1);
      }
      //add the new user to the onlineUsers array
      this.onlineUsers.push(newOnlineUser);
      //+++++++++++++++++++++++++++++++
      this.clients.set(userID, connection);
      console.log(`New user ${userID} connected.`);
      //send back userID to the client
      let msg: types.DataFromServer = {
        type: "onlineUser",
        data: JSON.stringify(newOnlineUser),
      };
      connection.sendUTF(JSON.stringify(msg));
      //update onlinemages
      //search in onlineGames array for the games that the user is involved in
      //and update userIDs with the new userID
      //and for each uodated game send a message to the opponent
      let gamesToBeUpdated = onlineGames.filter(
        (game) => game.hostName === username || game.guestName === username
      );
      if (gamesToBeUpdated.length !== 0) {
        gamesToBeUpdated.forEach((game) => {
          //update the game with the new userID
          if (game.hostName === username) {
            game.hostId = userID;
          } else {
            game.guestId = userID;
          }
          //send the updated game to the host
          this.sendMessage(
            game.hostId,
            JSON.stringify({
              type: "gameUpdate",
              data: game,
            })
          );
          //send the updated game to the guest
          this.sendMessage(
            game.guestId,
            JSON.stringify({
              type: "gameUpdate",
              data: game,
            })
          );
          // let opponentId = game.hostId === userID ? game.guestId : game.hostId;
          // const client = this.clients.get(opponentId);
          // if (client) {
          //   client.sendUTF(
          //     JSON.stringify({
          //       type: "gameUpdate",
          //       data: JSON.stringify(game),
          //     })
          //   );
          //   console.log(`Updated OnlineGmae Sent Message to ${opponentId}`);
          // }
        });
      }
      console.log(
        "WebSocket-connected for user id: " +
          userID +
          " in " +
          Array.from(this.clients.keys())
      );

      let thisGame: types.OnlineGame;
      connection.on("message", (message: IMessageEvent) => {
        if (message.type === "utf8") {
          try {
            // console.log("Received Message: ", message.utf8Data);
            let wsMessage = JSON.parse(message.utf8Data) as types.WsMessage;
            let msgFor = wsMessage.msgFor;
            //get the opponent's id from the onlineGames array
            thisGame = onlineGames.find(
              (game: any) => game.matchId === wsMessage.matchId
            );
            console.log(`thisGame: ${JSON.stringify(thisGame)}`);
            let opponentId =
              msgFor === "host" ? thisGame.hostId : thisGame.guestId;
            let senderId =
              msgFor === "guest" ? thisGame.hostId : thisGame.guestId;
            //send the message to the opponent
            const client = this.clients.get(opponentId);
            if (client) {
              client.sendUTF(
                JSON.stringify({ type: wsMessage.type, data: wsMessage })
              );
              console.log(`Sent Message to ${opponentId}`);
            }
            if (wsMessage.type === "chat") {
              //send the message to the sender
              console.log(`clients: ${JSON.stringify(this.clients)}`);
              const sender = this.clients.get(senderId);
              sender.sendUTF(
                JSON.stringify({ type: wsMessage.type, data: wsMessage })
              );
              console.log(`Sent Message to ${senderId}`);
            }
            // //send the message to the sender
            // connection.sendUTF(message.utf8Data);
            // console.log(`Sent Message to ${userID}`);

            // //send the message to all other users
            // this.clients.forEach((otherConnection, key) => {
            //     if (key !== userID) {
            //         otherConnection.sendUTF(message.utf8Data);
            //         console.log(`Sent Message to ${key}`);
            //     }
            // });
          } catch (error) {
            console.log(error);
          }
        }
      });

      connection.on("close", () => {
        this.clients.delete(userID);
        console.log(`User ${userID} disconnected.`);
      });
    });
  }

  public sendMessage(clientId: string, message: string) {
    if (clientId === "all") {
      this.clients.forEach((client) => {
        client.sendUTF(message);
      });
      return;
    }

    const client = this.clients.get(clientId);
    if (client) {
      client.sendUTF(message);
    }
  }
}
