import classNames from "classnames";
import { PlayerNames } from "./GamePlay";
import { Checker } from "./Points";

//define a players component
interface PlayersProps {
  currentPlayer: string;
  anyMoveAvailable: boolean;
  scores: number[];
}
export default function Players({
  currentPlayer,
  anyMoveAvailable,
  scores,
}: PlayersProps): JSX.Element {
  //extract the player names from the PlayerNames object
  const player1 = PlayerNames.white[0];
  let player1Active = false;
  let player2Active = false;

  //change the background color of the player who is playing
  if (currentPlayer === player1 && anyMoveAvailable) {
    player1Active = true;
    player2Active = false;
  } else {
    player1Active = false;
    player2Active = true;
  }
  
    const player1Class = classNames("player1", {
      playerActive: player1Active,
      " w-100": player1Active
    });
  const player2Class = classNames("player1", {
    playerActive: player2Active,
  });

  return (
    <div className="players justify-centerr">
      <div
        className={
          player1Active ? "w-4/5 " : "" 
        }
      >
        <div className={player1Class + " float-right w-3/4"}>
          {/* <div className={" w-3/4 m-auto " + player1Class}> */}

          <div className="w-1/3 p-1">
            <Checker title={""} clr={"White"} parent={""} disabled={false} />
          </div>
          <div className="w-1/3 truncate">
            <span>
              <strong>{PlayerNames.white[0]}</strong>
            </span>
          </div>
          <div className="w-1/3 flex flex-col font-serif sm:text-xs leading-none m-auto">
            <span className=" underline underline-offset-auto">Score</span>
            <span className=" ">{scores[0]}</span>
          </div>
        </div>
      </div>
      <div className={player2Active ? "w-4/5 ": ""}>
        <div className={player2Class + " w-3/4 "}>
          <div className="w-1/3 p-1">
            <Checker title={""} clr={"Black"} parent={""} disabled={false} />
          </div>
          <div className="w-1/3 truncate ">
            <span>
              <strong>{PlayerNames.black[0]}</strong>
            </span>
          </div>
          <div className="w-1/3 flex flex-col font-serif sm:text-xs leading-none m-auto">
            <span className=" underline underline-offset-auto">Score</span>
            <span className=" ">{scores[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
