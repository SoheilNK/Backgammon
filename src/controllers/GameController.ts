import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { NextFunction, Request, Response } from "express";
import * as interfaces from "../types";
import { webSocketServerInstance } from "../index";

// Define an array to store all online games
export const onlineGames: interfaces.OnlineGame[] = [];
export class GameController {
  private userRepository = AppDataSource.getRepository(User);

  // Add a method to add a new online game
  async addOnlineGame(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log("adding online game...");
    let result = response.locals.result;
    // console.log("result from addOnlineGame: " + JSON.stringify(result));
    // read onlineUser from request body
    const onlineUser = request.body.onlineUser;
    //check if onlineUser is null
    if (!onlineUser) {
      throw new Error(`Cannot find online user`);
    }
    const username = onlineUser.userName;
    const userId = onlineUser.userId;

    // console.log("result from addOnlineGame: " + username);
    let matchId = Date.now().toString();

    // Create a new onlineGame object
    const newOnlineGame: interfaces.OnlineGame = {
      matchId: matchId,
      hostName: username,
      hostId: userId,
      guestName: "",
      guestId: "",
      status: "Waiting for guest",
      state: '',
    };

    onlineGames.push(newOnlineGame);
    console.log(
      `You have successfully added online game "${newOnlineGame.matchId}" to database`
    );
    //send new onlineGames list via wsServer to all users
    console.log(`sending new onlineGames list via wsServer to all users`);
    webSocketServerInstance.sendMessage(
      "all",
      JSON.stringify({ type: "newGameList", data: onlineGames })
    );
    // Return the newly added online game
    return newOnlineGame;
  }

  // Add a method to get all online games
  async getOnlineGames(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return onlineGames;
  }

  // Join an online game
  async joinOnlineGame(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log("joining online game: " + JSON.stringify(request.body.matchId));
    let result = response.locals.result;
    // console.log("result from joinOnlineGame: " + JSON.stringify(result));
    const onlineUser = request.body.onlineUser;
    const username = onlineUser.userName;
    const userId = onlineUser.userId;
    console.log("userName from joinOnlineGame: " + username);
    const matchId = request.body.matchId;
    // console.log("matchId from joinOnlineGame: " + matchId);
    const guestName = username;
    const status = "Playing";

    // Find the online game with the specified matchId
    const onlineGame = onlineGames.find(
      (onlineGame) => onlineGame.matchId === matchId
    );
    if (!onlineGame) {
      throw new Error(`Cannot find online game with matchId: ${matchId}`);
    }

    // Update the online game
    onlineGame.guestName = guestName;
    onlineGame.guestId = userId;
    onlineGame.status = status;

    //Update onlineGames array
    const index = onlineGames.findIndex(
      (game) => game.matchId === matchId
    );
    onlineGames[index] = onlineGame;
    //send new onlineGames list via wsServer to all users
    console.log(`sending new onlineGames list via wsServer to all users`);
    webSocketServerInstance.sendMessage(
      "all",
      JSON.stringify({ type: "newGameList", data: onlineGames })
    );

    //send updated onlineGame via wsServer to host
    webSocketServerInstance.sendMessage(
      onlineGame.hostId,
      JSON.stringify({ type: "gameJoined", data: onlineGame })
    );

    // Return the updated online game
    return onlineGame;
  }

