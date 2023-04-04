import { Color, PlayerNames, TdiceRoll } from "./Game";

import { DragEndEvent, DragStartEvent} from "@dnd-kit/core";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { Container } from "./Points";
import { useEffect, useState } from "react";

type BoardProps = {
  currentBoardState: Color[][];
  currentDiceRoll: TdiceRoll;
  currentPlayer: PlayerNames;
};
export function Board({
  currentBoardState,
  currentDiceRoll,
  currentPlayer,
}: BoardProps) {
    let allowedColumns = setAllowedColumns(currentBoardState, currentDiceRoll, currentPlayer);
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
        />
        <Container
          boardState={currentBoardState}
          start={18}
          end={24}
          drction={"ltr"}
        />
        <Container
          boardState={currentBoardState}
          start={6}
          end={12}
          drction={"rtl"}
        />
        <Container
          boardState={currentBoardState}
          start={0}
          end={6}
          drction={"rtl"}
        />
      </div>
    </DndContext>
  );

  function setAllowedColumns(
    currentBoardState: Color[][],
    currentDiceRoll: TdiceRoll,
    currentPlayer: PlayerNames
  ) {
    let allowedColumns: number[][] = [];
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
    currentBoardState.forEach((point, i) => {
      if (point[0] == currentChecker) {
        let target1 = i + currentDiceRoll[0];
        let target2 = i + currentDiceRoll[1];
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
        allowedColumns[i] = [target1, target2];
      }
    });
    // console.log(allowedColumns);
    return allowedColumns;
  }

  function handelDragStart(e: DragStartEvent) {
    const title = e.active.data.current?.title ?? ""; //checker
    const index = e.active.data.current?.index ?? 0;
    const parent: string = e.active.data.current?.parent ?? "";
    console.log("--------Start Draging-------");
    console.log("Checker ID = ", title);
    console.log("Parent Point = ", parent);
    // console.log("allowed columns handelDragStart" + allowedColumns);
    let currentPoint = +parent.slice(parent.length - 2, parent.length);

    // let allowedPoint1 = allowedColumns[currentPoint - 10][0];
    // let allowedPoint2 = allowedColumns[currentPoint - 10][1];
    // let allowedPoint1ID = "Point-" + allowedPoint1;
    // let allowedPoint2ID = "Point-" + allowedPoint2;
    // console.log("allowedPoint1 = ", allowedPoint1, allowedPoint1ID);
    // console.log("allowedPoint2 = ", allowedPoint2, allowedPoint2ID);
    //change the color of the allowed points
    // let allowedPoint1Element = document.getElementById(allowedPoint1ID);
    // let allowedPoint2Element = document.getElementById(allowedPoint2ID);
    // console.log("currentDiceRoll = ", currentDiceRoll);
    // if (currentDiceRoll[0] != 0) {
    //   allowedPoint1Element?.classList.add("point-allowed");
    // }
    // if (currentDiceRoll[1] != 0) {
    //   allowedPoint2Element?.classList.add("point-allowed");
    // }

    const parrentPoint = document.getElementById(parent);
    // console.log("parrentPoint = " + parrentPoint + "---" + allowedPoint1);

    console.log("Checker index = ", index);

    console.log("--------END Draging-------");
  }

  function handleDragEnd(e: DragEndEvent) {
    if (!e.over) return;
    const target = e.over.id as string;
    if (typeof e.over.id !== "string") throw new Error("id is not string");
    if (typeof e.over.id !== "string") throw new Error("id is not string");
    const title = e.active.data.current?.title ?? ""; //checker
    const index = e.active.data.current?.index ?? 0;
    const parent = e.active.data.current?.parent ?? "";
    console.log("---------------");

    console.log("Checker ID = ", title);
    console.log("Parent Point = ", parent);
    console.log("Target Point = ", target);
    console.log("Checker index = ", index);
    const oldCol: number = parent.slice(6, 8) - 10;
    const newCol: number = +target.slice(6, 8) - 10;
    console.log(oldCol + newCol);
    const colorName = currentBoardState[oldCol][index];
    console.log("picked up checker is : " + colorName);
    //update states
    const newState = currentBoardState;
    const newDiceRoll = currentDiceRoll;

    // if (newCol + 10 == allowedColumns[oldCol][0]) {
    //   console.log(newState[newCol]);
      newState[newCol].push(colorName);
    //   console.log(newState[newCol]);
      newState[oldCol].pop();
    //   newDiceRoll[0] = 0;
    //   console.log("newDiceRoll=", newDiceRoll);
    // }
    // if (newCol + 10 == allowedColumns[oldCol][1]) {
    //   console.log(newState[newCol]);
    //   newState[newCol].push(colorName);
    //   console.log(newState[newCol]);
    //   newState[oldCol].pop();
    //   newDiceRoll[1] = 0;
    //   console.log("newDiceRoll=", newDiceRoll);
    // }
    // if (
    //   newCol + 10 != allowedColumns[oldCol][0] &&
    //   newCol + 10 != allowedColumns[oldCol][1]
    // ) {
    //   console.log("not allowed");
    // }
    //reset the color of the allowed points
    // // const allowedPoint1Element = document.getElementById(
    // //   "Point-" + allowedColumns[oldCol][0]
    // // );
    // // const allowedPoint2Element = document.getElementById(
    // //   "Point-" + allowedColumns[oldCol][1]
    // // );
    // allowedPoint1Element?.classList.remove("point-allowed");
    // allowedPoint2Element?.classList.remove("point-allowed");
    // console.log("---------------");
    // console.log("newState = ", newState);
    // console.log("newDiceRoll = ", newDiceRoll)
    // console.log("currentPlayer = ", currentPlayer);

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
    console.log("---------------");
    console.log("newState = ", newState);
    console.log("newDiceRoll = ", newDiceRoll);
    console.log("currentPlayer = ", currentPlayer);

    // setAllowedColumns(newState, newDiceRoll, currentPlayer);
  }
}

