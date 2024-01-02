import { Color, PlayerNames, TdiceRoll } from "./GamePlay";
import { Checker } from "./Points";
import { useLocalStorage } from "../services/useLocalStorage";

//define a players component
interface PlayersProps {
  currentPlayer: string;
  anyMoveAvailable: boolean;
  scores: number[];
  currentBoardState: Color[][];
  currentDiceRoll: TdiceRoll;
  whiteBar: number;
  blackBar: number;
  moveLeft: number;
  whiteOut: number;
  blackOut: number;
  alertSeen: boolean;
  onAlertSeen: (seen: boolean) => void;
  onPlayerChange: (player: string) => void;
  onMoveLeft: (moves: number) => void;
  onRoll: (roll: TdiceRoll) => void;
}
export default function Players({
  currentPlayer,
  anyMoveAvailable,
  scores,
  currentBoardState,
  currentDiceRoll,
  whiteBar,
  blackBar,
  moveLeft,
  whiteOut,
  blackOut,
  alertSeen,
  onAlertSeen,
  onPlayerChange,
  onMoveLeft,
  onRoll,
}: PlayersProps): JSX.Element {
  // const [player1, setPlayer1] = useLocalStorage("player1", "");
  const [player2, setPlayer2] = useLocalStorage("player2", "");
  
  //extract the player names from the PlayerNames object
  let player1 = PlayerNames.white[0];
  let player1Active = false;
  let player2Active = false;

  //change the background color of the player who is playing
  if (currentPlayer === player1 && anyMoveAvailable) {
    player1Active = true; //true
    player2Active = false;
  } else {
    player1Active = false;
    player2Active = true; //true
  }

  return (
    <div id="players" className=" w-full flex m-auto ">
      <div className={"" + (player1Active ? "w-full " : "")}>
        <div className={"" + (player1Active ? "w-1/2 m-auto" : " ")}>
          <div
            id="player"
            className={
              player1Active
                ? "playerActive flex "
                : "player absolute w-1/6 top-1 left-0 p-1 "
            }
          >
            <div className={player1Active ? "w-1/4 p-1" : " h-1/3 "}>
              <Checker
                title={"player1"}
                clr={"White"}
                parent={""}
                disabled={false}
              />
            </div>
            <div
              className={
                " m-auto text-center truncate  " +
                (player1Active ? "w-1/2  m-auto" : "w-full")
              }
            >
              <span>
                <strong>{PlayerNames.white[0]}</strong>
              </span>
            </div>
            <div
              className={
                "flex flex-col font-serif sm:text-xs leading-none m-auto text-center " +
                (player1Active ? " w-1/4 " : " h-1/3 ")
              }
            >
              <span className=" underline underline-offset-auto">Score</span>
              <span className=" ">{scores[0]}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={"" + (player2Active ? "w-full " : "")}>
        <div className={"" + (player2Active ? "w-1/2 m-auto" : " ")}>
          <div
            id="player"
            className={
              player2Active
                ? "playerActive flex "
                : "player absolute  w-1/6 top-1 right-0 p-1 "
            }
          >
            <div className={player2Active ? "w-1/4 p-1" : " h-1/3 "}>
              <Checker
                title={"player2"}
                clr={"Black"}
                parent={""}
                disabled={false}
              />
            </div>
            <div
              className={
                " m-auto text-center truncate  " +
                (player2Active ? "w-1/2  m-auto" : "w-full")
              }
            >
              <div className=" w-full ">
                <strong>{PlayerNames.black[0]}</strong>
              </div>
            </div>
            <div
              className={
                "flex flex-col font-serif sm:text-xs leading-none m-auto text-center " +
                (player2Active ? " w-1/4 " : " h-1/3 ")
              }
            >
              <span className=" underline underline-offset-auto">Score</span>
              <span className=" ">{scores[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
