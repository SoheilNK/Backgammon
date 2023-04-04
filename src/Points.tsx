import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import classNames from "classnames";
import { Color, Direction } from "./Game";

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
export function Container({
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