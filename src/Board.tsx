import { Component, useState } from "react";
import { Color } from "./Game";
import { Direction } from "./Game";

// import { Flex, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";
import { useDroppable } from "@dnd-kit/core";
import { closestCenter, DndContext, rectIntersection } from "@dnd-kit/core";



let imgUrl = "";

interface CheckerProps {
  title: string;
  clr: Color;
  index: number;
  parent: string;
}
function Checker({ title, clr, index, parent }: CheckerProps) {
  var myuuid = uuidv4();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
      title,
      index,
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
}
function Point({ colName, items }: PointProps) {
  const { setNodeRef } = useDroppable({
    id: colName,
  });
  return (
    <div ref={setNodeRef}>
      {items.map((checkerClr, key) => (
        <Checker
          key={key}
          index={key}
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
        <div key={start + i} className={"grid-item " + drction}>
          <Point items={point} colName={"Point-" + (10 + start + i)} />
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
      onDragEnd={(e) => {
        const container = e.over?.id;
        const title = e.active.data.current?.title ?? ""; //checker
        const index = e.active.data.current?.index ?? 0;
        const parent = e.active.data.current?.parent ?? "";
        console.log("---------------");

        console.log("Checker ID = ", title);
        console.log("Parent Point = ", parent);
        console.log("Target Point = ", container);
        console.log("Checker index = ", index);
        const oldCol: number = +parent.slice(6, 8) - 10;
        const newCol: number = +container.slice(6, 8) - 10;
        console.log(oldCol + newCol)
        const test = currentState[oldCol][index]
        console.log("picked up checker is : " + test);

        const newState = currentState;
                
        console.log(newState[newCol]);  
        newState[newCol].push(
          <Checker
            title={title}
            clr={test}
            index={newState[newCol.lenght]}
            parent={container}
          />
        );
        console.log(newState[newCol])
        newState[oldCol].pop()


        // if (container === "ToDo") {
        //   setTodoItems([...todoItems, { myuuid }]);
        // } else if (container === "Done") {
        //   setDoneItems([...doneItems, { title }]);
        // } else if (container === "Unassigned") {
        //   setuItems([...uItems, { title }]);
        // } else {
        //   setInProgressItems([...inProgressItems, { title }]);
        // }
        // if (parent === "ToDo") {
        //   setTodoItems([
        //     ...todoItems.slice(0, index),
        //     ...todoItems.slice(index + 1),
        //   ]);
        // } else if (parent === "Done") {
        //   setDoneItems([
        //     ...doneItems.slice(0, index),
        //     ...doneItems.slice(index + 1),
        //   ]);
        // } else if (parent === "Unassigned") {
        //   setuItems([
        //     ...uItems.slice(0, index),
        //     ...uItems.slice(index + 1),
        //   ]);
        // } else {
        //   setInProgressItems([
        //     ...inProgressItems.slice(0, index),
        //     ...inProgressItems.slice(index + 1),
        //   ]);
        // }
      }}
    >
      <div className="board">
        <Container points={currentState} start={12} end={18} drction={"ltr"} />
        <Container points={currentState} start={18} end={24} drction={"ltr"} />
        <Container points={currentState} start={6} end={12} drction={"rtl"} />
        <Container points={currentState} start={0} end={6} drction={"rtl"} />
      </div>
    </DndContext>
  );
}
