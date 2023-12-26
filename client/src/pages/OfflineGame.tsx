import PageClass from "../components/PageClass";
import GamePlay, { Color } from "../components/GamePlay";
import { useLocalStorage } from "../services/useLocalStorage";
import { TdiceRoll } from "../components/GamePlay";

function OfflineGame() {
  //GamePlay state----------------
  const [remainingTime, setRemainingTime] = useLocalStorage("remainingTime", 0); // in milliseconds
  const [gameState, setGameState] = useLocalStorage("gameState", "new"); //use it to show Alert component
  const [started, setStarted] = useLocalStorage("started", "no");

  const [player1, setPlayer1] = useLocalStorage("player1", "");
  const [player2, setPlayer2] = useLocalStorage("player2", "");
  const [scores, setScores] = useLocalStorage("scores", [0, 0]);
  const [currentPlayer, setCurrentPlayer] = useLocalStorage(
    "currentPlayer",
    player1
  );
  const [currentDiceRoll, setDiceRoll] = useLocalStorage("currentDiceRoll", [
    0, 0,
  ] as TdiceRoll);
  const [currentBoardState, setCurrentBoardState] = useLocalStorage(
    "currentBoardState",
    initialState
  );
  const [moveLeft, setMoveLeft] = useLocalStorage("moveLeft", 0);
  const [selectedColumn, setSelectedColumn] = useLocalStorage(
    "selectedColumn",
    50
  );
  const [whiteBar, setWhiteBar] = useLocalStorage("whiteBar", 0);
  const [blackBar, setBlackBar] = useLocalStorage("blackBar", 0);
  const [whiteOut, setWhiteOut] = useLocalStorage("whiteOut", 0);
  const [blackOut, setBlackOut] = useLocalStorage("blackOut", 0);
  const [alertSeen, setAlertSeen] = useLocalStorage("alertSeen", false);

  const resetState = () => {
    setScores([0, 0]);
    setCurrentPlayer(player1);
    setDiceRoll([0, 0]);
    // setCurrentBoardState(winState); //winState
    setCurrentBoardState(initialState); //initialState
    setMoveLeft(0);
    setSelectedColumn(50);
    setWhiteBar(0);
    setBlackBar(0);
    setWhiteOut(0); //initialState
    setBlackOut(0); //initialState
    // setWhiteOut(12); //winState
    // setBlackOut(12); //winState
    setAlertSeen(false);
    setStarted("no");
  };

  return (
    <GamePlay
      remainingTime={remainingTime}
      setRemainingTime={setRemainingTime}
      gameState={"new"}
      setGameState={setGameState}
      started={started}
      setStarted={setStarted}
      player1={player1}
      setPlayer1={setPlayer1}
      player2={player2}
      setPlayer2={setPlayer2}
      scores={scores}
      setScores={setScores}
      currentPlayer={currentPlayer}
      setCurrentPlayer={setCurrentPlayer}
      currentDiceRoll={currentDiceRoll}
      setDiceRoll={setDiceRoll}
      currentBoardState={currentBoardState}
      setCurrentBoardState={setCurrentBoardState}
      moveLeft={moveLeft}
      setMoveLeft={setMoveLeft}
      selectedColumn={selectedColumn}
      setSelectedColumn={setSelectedColumn}
      whiteBar={whiteBar}
      setWhiteBar={setWhiteBar}
      blackBar={blackBar}
      setBlackBar={setBlackBar}
      whiteOut={whiteOut}
      setWhiteOut={setWhiteOut}
      blackOut={blackOut}
      setBlackOut={setBlackOut}
      alertSeen={alertSeen}
      setAlertSeen={setAlertSeen}
      onResetState={resetState}
    />
  );
}

export default OfflineGame;

const initialState: Color[][] = [
  ["White", "White"],
  [],
  [],
  [],
  [],
  ["Black", "Black", "Black", "Black", "Black"],
  [],
  ["Black", "Black", "Black"],
  [],
  [],
  [],
  ["White", "White", "White", "White", "White"],
  ["Black", "Black", "Black", "Black", "Black"],
  [],
  [],
  [],
  ["White", "White", "White"],
  [],
  ["White", "White", "White", "White", "White"],
  [],
  [],
  [],
  [],
  ["Black", "Black"],
];
