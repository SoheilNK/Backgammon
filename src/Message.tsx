interface MessageProps {
    currentPlayer: string;
    moveLeft: number;

}
export function Message({ currentPlayer, moveLeft }: MessageProps) {
    let message = "";
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
    
