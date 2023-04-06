import classNames from "classnames";
import { PlayerNames } from "./Game";
import { useState, useEffect } from "react";

//define a players component
interface PlayersProps {
  currentPlayer: string;
  anyMoveAvailable: boolean;
}
export default function Players({
  currentPlayer,
  anyMoveAvailable,
}: PlayersProps): JSX.Element {
  //set the player names
  PlayerNames.white[0] = "Player 1";
  PlayerNames.black[0] = "Player 2";

  //extract the player names from the enum
  const player1 = PlayerNames.white[0];
  const player2 = PlayerNames.black[0];

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
    
  const player1Class = classNames("player", {
    'playerActive': isActive1,
  });
  const player2Class = classNames("player", {
    'playerActive': isActive2,
  });

  return (
    <div className="players">
      <div className={player1Class}>
        <div className="player-name     ">
          <span>{PlayerNames.white[0]}</span>
        </div>
        <div className="player-checkers ">
          <span>White Checkers</span>
        </div>
      </div>
      <div className="player">
        <span>Current Player is {currentPlayer}</span>
      </div>
      <div className={player2Class}>
        <div className="player-name">
          <span>{PlayerNames.black[0]}</span>
        </div>
        <div className="player-checkers">
          <span>Black Checkers</span>
        </div>
      </div>
    </div>
  );
}
