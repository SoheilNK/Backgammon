import { useState } from "react";
import GamePlay from "./GamePlay";
import { Footer } from "./footer";

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
    <div className=" bg-slate-100 h-screen" >
      {!started && <Intro onStart={handleStart} />}
      {started && <GamePlay player1={player1} player2={player2} />}
      {/* {winner && <Won winner={winner} />} */}
      <Footer />
    </div>
  );
};

export default App;


type IntroProps = {
  onStart: (player1: string, player2: string) => void;
};


const Intro = ({ onStart }: IntroProps) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleStart = () => {
    if (player1 && player2) {
      onStart(player1, player2);
    }
  };

  return (
      <div className="  relative rounded-xl overflow-auto p-8">
        <div className="py-8 px-8 max-w-sm mx-auto rounded-xl bg-white shadow-lg sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 sm:py-4">
          <div className="text-center sm:text-left space-y-2">
            <h1 className=" text-lg text-black font-semibold">
              Please enter player's names
            </h1>
            <div className="mb-6">
              <label
                htmlFor="player1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Player1 Name
              </label>
              <input
                type="text"
                id="player1"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="Player2"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Player2 Name
              </label>
              <input
                type="text"
                id="Player2"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <button
              className="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleStart}
            >
              Start the Game!
            </button>
          </div>
        </div>
      </div>
  );
};

