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
    <div>
      <button onClick={createGame} disabled={!isLoggedIn}>
        Create a New Game
      </button>

      <div id="gameList" className="flex flex-col mr-auto">
        <h1 className=" text-center">Game List</h1>
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
