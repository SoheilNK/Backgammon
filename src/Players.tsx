import classNames from "classnames";
import { PlayerNames } from "./Game";
import { useState, useEffect } from "react";
import { Checker } from "./Points";

//define a players component
interface PlayersProps {
  currentPlayer: string;
  anyMoveAvailable: boolean;
}
export default function Players({
    currentPlayer,
  anyMoveAvailable,
}: PlayersProps): JSX.Element {

  //extract the player names from the enum
  const player1 = PlayerNames.white[0];

  //change the background color of the player who is playing
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    useEffect(() => {
        if (currentPlayer === player1) {
            setIsActive1(true);
            setIsActive2(false);
        } else {
            setIsActive1(false);
            setIsActive2(true);
        }
    }, [currentPlayer]);
    
  const player1Class = classNames("player1", {
    'playerActive': isActive1,
  });
  const player2Class = classNames("player1", {
    'playerActive': isActive2,
  });

  return (
    <div className="players">
      <div className={player1Class}>
        <Checker title={""} clr={"White"} parent={""} disabled={false} />
        <div>
          <span>{PlayerNames.white[0]}</span>
        </div>
      </div>
      <div className="card">
        <span>
          <strong>Backgammon</strong>
        </span>
      </div>
      <div className={player2Class}>
        <Checker title={""} clr={"Black"} parent={""} disabled={false} />

        <div className="player-name">
          <span>{PlayerNames.black[0]}</span>
        </div>
      </div>
    </div>
  );
}
