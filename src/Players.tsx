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

  //change the background color of the player who is playing

  const player1Class = classNames("player1", {
    playerActive: currentPlayer === player1 && anyMoveAvailable,
  });
  const player2Class = classNames("player1", {
    playerActive: currentPlayer !== player1 && anyMoveAvailable,
  });

  return (
    <div className="players justify-center ">
      <div className={player1Class + " bg-purple-300 text-gray-800"}>
        <Checker title={""} clr={"White"} parent={""} disabled={false} />
        <div>
          <span>{PlayerNames.white[0]}</span>
        </div>
        <div className="flex flex-col font-serif sm:text-xs leading-none m-auto">
          <span className=" underline underline-offset-auto">Score</span>
          <span className=" ">{scores[0]}</span>
        </div>
      </div>
      <div className=" card font-serif p-4">
        <span>
          <strong>
            SoSep
            <br />
            Backgammon
          </strong>
        </span>
      </div>
      <div className={player2Class}>
        <Checker title={""} clr={"Black"} parent={""} disabled={false} />
        <div className="">
          <span>{PlayerNames.black[0]}</span>
        </div>
        <div className="flex flex-col font-serif sm:text-xs leading-none m-auto">
          <span className=" underline underline-offset-auto">Score</span>
          <span className=" ">{scores[1]}</span>
        </div>
      </div>
    </div>
  );
}
