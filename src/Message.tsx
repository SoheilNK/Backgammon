import classNames from "classnames";
import { useEffect, useState } from "react";

interface MessageProps {
  currentPlayer: string;
  moveLeft: number;
  winner: string;
}
export function Message({ currentPlayer, moveLeft, winner }: MessageProps) {
  const [showFlash, setShowFlash] = useState(false);

  let message = "";
  if (winner != "") {
    return (
      <div className="winner">
        <h1>GAME OVER!</h1>
        <h2>{winner} won the game!</h2>
        <button onClick={() => window.location.reload()}>Play again</button>
      </div>
    );
  } else {
    if (moveLeft === 0) {
      message = currentPlayer + " roll the dice";
    } else {
      message = currentPlayer + " you have " + moveLeft + " moves left";
      }
    

      useEffect(() => {
          
          setShowFlash(true);
          // remove the flash after 0.5 seconds
          setTimeout(() => {
              setShowFlash(false);
          }, 500);
      }, [message])

      return (
        <div className=" container flex">
          <div
            id="alert"
            className={classNames(
              "py-1 px-8 max-w-sm mx-auto rounded-xl bg-white shadow-lg sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 sm:py-1 text-center ",
              {
                "opacity-100": !showFlash,
                "opacity-0": showFlash,
                " animate-pulse": showFlash,
              }
            )}
          >
            <div id="alert">{message}</div>
          </div>
        </div>
      );
  }
}
