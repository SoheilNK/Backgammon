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

  //extract the player names from the PlayerNames object
  const player1 = PlayerNames.white[0];

  //change the background color of the player who is playing
    
  const player1Class = classNames("player1", {
    'playerActive': currentPlayer === player1 && anyMoveAvailable,
  });
  const player2Class = classNames("player1", {
    'playerActive': currentPlayer !== player1 && anyMoveAvailable,
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
