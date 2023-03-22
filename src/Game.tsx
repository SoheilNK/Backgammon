import { useState } from "react";
import { Board } from "./Board";
import Dice from "./Dice";

export type Color = "White" | "Black";
export type Direction = "rtl" | "ltr";
export type TdiceRoll = [1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6];

interface GameProps {
  currentDiceRoll: TdiceRoll;

}

function Game({ currentDiceRoll }: GameProps) {
  const [boardState, setBoardState] = useState();

  const [diceRoll, setDiceRoll] = useState(currentDiceRoll);
  console.log(diceRoll);
  return (
    <div>
      <Board boardState={setBoardState} />
      <Dice
        currentDiceRoll={diceRoll}
        callback={setDiceRoll}
        disabled={false}
      />
    </div>
  );
  
}


export default Game;

