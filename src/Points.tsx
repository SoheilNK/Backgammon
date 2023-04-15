import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import classNames from "classnames";
import { Color, Direction, PlayerNames } from "./GamePlay";

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

  // function handelDoubleClick(parent: string) {
  //   //on double click on a checker, move it to the Out
  //   if (parent == "Bar" || parent == "Out") {
  //     return;
  //   } else {
  //     //move the checker to the Out
  //     console.log("double click on " + title);
  //   }

  // }

  return (
    <img
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="checker"
      src={imgUrl}
      // onDoubleClick={() => {handelDoubleClick(parent)}}
    />
  );
}

interface PointProps {
  colName: string;
  items: Array<Color>;
  drction: Direction;
  isAllowed: boolean;
  currentPlayer: string;
  moveAllowed: boolean;
}
function Point({
  colName,
  items,
  drction,
  isAllowed, //isAllowed is true if the point is in the allowed columns
  currentPlayer,
  moveAllowed, //moveAllowed is true if the player can move checkers
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
          disabled={checkerClr != allowedClr || moveAllowed == false}
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
  moveAllowed: boolean;
  bar?: number;
};
export function Quadrant({
  boardState: points,
  start,
  end,
  drction,
  allowedColumns,
  currentPlayer,
  moveAllowed,
  bar,
}: QuadrantProps) {
  let isAllowed = false;
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
              (moveAllowed || (bar || 0) != 0)
            }
            currentPlayer={currentPlayer}
            moveAllowed={moveAllowed}
          />
          {/* added 10 to make it 2 digits*/}
        </div>
      ))}
    </div>
  );
}
