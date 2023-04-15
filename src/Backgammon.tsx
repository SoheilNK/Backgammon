import { useState } from "react";
import GamePlay from "./GamePlay";

const App = () => {
  const [started, setStarted] = useState(false);
  const [winner, setWinner] = useState("");

  const handleStart = (player1: string, player2: string) => {
    // start the game and set the state
    setStarted(true);
  };

  const handleWin = (winner: string) => {
    // set the winner and show the Won component
    setWinner(winner);
  };

  return (
    <div>
      {!started && <Intro onStart={handleStart} />}
      {started && <GamePlay />} 
      {winner && <Won winner={winner} />}
    </div>
  );
};

export default App;
type GameProps = {
  onStart: (player1: string, player2: string) => void;
};

type WonProps = {
  winner: string;
};

const Intro = ({ onStart }: GameProps) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleStart = () => {
    if (player1 && player2) {
      onStart(player1, player2);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Welcome to Backgammon</h1>
      <div>
        <label htmlFor="player1">Player 1:</label>
        <input
          type="text"
          id="player1"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="player2">Player 2:</label>
        <input
          type="text"
          id="player2"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
      </div>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

const Won = ({ winner }: WonProps) => {
  return (
    <div>
      <h1>The game is won</h1>
      <p>{`${winner} is the winner!`}</p>
    </div>
  );
};

