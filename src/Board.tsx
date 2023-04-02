import { useState } from "react";
import classNames from "classnames";
import { Color, PlayerNames, TdiceRoll } from "./Game";
import { Direction } from "./Game";

import { DragEndEvent, DragStartEvent, UseDroppableArguments, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { allowedColumns, setAllowedColumns } from "./Dice";
let imgUrl = "";

interface CheckerProps {
  title: string;
  clr: Color;
  parent: string;
}
function Checker({ title, clr, parent }: CheckerProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
      title,
      parent,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  if (clr == "White") {
    imgUrl = "Checker_W.png";
  }
  if (clr == "Black") {
    imgUrl = "Checker_B.png";
  }

  return (
    <img
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="checker"
      src={imgUrl}
    />
  );

}


interface PointProps {
  colName: string;
  items: Array<Color>;
  drction: Direction;
}
function Point({ colName, items, drction }: PointProps) {

  const { setNodeRef } = useDroppable({
    id: colName,
      
  });   




  const pointClass = classNames({
    point: true,
  });
  return (
    <div
      id= {colName}
      ref={setNodeRef}
      className={drction + " " + pointClass}
    >
      {items.map((checkerClr, key) => (
        <Checker
          key={key}
          parent={colName}
          clr={checkerClr}
          title={colName + "-ch-" + key}
        />
      ))}
    </div>
  );
}

type ContainerProps = {
  boardState: Color[][];
  start: number;
  end: number;
  drction: Direction;
};
function Container({
  boardState: points,
  start,
  end,
  drction,
}: ContainerProps) {
  return (
    <div className={"grid-container " + drction}>
      {points.slice(start, end).map((point, i) => (
        <div key={start + i} className={"grid-item "}>
          <Point
            items={point}
            colName={"Point-" + (10 + start + i)}
            drction={drction}
          />{" "}
          {/* added 10 to make it 2 digits*/}
        </div>
      ))}
    </div>
  );
}




      
type BoardProps = {
  boardState: Color[][]
  currentDiceRoll: TdiceRoll
  currentPlayer: PlayerNames
};
export function Board({ boardState, currentDiceRoll, currentPlayer }: BoardProps) {
  return (
    <DndContext
      onDragStart={handelDragStart}
      collisionDetection={closestCenter}
      
      onDragEnd={handleDragEnd}

    >
      <div className="board">
        <Container
          boardState={boardState}
          start={12}
          end={18}
          drction={"ltr"}
        />
        <Container
          boardState={boardState}
          start={18}
          end={24}
          drction={"ltr"}
        />
        <Container boardState={boardState} start={6} end={12} drction={"rtl"} />
        <Container boardState={boardState} start={0} end={6} drction={"rtl"} />
      </div>
    </DndContext>
  );

  function handelDragStart(e: DragStartEvent) {
    const title = e.active.data.current?.title ?? ""; //checker
    const index = e.active.data.current?.index ?? 0;
    const parent: string = e.active.data.current?.parent ?? "";
    console.log("--------Start Draging-------");
    console.log("Checker ID = ", title);
    console.log("Parent Point = ", parent);
    console.log("allowed columns handelDragStart" + allowedColumns);
    let currentPoint = +parent.slice(parent.length - 2, parent.length);

    let allowedPoint1 = allowedColumns[currentPoint - 10][0];
    let allowedPoint2 = allowedColumns[currentPoint - 10][1];
    let allowedPoint1ID = "Point-" + allowedPoint1;
    let allowedPoint2ID = "Point-" + allowedPoint2;
    console.log("allowedPoint1 = ", allowedPoint1, allowedPoint1ID);
    console.log("allowedPoint2 = ", allowedPoint2, allowedPoint2ID);
    //change the color of the allowed points
    let allowedPoint1Element = document.getElementById(allowedPoint1ID);
    let allowedPoint2Element = document.getElementById(allowedPoint2ID);
    console.log("currentDiceRoll = ", currentDiceRoll);
    if (currentDiceRoll[0] != 0) {
      allowedPoint1Element?.classList.add("point-allowed");
    }
    if (currentDiceRoll[1] != 0) {
      allowedPoint2Element?.classList.add("point-allowed");
    }

    const parrentPoint = document.getElementById(parent);
    console.log("parrentPoint = " + parrentPoint + "---" + allowedPoint1);

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
    const colorName = boardState[oldCol][index];
    console.log("picked up checker is : " + colorName);
    //update states
    const newState = boardState;
    const newDiceRoll = currentDiceRoll;

    if (newCol + 10 == allowedColumns[oldCol][0]) {
      console.log(newState[newCol]);
      newState[newCol].push(colorName);
      console.log(newState[newCol]);
      newState[oldCol].pop();
      newDiceRoll[0] = 0;
      console.log("newDiceRoll=", newDiceRoll);
    }
    if (newCol + 10 == allowedColumns[oldCol][1]) {
      console.log(newState[newCol]);
      newState[newCol].push(colorName);
      console.log(newState[newCol]);
      newState[oldCol].pop();
      newDiceRoll[1] = 0;
      console.log("newDiceRoll=", newDiceRoll);
    }
    if (
      newCol + 10 != allowedColumns[oldCol][0] &&
      newCol + 10 != allowedColumns[oldCol][1]
    ) {
      console.log("not allowed");
    }
    //reset the color of the allowed points
    const allowedPoint1Element = document.getElementById(
      "Point-" + allowedColumns[oldCol][0]
    );
    const allowedPoint2Element = document.getElementById(
      "Point-" + allowedColumns[oldCol][1]
    );
    allowedPoint1Element?.classList.remove("point-allowed");
    allowedPoint2Element?.classList.remove("point-allowed");
    console.log("---------------");
    console.log("newState = ", newState);
    console.log("newDiceRoll = ", newDiceRoll)
    console.log("currentPlayer = ", currentPlayer);

    //check if player can move again
    if (newDiceRoll[0] == 0 && newDiceRoll[1] == 0) {
      console.log("player can't move again");
      if (currentPlayer == PlayerNames.white) {
        currentPlayer = PlayerNames.black;
      } else {
        currentPlayer = PlayerNames.white;
      }
      //make roll button active
      const rollButton = document.getElementById("roll");
      if (rollButton) {
        rollButton.disabled = false;
      }
      //show alert in id="alert"
      document.getElementById("alert").innerHTML = currentPlayer + " roll the dice";
      //setcurre
    
      
      
    }
    console.log("---------------");
    console.log("newState = ", newState);
    console.log("newDiceRoll = ", newDiceRoll)
    console.log("currentPlayer = ", currentPlayer);
    
    setAllowedColumns(newState, newDiceRoll, currentPlayer);
  }
}

