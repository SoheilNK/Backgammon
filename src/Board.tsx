import { Color, PlayerNames, TdiceRoll } from "./Game";

import { DragEndEvent, DragStartEvent} from "@dnd-kit/core";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { Container } from "./Points";
import { useEffect, useState } from "react";

type BoardProps = {
  currentBoardState: Color[][];
  // setCurrentBoardState: Function;
  onMove: (boardState: Color[][]) => void;
  currentDiceRoll: TdiceRoll;
  currentPlayer: PlayerNames;
  selectedColumn: number;
  onColumnSelect: (column: number) => void;
};
export function Board({
  currentBoardState,
  onMove,
  currentDiceRoll,
  currentPlayer,
  selectedColumn,
  onColumnSelect,
}: BoardProps) {
  let allowedColumns = setAllowedColumns(
    currentBoardState,
    currentDiceRoll,
    currentPlayer,
    selectedColumn
  );
  console.log("allowed columns for current state>>>" + allowedColumns);

  return (
    <DndContext
      onDragStart={handelDragStart}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="board">
        <Container
          boardState={currentBoardState}
          start={12}
          end={18}
          drction={"ltr"}
          allowedColumns={allowedColumns}
        />
        <Container
          boardState={currentBoardState}
          start={18}
          end={24}
          drction={"ltr"}
          allowedColumns={allowedColumns}
        />
        <Container
          boardState={currentBoardState}
          start={6}
          end={12}
          drction={"rtl"}
          allowedColumns={allowedColumns}
        />
        <Container
          boardState={currentBoardState}
          start={0}
          end={6}
          drction={"rtl"}
          allowedColumns={allowedColumns}
        />
      </div>
    </DndContext>
  );

  function setAllowedColumns(
    currentBoardState: Color[][],
    currentDiceRoll: TdiceRoll,
    currentPlayer: PlayerNames,
    selectedColumn: number
  ) {
    let allowedColumns: number[] = [];
    let currentChecker: string;
    let opponentChecker: string;

    if (PlayerNames.white == currentPlayer) {
      currentChecker = "White";
      opponentChecker = "Black";
    } else {
      currentChecker = "Black";
      opponentChecker = "White";
    }
    // console.log(currentChecker, " vs", opponentChecker);
    // console.log(allowedChecker, currentPlayer);

    //find allowed columns from selected column
    let target1 = selectedColumn + currentDiceRoll[0];
    let target2 = selectedColumn + currentDiceRoll[1];


    //rule#1
    //check if the target is less that 23 and same color or not double opponent checker
    if (target1 > 23) {
      target1 = -1;
    } else {
      let target1Length = currentBoardState[target1].length;
      let target1Color = currentBoardState[target1][0];
      if (target1Length >= 2 && target1Color == opponentChecker) {
        // console.log("can't move");
        target1 = 0;
      } else {
        target1 = target1 + 10;
      }
    }

    if (target2 > 23) {
      target2 = 0;
    } else {
      let target2Length = currentBoardState[target2].length;
      let target2Color = currentBoardState[target2][0];
      if (target2Length >= 2 && target2Color == opponentChecker) {
        target2 = 0;
      } else {
        target2 = target2 + 10;
      }
    }
    // allowedColumns = [target1, target2];
    return (allowedColumns = [target1, target2]);
  }

  function handelDragStart(e: DragStartEvent) {
    const parent: string = e.active.data.current?.parent ?? "";
    let currentPoint = +parent.slice(parent.length - 2, parent.length) - 10;
    onColumnSelect(currentPoint);
  }

  function handleDragEnd(e: DragEndEvent) {
    if (!e.over) return;
    const target = e.over.id as string;
    if (typeof e.over.id !== "string") throw new Error("id is not string");
    if (typeof e.over.id !== "string") throw new Error("id is not string");
    const index = e.active.data.current?.index ?? 0;
    const parent = e.active.data.current?.parent ?? "";
    console.log("-----drag end----------");
    const oldCol: number = parent.slice(6, 8) - 10;
    const newCol: number = +target.slice(6, 8) - 10;
    const colorName = currentBoardState[oldCol][index];
    //update states
    const newBoardState = currentBoardState;
    const newDiceRoll = currentDiceRoll;

    if (newCol + 10 != allowedColumns[0] && newCol + 10 != allowedColumns[1]) {
      alert("This move is not not allowed");
    } else {
      newBoardState[newCol].push(colorName);
      newBoardState[oldCol].pop();
      onMove(newBoardState);
      if (newCol + 10 == allowedColumns[0]) {
        newDiceRoll[0] = 0;
      }
      if (newCol + 10 == allowedColumns[1]) {
        newDiceRoll[1] = 0;
      }
    }
    onColumnSelect(23); //reset the color of the allowed points

    //check if player can move again
    if (newDiceRoll[0] == 0 && newDiceRoll[1] == 0) {
      console.log("player can't move again");
      if (currentPlayer == PlayerNames.white) {
        currentPlayer = PlayerNames.black;
      } else {
        currentPlayer = PlayerNames.white;
      }
      //make roll button active
      // const rollButton = document.getElementById("roll");
      // if (rollButton) {
      //   rollButton.disabled = false;
      // }
      //show alert in id="alert"
      // document.getElementById("alert").innerHTML = currentPlayer + " roll the dice";
      //setcurre
    }
    // console.log("---------------");
    // console.log("newState = ", newBoardState);
    // console.log("newDiceRoll = ", newDiceRoll);
    // console.log("currentPlayer = ", currentPlayer);

    // setAllowedColumns(newState, newDiceRoll, currentPlayer);
  }
  }

