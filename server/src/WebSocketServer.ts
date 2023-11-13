import { IMessageEvent, w3cwebsocket } from "ws";
import * as types from "./types";
import { onlineGames } from "./controllers/GameController";
// import { json } from "body-parser";

// const getUniqueID = () => {
//   var s4 = () =>
//     Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   return s4() + s4() + "-" + s4();
// };

export class WebSocketServer {
  private clients: Map<string, w3cwebsocket>;
  private webSocketServer: any; // Type it properly to avoid any
  public onlineUsers: types.OnlineUser[] = [];

  constructor(port: number) {
    this.clients = new Map<string, w3cwebsocket>();
    const webSocketServer = require("websocket").server;
    const http = require("http");

    const server = http.createServer();
    server.listen(port);
    console.log(`WebSocketServer listening on port ${port}`);

    this.webSocketServer = new webSocketServer({
      httpServer: server,
    });

    this.webSocketServer.on("request", (request: any) => {
      let userID: string;
      let onlineUser: types.OnlineUser;
      const { origin } = request;
      //read username from the request
      const username = request.resourceURL.query.username;
      console.log(`Received a new connection from origin ${origin}.`);

      const connection = request.accept(null, request.origin);

      if (request.key && this.clients.has(request.key)) {
        userID = request.key;
        console.log(`User ${userID} reconnected.`);
      } else {
        userID = request.key;
        // userID = getUniqueID();
        //+++++++++++++++++++++++++++++++
        onlineUser = {
          userId: userID,
          userName: username, //+++++++++check to receive it from the client
          status: "Online",
        };
        //add the new user to the onlineUsers array
        this.onlineUsers.push(onlineUser);
        //+++++++++++++++++++++++++++++++
        this.clients.set(userID, connection);
        console.log(`New user ${userID} connected.`);
        //send back userID to the client
        let msg: types.DataFromServer = {
          type: "onlineUser",
          data: JSON.stringify(onlineUser),
        };
        connection.sendUTF(JSON.stringify(msg));
        //update onlinemages
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
            console.log("Received Message: ", message.utf8Data);
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
        //if the host left remove the matchId from the onlineGames array
        if (thisGame && thisGame.hostId === userID) {
          onlineGames.splice(onlineGames.indexOf(thisGame), 1);
          console.log(`Removed ${thisGame.matchId} from onlineGames array`);
          this.sendMessage(
            "all",
            JSON.stringify({ 
              type: "newGameList",
              data: onlineGames
            })
          );
        }
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
