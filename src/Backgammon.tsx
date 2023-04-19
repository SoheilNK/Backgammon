import { useState } from "react";
import GamePlay from "./GamePlay";
import { Footer } from "./footer";
import { Intro } from "./Intro";

const App = () => {
  const [started, setStarted] = useState(false);
  const [winner, setWinner] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleStart = (player1: string, player2: string) => {
    // start the game and set the state
    setStarted(true);
    setPlayer1(player1);
    setPlayer2(player2);
  };

  const handleWin = (winner: string) => {
    // set the winner and show the Won component
    setWinner(winner);
  };

  return (
    <div className=" bg-slate-100 h-screen">
      {/* {!started && <Intro onStart={handleStart} />} */}
      {started && <GamePlay player1={player1} player2={player2} />}
      {/* {winner && <Won winner={winner} />} */}
      <Footer />
    </div>
  );
};

export default App;
