import { Color, PlayerNames, TdiceRoll } from "./Game";
import { anyMoveAvailable, setAllowedColumns, togglePlayer } from "./gameRules";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { Quadrant } from "./Points";
import { useEffect } from "react";
import Bar from "./Bar";

type BoardProps = {
  currentBoardState: Color[][];
  onMove: (boardState: Color[][]) => void;
  currentDiceRoll: TdiceRoll;
  currentPlayer: string;
  onPlayerChange: (player: string) => void;
  selectedColumn: number;
  onColumnSelect: (column: number) => void;
  onMessage: (message: string) => void;
  moveLeft: number;
  onMoveLeft: (allowed: number) => void;
  whiteBar: number;
  onWhiteBar: (counter: number) => void;
  blackBar: number;
  onBlackBar: (counter: number) => void;
  whiteOut: number;
  onWhiteOut: (counter: number) => void;
  blackOut: number;
  onBlackOut: (counter: number) => void;
  winner: string;
  onWinner: (winner: string) => void;
};
export function Board({
  currentBoardState,
  onMove,
  currentDiceRoll,
  currentPlayer,
  onPlayerChange,
  selectedColumn,
  onColumnSelect,
  onMessage,
  moveLeft,
  onMoveLeft,
  whiteBar,
  onWhiteBar,
  blackBar,
  onBlackBar,
  whiteOut,
  onWhiteOut,
  blackOut,
  onBlackOut,
  winner,
  onWinner,
}: BoardProps) {
  let allowedColumns: number[];
  let moveAllowed = anyMoveAvailable(
    currentBoardState,
    currentPlayer,
    currentDiceRoll,
    whiteBar,
    blackBar,
  );
  //******************to be checked for no move available */
  if (moveAllowed[0] === false && moveAllowed[1] === false) {
    // alert("No move available");
    //change player
    allowedColumns = []; //reset allowed columns
    // togglePlayer(currentPlayer, onPlayerChange, onMessage);
  } else {
    allowedColumns = setAllowedColumns(
      currentBoardState,
      currentDiceRoll,
      currentPlayer,
      selectedColumn
    );
  }
    function handelDragStart(e: DragStartEvent) {
      const parent: string = e.active.data.current?.parent ?? "";
      let allowedColumns: number[] = [];
      let allowedChecker: string;
      if (PlayerNames.white[0] == currentPlayer) {
        allowedChecker = "White";
      } else {
        allowedChecker = "Black";
      }

      let currentPoint = 0;

      if (parent == "Bar") {
        console.log("drag from bar");

        if (allowedChecker == "White") {
          currentPoint = -1;
        } else {
          currentPoint = 24;
        }
      } else {
        currentPoint = +parent.slice(parent.length - 2, parent.length) - 10;
      }
      onColumnSelect(currentPoint);
    }

    function handleDragEnd(e: DragEndEvent) {
      let newPlayer: string;
      if (!e.over) return;
      const target = e.over.id as string;
      if (typeof e.over.id !== "string") throw new Error("id is not string");
      if (typeof e.over.id !== "string") throw new Error("id is not string");
      const index = e.active.data.current?.index ?? 0;
      const parent = e.active.data.current?.parent ?? "";
      console.log("----handle-drag end----------");
      const newCol: number = +target.slice(6, 8) - 10;
      const newColColor = currentBoardState[newCol][0];
      let oldCol: number = 0;
      let oldColColor: Color = "White";

      //check if checker is from bar or not to determine old color
      if (parent == "Bar") {
        console.log("drag from bar");
        if (currentPlayer == PlayerNames.black[0]) {
          oldColColor = "Black";
        }
      } else {
        oldCol = parent.slice(6, 8) - 10;
        oldColColor = currentBoardState[oldCol][index];
      }

      //update states
      const newBoardState = currentBoardState;
      const newDiceRoll = currentDiceRoll;

      if (
        newCol + 10 != allowedColumns[0] &&
        newCol + 10 != allowedColumns[1]
      ) {
        console.log("This move is not not allowed");
      } else {
        //rule#3--if the move is a hit
        if (
          newBoardState[newCol].length == 1 && //if the target column has one checker it is a blot
          newBoardState[newCol][0] != oldColColor //if the checker is not the same color as the moving checker
        ) {
          if (newBoardState[newCol][0] == "White") {
            onWhiteBar(whiteBar + 1);
          } else {
            onBlackBar(blackBar + 1);
          }
          newBoardState[newCol].pop();
        }

        newBoardState[newCol].push(oldColColor);
        if (parent == "Bar") {
          if (currentPlayer == PlayerNames.black[0]) {
            onBlackBar(blackBar - 1);
          } else {
            onWhiteBar(whiteBar - 1);
          }
        } else {
          newBoardState[oldCol].pop();
        }

        onMove(newBoardState);
        //rull#2--if the move is a double
        if (currentDiceRoll[0] !== currentDiceRoll[1]) {
          if (newCol + 10 == allowedColumns[0]) {
            newDiceRoll[0] = 0;
          }
          if (newCol + 10 == allowedColumns[1]) {
            newDiceRoll[1] = 0;
          }
        }
        let newMoveLeft = moveLeft - 1;
        onMoveLeft(newMoveLeft);
        onMessage(currentPlayer + " you have " + newMoveLeft + " moves left");
        if (newMoveLeft == 0) {
          //change player
          togglePlayer(currentPlayer, onPlayerChange, onMessage);
        }
      }
      onColumnSelect(50); //reset the color of the allowed points
    }

//check if the move is allowed for the current player's checkers on the board
  return (
    <DndContext
      onDragStart={handelDragStart}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="board">
        <Quadrant
          boardState={currentBoardState}
          start={12}
          end={18}
          drction={"ltr"}
          allowedColumns={allowedColumns}
          currentPlayer={currentPlayer}
          moveAllowed={moveAllowed[0]}
        />
        <Quadrant
          boardState={currentBoardState}
          start={18}
          end={24}
          drction={"ltr"}
          allowedColumns={allowedColumns}
          currentPlayer={currentPlayer}
          moveAllowed={moveAllowed[0]}
          bar={blackBar}
        />
        <Quadrant
          boardState={currentBoardState}
          start={6}
          end={12}
          drction={"rtl"}
          allowedColumns={allowedColumns}
          currentPlayer={currentPlayer}
          moveAllowed={moveAllowed[0]}
        />
        <Quadrant
          boardState={currentBoardState}
          start={0}
          end={6}
          drction={"rtl"}
          allowedColumns={allowedColumns}
          currentPlayer={currentPlayer}
          moveAllowed={moveAllowed[0]}
          bar={whiteBar}
        />
      </div>
      <Bar
        whiteBar={whiteBar}
        blackBar={blackBar}
        currentPlayer={currentPlayer}
      />
    </DndContext>
  );

}

