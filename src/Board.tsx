import { useState } from "react";
import { Color } from "./Game";
import { Direction } from "./Game";

import { DragEndEvent, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { closestCenter, DndContext } from "@dnd-kit/core";



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
  return (
    <div ref={setNodeRef} className={"point " + drction}>
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
  points: Color[][];
  start: number;
  end: number;
  drction: Direction;
};
function Container({ points, start, end, drction }: ContainerProps) {
  return (
    <div className={"grid-container " + drction}>
      {points.slice(start, end).map((point, i) => (
        <div key={start + i} className={"grid-item "}>
          <Point items={point} colName={"Point-" + (10 + start + i)} drction={drction} />{" "}
          {/* added 10 to make it 2 digits*/}
        </div>
      ))}
    </div>
  );
}

type BoardProps = { currentState: Color[][] };
export function Board({ currentState }: BoardProps) {
  const [points, setPoints] = useState(currentState);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      
    >
      <div className="board">
        <Container points={currentState} start={12} end={18} drction={"ltr"} />
        <Container points={currentState} start={18} end={24} drction={"ltr"} />
        <Container points={currentState} start={6} end={12} drction={"rtl"} />
        <Container points={currentState} start={0} end={6} drction={"rtl"} />
      </div>
    </DndContext>
  );

  function handleDragEnd(e: DragEndEvent) {
    if (!e.over) return;
    const target = e.over.id as string;
    if (typeof e.over.id !== "string") throw new Error("id is not string")
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
    const colorName = currentState[oldCol][index];
    console.log("picked up checker is : " + colorName);

    const newState = currentState;

    console.log(newState[newCol]);
    newState[newCol].push(colorName);
    console.log(newState[newCol]);
    newState[oldCol].pop();
  }

}
