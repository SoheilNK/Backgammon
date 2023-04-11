import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import classNames from "classnames";
import { Color, Direction, PlayerNames } from "./Game";

let imgUrl = "";

interface CheckerProps {
  title: string;
  clr: Color;
  parent: string;
  disabled: boolean;
}
export function Checker({ title, clr, parent, disabled }: CheckerProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    disabled: disabled,
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
  isAllowed: boolean;
  currentPlayer: string;
  moveLeft: number;
}
function Point({
  colName,
  items,
  drction,
  isAllowed,
  currentPlayer,
  moveLeft,
}: PointProps) {
  const { setNodeRef } = useDroppable({
    id: colName,
  });

  const pointClass = classNames("point", {
    pointAllowed: isAllowed,
  });

  //check allowed player
  let allowedClr: Color;
  if (PlayerNames.white[0] == currentPlayer) {
    allowedClr = "White";
  } else {
    allowedClr = "Black";
  }

  return (
    <div id={colName} ref={setNodeRef} className={drction + " " + pointClass}>
      {items.map((checkerClr, key) => (
        <Checker
          disabled={checkerClr != allowedClr || moveLeft == 0}
          key={key}
          parent={colName}
          clr={checkerClr}
          title={colName + "-ch-" + key}
        />
      ))}
    </div>
  );
}

type QuadrantProps = {
  boardState: Color[][];
  start: number;
  end: number;
  drction: Direction;
  allowedColumns: number[];
  currentPlayer: string;
  moveAllowed: number;
  bar?: number;
};
export function Quadrant({
  boardState: points,
  start,
  end,
  drction,
  allowedColumns,
  currentPlayer,
  moveAllowed: moveLeft,
  bar,
}: QuadrantProps) {
  let isAllowed = false;
  if (bar == undefined) {
    bar = 0;
  }

  return (
    <div className={"grid-container " + drction}>
      {points.slice(start, end).map((point, i) => (
        <div key={start + i} className={"grid-item "}>
          <Point
            items={point}
            colName={"Point-" + (10 + start + i)}
            drction={drction}
            //set isAllowed to true if the point is in the allowed columns
            isAllowed={
              (allowedColumns[0] == start + i + 10 ||
                allowedColumns[1] == start + i + 10) &&
              (moveLeft > 0 || bar != 0)
            }
            currentPlayer={currentPlayer}
            moveLeft={moveLeft}
          />
          {/* added 10 to make it 2 digits*/}
        </div>
      ))}
    </div>
  );
}
