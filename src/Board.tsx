import { Color, PlayerNames, TdiceRoll } from "./Game";

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
  let anyMoveLeft = anyMoveAvailable(
    currentBoardState,
    currentPlayer,
    currentDiceRoll
  );

 

  // console.log("anyMoveAvailable >>> " + newMoveAllowed);

  let allowedColumns = setAllowedColumns(
    currentBoardState,
    currentDiceRoll,
    currentPlayer,
    selectedColumn
  );
  // console.log("setAllowedColumns >>> allowed columns for current state>>>" + allowedColumns);

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
          moveLeft={anyMoveLeft}
        />
        <Quadrant
          boardState={currentBoardState}
          start={18}
          end={24}
          drction={"ltr"}
          allowedColumns={allowedColumns}
          currentPlayer={currentPlayer}
          moveLeft={anyMoveLeft}
          bar={blackBar}
        />
        <Quadrant
          boardState={currentBoardState}
          start={6}
          end={12}
          drction={"rtl"}
          allowedColumns={allowedColumns}
          currentPlayer={currentPlayer}
          moveLeft={anyMoveLeft}
        />
        <Quadrant
          boardState={currentBoardState}
          start={0}
          end={6}
          drction={"rtl"}
          allowedColumns={allowedColumns}
          currentPlayer={currentPlayer}
          moveLeft={anyMoveLeft}
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
  //define a function to return a boolean value if any move is available or not
  function anyMoveAvailable(
    currentBoardState: Color[][],
    currentPlayer: string,
    currentDiceRoll: TdiceRoll
  ) {
    let allowedChecker: string;
    let blockedChecker: string;
    let direction: number = +1 || -1;
    let move1: number = 0;
    let move2: number = 0;
    let barCounter: number = 0;

    if (PlayerNames.white[0] == currentPlayer) {
      allowedChecker = "White";
      blockedChecker = "Black";
      direction = +1;
      barCounter = whiteBar;
    } else {
      allowedChecker = "Black";
      blockedChecker = "White";
      direction = -1;
      barCounter = blackBar;
    }

    let moveAvailable = 0;
    if (
      (currentDiceRoll[0] == 0 && currentDiceRoll[1] == 0) ||
      barCounter !== 0
    ) {
      moveAvailable = 0;
    } else {
      for (let index = 0; index < currentBoardState.length; index++) {
        let col = currentBoardState[index];

        if (col.length > 0 && col[0] == allowedChecker) {
          //if the column has checkers and the first checker is allowed checker
          //find allowed moves for corrent column

          move1 = index + currentDiceRoll[0] * direction;
          move2 = index + currentDiceRoll[1] * direction;

          //rule#1
          //check if the target is less that 23 and free or same color and no double opponent checker

          if (move1 > 23 || move1 < 0 || currentDiceRoll[0] == 0) {
            moveAvailable = 0;
          } else {
            let move1Length = currentBoardState[move1].length;
            let move1Color = currentBoardState[move1][0];
            if (move1Length >= 2 && move1Color == blockedChecker) {
              // console.log("can't move");
              moveAvailable = 0;
            } else {
              moveAvailable = 1;
              break;
            }
          }

          if (move2 > 23 || move2 < 0 || currentDiceRoll[1] == 0) {
            moveAvailable = 0;
          } else {
            let target2Length = currentBoardState[move2].length;
            let target2Color = currentBoardState[move2][0];
            if (target2Length >= 2 && target2Color == blockedChecker) {
              moveAvailable = 0;
            } else {
              moveAvailable = 1;
              break;
            }
          }
        } else {
          moveAvailable = 0;
        }
      }
    }
    console.log(" anyMovesAvailable >>>" + moveAvailable + "<<<");
    return moveAvailable;
  }

  function setAllowedColumns(
    currentBoardState: Color[][],
    currentDiceRoll: TdiceRoll,
    currentPlayer: string,
    selectedColumn: number
  ) {
    let allowedColumns: number[] = [];
    let allowedChecker: string;
    let blockedChecker: string;
    let direction: number = +1 || -1;
    if (PlayerNames.white[0] == currentPlayer) {
      allowedChecker = "White";
      blockedChecker = "Black";
      direction = +1;
    } else {
      allowedChecker = "Black";
      blockedChecker = "White";
      direction = -1;
    }

    //find allowed columns from selected column
    //check if the selected checker is from bar or not

    let target1 = selectedColumn + currentDiceRoll[0] * direction;
    let target2 = selectedColumn + currentDiceRoll[1] * direction;

    //rule#1
    //check if the target is less that 23 and same color or not double opponent checker
    if (target1 > 23 || target1 < 0) {
      target1 = 0;
    } else {
      let target1Length = currentBoardState[target1].length;
      let target1Color = currentBoardState[target1][0];
      if (target1Length >= 2 && target1Color == blockedChecker) {
        // console.log("can't move");
        target1 = 0;
      } else {
        target1 = target1 + 10;
      }
    }

    if (target2 > 23 || target2 < 0) {
      target2 = 0;
    } else {
      let target2Length = currentBoardState[target2].length;
      let target2Color = currentBoardState[target2][0];
      if (target2Length >= 2 && target2Color == blockedChecker) {
        target2 = 0;
      } else {
        target2 = target2 + 10;
      }
    }
    console.log("target1>>>" + target1);
    console.log("target2>>>" + target2);

    return (allowedColumns = [target1, target2]);
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

    if (newCol + 10 != allowedColumns[0] && newCol + 10 != allowedColumns[1]) {
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
        onMessage(
          currentPlayer +
            " you have " +
            newMoveLeft +
            " moves left"
        );
        if (newMoveLeft == 0) { //change player
          if (currentPlayer == PlayerNames.white[0]) {
            newPlayer = PlayerNames.black[0];
          } else {
            newPlayer = PlayerNames.white[0];
          }
          onPlayerChange(newPlayer);
          onMessage(newPlayer + " roll the dice");
        }
      

    }
    onColumnSelect(50); //reset the color of the allowed points

    
  }
}
