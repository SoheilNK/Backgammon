import { Board } from "./Board";

export type Color = "White" | "Black";

function Game() {
  return (
    <div>
      <Board />
    </div>
  );
}

export default Game;

let data = [
  { column: 1, checkers: ["black", "black"] },
  { column: 7, checkers: ["white", "white"] },
  { column: 13, checkers: ["white"] },
  { column: 19, checkers: ["black"] },
];