  // Add a method to update an online game
  async updateOnlineGame(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log("update online game");
    //read onlineGame from request body
    let newOnlineGame = request.body.onlineGame;
    //read roll from request body
    let roll = request.body.roll;

    //Update onlineGames array
    // Find the online game with the specified matchId
    console.log(`onlineGames: ${JSON.stringify(onlineGames)}`);
    const index = onlineGames.findIndex(
      (onlineGame) => onlineGame.matchId === newOnlineGame.matchId
    );
    let oldOnlineGame = onlineGames[index];

    if (index === -1) {
      console.log(
        `Cannot find online game with matchId: ${newOnlineGame.matchId}`
      );
      //add new online game to onlineGames array
      onlineGames.push(newOnlineGame);
      oldOnlineGame = newOnlineGame;
    }
    let oldGuestId = oldOnlineGame.guestId || "";
    console.log(`oldOnlineGame: ${JSON.stringify(oldOnlineGame)}`);
    if (oldOnlineGame.matchId === "") {
      console.log(
        `Cannot find online game with matchId: ${newOnlineGame.matchId}`
      );
    } else {
      // Update the online game
      if (roll === "host") {
        oldOnlineGame.hostId = newOnlineGame.hostId;
        oldOnlineGame.hostName = newOnlineGame.hostName;
      } else if (roll === "guest") {
        oldOnlineGame.guestId = newOnlineGame.guestId;
        oldOnlineGame.guestName = newOnlineGame.guestName;
      }
      onlineGames[index] = oldOnlineGame;
      console.log(`new oldOnlineGame: ${JSON.stringify(oldOnlineGame)}`);

      //send updated onlineGame via wsServer to host and guest
      webSocketServerInstance.sendMessage(
        oldOnlineGame.guestId,
        JSON.stringify({
          type: "gameUpdate",
          data: oldOnlineGame,
        })
      );
      webSocketServerInstance.sendMessage(
        oldOnlineGame.hostId,
        JSON.stringify({
          type: "gameUpdate",
          data: oldOnlineGame,
        })
      );
    }

    //send onlineGame via wsServer to host
    if (oldGuestId === "") {
      let hostId = oldOnlineGame.hostId;
      let guestId = oldOnlineGame.guestId;
      if (guestId) {
        webSocketServerInstance.sendMessage(
          hostId,
          JSON.stringify({ type: "gameJoined", data: newOnlineGame })
        );
      }
    }
  }

  // Add a method to leave an online game
  async leaveOnlineGame(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log("leaving online game");
    //read onlineGame from request body
    let newOnlineGame = request.body.onlineGame;
    //read roll from request body
    let roll = request.body.roll;

    //Update onlineGames array
    // Find the online game with the specified matchId
    console.log(`onlineGames: ${JSON.stringify(onlineGames.map(onlineGame => onlineGame.matchId))}`);
    const index = onlineGames.findIndex(
      (onlineGame) => onlineGame.matchId === newOnlineGame.matchId
    );
    let oldOnlineGame = onlineGames[index];

    if (index === -1) {
      console.log(
        `Cannot find online game with matchId: ${newOnlineGame.matchId}`
      );
    } else {
      // Update the online game after leaving
      if (roll === "host" && oldOnlineGame.guestId === "") {
        //host is leaving and there is no guest
        console.log(`host is leaving and there is no guest`);
        //remove the onlineGame from the onlineGames array
        onlineGames.splice(index, 1);
        console.log(`Removed ${newOnlineGame.matchId} from onlineGames array`);
        webSocketServerInstance.sendMessage(
          "all",
          JSON.stringify({ type: "newGameList", data: onlineGames })
        );
      } else {
        if (roll === "host" && oldOnlineGame.guestId !== "") {
          //host is leaving and there is a guest
          console.log(`host is leaving and there is a guest`);
          //remove the hostId from the online game and make the guest the host
          oldOnlineGame.hostId = oldOnlineGame.guestId;
          oldOnlineGame.hostName = oldOnlineGame.guestName;
          oldOnlineGame.guestId = "";
          oldOnlineGame.guestName = "";
          oldOnlineGame.status = "Waiting for guest";
          webSocketServerInstance.sendMessage(
            oldOnlineGame.hostId,
            JSON.stringify({
              type: "hostLeft",
              data: oldOnlineGame,
            })
          );
          //Update onlineGames array
          onlineGames[index] = oldOnlineGame;
          console.log(`new oldOnlineGame: ${JSON.stringify(oldOnlineGame)}`);
          //send new onlineGames list via wsServer to all users
          console.log(`sending new onlineGames list via wsServer to all users`);
          webSocketServerInstance.sendMessage(
            "all",
            JSON.stringify({ type: "newGameList", data: onlineGames })
          );
        } else if (roll === "guest") {
          //guest is leaving
          console.log(`guest is leaving`);
          //remove the guestId from the online game
          oldOnlineGame.guestId = "";
          oldOnlineGame.guestName = "";
          oldOnlineGame.status = "Waiting for guest";
          webSocketServerInstance.sendMessage(
            oldOnlineGame.hostId,
            JSON.stringify({
              type: "guestLeft",
              data: oldOnlineGame,
            })
          );
          //Update onlineGames array
          onlineGames[index] = oldOnlineGame;
          console.log(`new oldOnlineGame: ${JSON.stringify(oldOnlineGame)}`);
          //send new onlineGames list via wsServer to all users
          console.log(`sending new onlineGames list via wsServer to all users`);
          webSocketServerInstance.sendMessage(
            "all",
            JSON.stringify({ type: "newGameList", data: onlineGames })
          );
        }
      }
    }
  }
}
