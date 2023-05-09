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
                : "player absolute h-fit w-1/6 top-2 left-0 p-1 "
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
              <span className=" ">{scores[1]}</span>
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
                : "player absolute h-fit w-1/6 top-2 right-0 p-1 "
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

{
  /* <div className={player2Active ? "w-4/5 " : ""}>
          <div className={" w-3/4 "}>
            <div className="w-1/3 p-1">
              <Checker
                title={"player1"}
                clr={"Black"}
                parent={""}
                disabled={false}
              />
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
          </div> */
}
//         </div>
//   );
// }
