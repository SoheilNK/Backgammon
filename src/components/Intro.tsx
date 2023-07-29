import Dice3Dv2 from "./Dice3Dv2";
import { useLocalStorage } from "../services/useLocalStorage";
import redirectToLogin from "../components/Register";
import { useNavigate } from "react-router-dom";
import Register from "../components/Register";
import Signin from "../pages/Signin";
import { Button } from "antd";
import { clearGameData } from "../services/user.service";

export const Intro = () => {
  //read data from local storage
  const [player1, setPlayer1] = useLocalStorage("player1", "");
  const [player2, setPlayer2] = useLocalStorage("player2", "");
  const [started, setStarted] = useLocalStorage("started", "");
  const [online, setOnline] = useLocalStorage("online", false);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  // let isLoggedIn: boolean = JSON.parse(localStorage.getItem("isLoggedIn")!) || false;
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
              className="w-1/2 bg-blue-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              Keep Playing
            </button>
            <button
              onClick={() => (
                navigate("/users"), window.location.reload(), clearGameData()
              )}
              className="w-1/2 bg-blue-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              Start a New Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
      <div id="welcome">
        <Dice3Dv2 roll1={3} roll2={4} rotate={true} />
        <h1 className=" text-xl text-black text-clip font-bold  m-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
          Welcome to SoSep Backgammon
        </h1>
      </div>
      <div
        id="how2play"
        className="py-8 px-8 w-full mx-auto rounded-xl  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white bg-white border-2 shadow-lg flex flex-col sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 sm:py-4"
      >
        <div className="text-center m-auto space-y-4 ">
          <h1 className=" text-lg text-black font-semibold">
            Please choose how you would like to play
          </h1>
          <div id="onlineORoffline" className="flex gap-0 w-full">
            <button
              className={`text-white font-bold ml-auto py-2 px-4 rounded-s-md ${
                online ? "bg-green-900" : "bg-slate-300  hover:bg-green-700"
              }`}
              onClick={() => {
                setOnline(!online);
              }}
            >
              On Line
            </button>
            <button
              className={`text-white font-bold mr-auto py-2 px-4  rounded-e-md ${
                !online ? "bg-green-900" : "bg-slate-300  hover:bg-green-700"
              }`}
              onClick={() => {
                setOnline(!online);
              }}
            >
              Off Line
            </button>
          </div>

          {!online ? (
            <div
              id="offline"
              className="p8 max-w-sm mx-auto rounded-xl  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white bg-white sm:flex space-y-2 sm:space-y-0 sm:space-x-6 sm:py-4"
            >
              <div className="text-left m-auto space-y-2">
                <h1 className=" text-lg text-black font-semibold">
                  Please enter player's names
                </h1>
                <div className="mb-6">
                  <label
                    htmlFor="player1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Player1 (White)
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
                    Player2 (Brown)
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
              </div>
            </div>
          ) : (
            <div
              id="online"
              className="py-8 px-8 w-full max--w-sm mx-auto rounded-xl  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white bg-white sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 sm:py-4"
            >
              <div className="text-center m-auto sm:text-left space-y-2">
                {!isLoggedIn ? (
                  <button
                    id="signin"
                    className="bg-blue-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200"
                    onClick={Signin}
                  >
                    Log in Please
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          )}
          <button
            id="startGame"
            disabled={
              (!online && (!player1 || !player2)) || (online && !isLoggedIn)
            }
            className="bg-blue-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200"
            onClick={() => {
              clearGameData();
              var p1 = player1;
              var p2 = player2;

              localStorage.setItem("player1", JSON.stringify(p1));
              localStorage.setItem("player2", JSON.stringify(p2));

              // localStorage.setItem("started", JSON.stringify("yes"));

              navigate("/game");
            }}
          >
            Start the Game!
          </button>
        </div>
      </div>
    </div>
  );
};
