import axios from "axios";
import { getUser } from "../services/user.service";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../services/useLocalStorage";
import { myApi } from "../services/user.service";
import GameTable from "../components/GameTable";
import { useNavigate } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { getWebSocketClient } from "../services/websocketService";
import * as type from "../types";

let chatWebSocketClient: W3CWebSocket | null = null;
const apiUrl = import.meta.env.VITE_API_URL;

//call the api to get the list of online games
export const getOnlineGames = async () => {
  console.log("getOnlineGames...");
  const { data } = await myApi.get(`${apiUrl}/games`);

  return data;
};

//update online game
export const updateOnlineGame = async (onlineGame: any, roll: string) => {
  console.log("updating game id :", onlineGame.matchId);
  try {
    const { data } = await myApi.post(
      `${apiUrl}/games/update`,
      { onlineGame: onlineGame, roll: roll }
    );
    console.log("Response:", data);
  } catch (error) {
    // Handle the error here
    console.error("Error:", error);
  }
};

// export const leaveOnlineGame = async (onlineGame: any, roll: string) => {
export const leaveOnlineGame = async () => {
  //get onlineGame from local storage
  const onlineGame = JSON.parse(localStorage.getItem("onlineGame")!);
  let roll = "";
  const userName = getUser().username.toString();
  if (onlineGame) {
    if (userName === onlineGame.hostName) {
      roll = "host";
    } else {
      roll = "guest";
    }
  }

  console.log("leaving game id :", onlineGame.matchId);
  try {
    const { data } = await myApi.post(`${apiUrl}/games/leave`, {
      onlineGame: onlineGame,
      roll: roll,
    });
    console.log("Response:", data);
  } catch (error) {
    // Handle the error here
    console.error("Error:", error);
  }
};

//create a component for online users to create a game room and join a game room
export function GameList() {
    const navigate = useNavigate();
  //get the list of online games
  const [games, setGames] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);

  //get onlineGame from local storage
  const onlineGame = JSON.parse(localStorage.getItem("onlineGame")!);

  const userName = getUser().username.toString();

  if (onlineGame) {
    const matchID = onlineGame.matchId;
    if (userName === onlineGame.hostName) {
      var msgFor = "guest";
    } else {
      var msgFor = "host";
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const getGames = async () => {
        const games = await getOnlineGames();
        setGames(games);
      };
      getGames();

      chatWebSocketClient = await getWebSocketClient();

      chatWebSocketClient.onopen = () => {
        console.log("chatWebSnewGamesocket Client Connected-from gamelist");
      };

      chatWebSocketClient.onmessage = (message) => {
        const dataFromServer: type.DataFromServer = JSON.parse(
          message.data.toString()
        );
        console.log("got reply! ", dataFromServer);

        //check for userID
        if (dataFromServer.type === "userID") {
          //add userID to onlineGame
          if (userName === onlineGame.hostName) {
            onlineGame.hostId = dataFromServer.data;
            //send onlineGame to server to update
            updateOnlineGame(onlineGame, "host");
          } else {
            onlineGame.guestId = dataFromServer.data;
            //send onlineGame to server to update
            updateOnlineGame(onlineGame, "guest");
          }

          localStorage.setItem("onlineGame", JSON.stringify(onlineGame));

          navigate(`/onlinegame`);
        }

        //check for onlineUser
        if (dataFromServer.type === "onlineUser") {
          console.log("got reply for onlineUser! ", dataFromServer);
          //add onlineUser to local storage
          const newOnlineUser = JSON.parse(
            dataFromServer.data as unknown as string
          );

          localStorage.setItem("onlineUser", JSON.stringify(newOnlineUser));
        }

        //add new game to the list
        if (dataFromServer.type === "newGameList") {
          console.log("got reply for a new game list! ", dataFromServer);
          //update the game list
          const newGames = dataFromServer.data as unknown as type.OnlineGame[];
          setGames(newGames as any);
        }
      };
    };
    fetchData();
  }, []);


  //add a game room
  const createGame = async () => {
    const { data } = await myApi.post(
      `${apiUrl}/games/add/`,
      {onlineUser: getOnlineUser()}
    );
    const onlineGame = data;
    //store onlineGame object in local storage
    localStorage.setItem("onlineGame", JSON.stringify(onlineGame));

    //goto the game room
    navigate(`/onlinegame`);
  };

  //join a game room
  const joinGame = async (matchId: string, hostName: string) => {
    console.log("joining game id :", matchId, " hosted by: ", hostName);
    const user = getUser();
    if (user.username === hostName) {
      alert("You cannot join your own game!");
      return;
    } else {
      try {
        const { data } = await myApi.post(
          `${apiUrl}/games/join`,
          { matchId: matchId, onlineUser: getOnlineUser() } // Set the matchId in the request body
        );
        console.log("Response:", data);
        const onlineGame = data;

        //store onlineGame object in local storage
        localStorage.setItem("onlineGame", JSON.stringify(onlineGame));

        console.log("Response:", onlineGame);
      } catch (error) {
        // Handle the error here
        console.error("Error:", error);
      }
      //goto the game room
      navigate(`/onlinegame?matchID=${matchId}`);
    }
  };

  return (
    <GameTable
      games={games}
      isLoggedIn={isLoggedIn}
      createGame={createGame}
      joinGame={joinGame}
    />
  );
}

export default GameList;
function getOnlineUser(): any {
  const onlineUser = JSON.parse(localStorage.getItem("onlineUser")!);
  return onlineUser;
}

