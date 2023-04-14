interface MessageProps {
    currentPlayer: string;
    moveLeft: number;
    winner: string;

}
export function Message({ currentPlayer, moveLeft, winner }: MessageProps) {
    let message = "";
    if (winner != "") {
            return (
              <div className="winner">
                <h1>GAME OVER!</h1>
                <h2>{winner} won the game!</h2>
                <button onClick={() => window.location.reload()}>
                  Play again
                </button>
              </div>
            );

    } else {
        if (moveLeft === 0) {
            message = currentPlayer + " roll the dice";
        } else {
            message = currentPlayer + " you have " + moveLeft + " moves left";
        }
        return (
            <div id="alert" className="dice">
                {message}
            </div>
        );
    }
}
    
