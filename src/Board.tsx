import { useState } from "react";
import classNames from "classnames";
import { Color, PlayerNames, TdiceRoll } from "./Game";
import { Direction } from "./Game";

import { DragEndEvent, DragStartEvent, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { background } from "@chakra-ui/react";

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

  const [isHovered, setIsHovered] = useState(false);

  const pointClass = classNames({
    point: true,
    "point-over": isHovered,
  });
  return (
    <div
      id= {colName}
      ref={setNodeRef}
      className={drction + " " + pointClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
export function Board({ boardState }: BoardProps) {
  
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

  // interface HandlePointerDownProps {
  //   clr: Color;
  //   parent: string;
  // }

  function handelDragStart(e: DragStartEvent) {
    const title = e.active.data.current?.title ?? ""; //checker
    const index = e.active.data.current?.index ?? 0;
    const parent: string = e.active.data.current?.parent ?? "";
    console.log("--------Start Draging-------");

    console.log("Checker ID = ", title);
    console.log("Parent Point = ", parent);
    let currentPoint = +parent.slice(parent.length - 2, parent.length);
    let allowedPoint = [currentPoint + 1];
    const parrentPoint = document.getElementById(parent);

    console.log("parrentPoint = " + parrentPoint + "---" + allowedPoint);
    parrentPoint?.setAttribute("class", "point-picked"); //test...
    // onMouseEnter={() => setIsHovered(true)}
    // onMouseLeave={() => setIsHovered(false)}

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
    const oldCol: number = +parent.slice(6, 8) - 10;
    const newCol: number = +target.slice(6, 8) - 10;
    console.log(oldCol + newCol);
    const colorName = boardState[oldCol][index];
    console.log("picked up checker is : " + colorName);

    const newState = boardState;

    console.log(newState[newCol]);
    newState[newCol].push(colorName);
    console.log(newState[newCol]);
    newState[oldCol].pop();
  }
}

