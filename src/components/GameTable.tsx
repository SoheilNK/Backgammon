import * as type from "../types";

interface GameTableProps {
  games: type.OnlineGame[];
  isLoggedIn: boolean;
  createGame: () => void;
  joinGame: (matchId: string, hostName: string, hostId: string) => void;
}

const GameTable: React.FC<GameTableProps> = ({
  games,
  isLoggedIn,
  createGame,
  joinGame,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <button
        onClick={createGame}
        disabled={!isLoggedIn}
        className="m-auto bg-blue-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
      >
        Create a New Game
      </button>

      <div id="gameList" className="flex flex-col gap-2">
        <h1 className=" text-center bg-slate-300">Game List</h1>
        <table className="table-auto">
          <thead className=" text-xs sm:text-base">
            <tr>
              <th className="text-center hidden sm:block">Match ID</th>
              <th>Host Name</th>
              <th>Guest Name</th>
              <th>Status</th>
              <th>Join Game</th>
            </tr>
          </thead>
          <tbody className=" text-xs sm:text-base">
            {games.map((game: Game) => (
              <tr key={game.matchId}>
                <td className="text-center hidden sm:block">{game.matchId}</td>
                <td className="text-center">{game.hostName}</td>
                <td className="text-center">{game.guestName}</td>
                <td className="text-center">{game.status}</td>
                <td className="text-center">
                  <button
                    className=" m--1 bg-blue-900 hover:bg-sky-700 disabled:bg-slate-300 text-white font-bold px-4 rounded"
                    onClick={() => joinGame(game.matchId, game.hostName)}
                    disabled={game.status == "Playing"}
                  >
                    Join Game
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameTable;
