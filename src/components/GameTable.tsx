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
    <div className="flex flex-col gap-4">
      <button
        onClick={createGame}
        disabled={!isLoggedIn}
        className="w-1/4 bg-blue-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
      >
        Create a New Game
      </button>

      <div id="gameList" className="flex flex-col gap-2">
        <h1 className=" text-center bg-slate-300">Game List</h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Match ID</th>
              <th>Host Name</th>
              <th>Guest Name</th>
              <th>Status</th>
              <th>Join Game</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game: type.OnlineGame) => (
              <tr key={game.matchId}>
                <td>{game.matchId}</td>
                <td>{game.hostName}</td>
                <td>{game.guestName}</td>
                <td>{game.status}</td>
                <td>
                  <button onClick={() => joinGame(game.matchId, game.hostName, game.hostId)}>
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
