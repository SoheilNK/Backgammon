import axios from "axios";
import { getAccessToken } from "../services/user.service";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../services/useLocalStorage";
import { myApi } from "../services/user.service";
import GameTable from "./GameTable";
import { useNavigate } from "react-router-dom";

//call the api to get the list of online games
export const getOnlineGames = async () => {
  console.log("getOnlineGames...");
  const { data } = await myApi.get("http://localhost:8000/api/games");

  return data;
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
    console.log("Created Game data", data);
    let matchId = data.matchId;
    // window.location.reload();
    //goto the game room
    navigate(`/onlinegame?matchID=${matchId}`);
  };

  //join a game room
  const joinGame = async (gameId: string) => {
    const { data } = await myApi.post(
      `http://localhost:8000/api/games/join?gameId=${gameId}`,
      {}
    );
    console.log(data);
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
