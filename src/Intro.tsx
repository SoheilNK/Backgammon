import { useNavigate } from "react-router-dom";
import Dice3Dv2 from "./Dice3Dv2";
import { useLocalStorage } from "./useLocalStorage";

export const Intro = () => {
  //read data from local storage
  const [player1, setPlayer1] = useLocalStorage("player1", "");
  const [player2, setPlayer2] = useLocalStorage("player2", "");
  const [started, setStarted] = useLocalStorage("started", "");

  const navigate = useNavigate();
  if (started === "yes") {
    return (
      <div className="z-10">
        <div
          style={{ backgroundColor: "#8E8268" }}
          className=" flex-col  m-auto text-lg px-8  max-w-md smx-auto rounded-xl shadow-lg sm:flex sm:items-center   sm:py-1 text-center "
        >
          <h1 className="p-2">
            <strong>ALERT!</strong>
          </h1>
          <h2 className=" m-auto h-1/2 bg-yellow-200 text-black rounded-md p-1">
            <strong>
              A game is already in progress. Would you like to continue playing
              or begin a new one?
            </strong>
          </h2>
          <h1></h1>
          <div></div>
          <div className="flex p-4 gap-4">
            <button
              onClick={() => navigate("/Game")}
              className="w-1/2 bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              Keep Playing
            </button>
            <button
              onClick={() => (
                navigate("/users"),
                window.location.reload(),
                localStorage.clear()
              )}
              className="w-1/2 bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              Start a New Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
      <div>
        <Dice3Dv2 roll1={3} roll2={4} rotate={true} />
        <h1 className=" text-xl text-black text-clip font-bold  m-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
          Welcome to SoSep Backgammon
        </h1>
      </div>
      <div className="py-8 px-8 max-w-sm mx-auto rounded-xl  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white bg-white border-2 shadow-lg sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 sm:py-4">
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
              placeholder="Player1"
              onChange={(e) => {
                setPlayer1(e.target.value);
              }}
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
              placeholder="Player2"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            disabled={!player1 || !player2}
            className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200"
            onClick={() => {
              var p1 = player1;
              var p2 = player2;
              localStorage.clear();

              localStorage.setItem("player1", JSON.stringify(p1));
              localStorage.setItem("player2", JSON.stringify(p2));

              localStorage.setItem("started", JSON.stringify("yes"));

              navigate("/Game");
            }}
          >
            Start the Game!
          </button>
        </div>
      </div>
    </div>
  );
};