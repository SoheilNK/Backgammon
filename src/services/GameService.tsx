import axios from "axios";
import { getAccessToken, getUser } from "../services/user.service";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../services/useLocalStorage";
import { myApi } from "../services/user.service";
import GameTable from "../components/GameTable";
import { useNavigate } from "react-router-dom";
import * as type from "../types";

//call the api to get the list of online games
export const getOnlineGames = async () => {
  console.log("getOnlineGames...");
  const { data } = await myApi.get("http://localhost:8000/api/games");

  return data;
};

  //update the game room
  export const updateOnlineGame = async (onlineGame: type.OnlineGame) => {
    console.log("updating game id :", onlineGame.matchId);
    try {
      const { data } = await myApi.post(
        "http://localhost:8000/api/games/update",
        { onlineGame: onlineGame }
      );
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
  useEffect(() => {
    const getGames = async () => {
      const games = await getOnlineGames();
      setGames(games);
    };
    getGames();
  }, []);

  //add a game room
  const createGame = async () => {
    const { data } = await myApi.post(
      "http://localhost:8000/api/games/add/",
      {}
    );
    const onlineGame = data;
    //store onlineGame objrct in local storage
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
          "http://localhost:8000/api/games/join",
          { matchId: matchId } // Set the matchId in the request body
        );
        console.log("Response:", data);
        const onlineGame = data

        //store onlineGame objrct in local storage
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
    <div>
      <GameTable
        games={games}
        isLoggedIn={isLoggedIn}
        createGame={createGame}
        joinGame={joinGame}
      />
    </div>
  );
}

export default GameList;
