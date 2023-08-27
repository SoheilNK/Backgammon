interface Game {
  matchId: string;
  hostName: string;
  guestName: string;
  status: string;
}

interface GameTableProps {
  games: Game[];
  isLoggedIn: boolean;
  createGame: () => void;
  joinGame: (matchId: string, hostName: string) => void;
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
            {games.map((game: Game) => (
              <tr key={game.matchId}>
                <td className="text-center">{game.matchId}</td>
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
