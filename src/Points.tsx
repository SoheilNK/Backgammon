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
    touchAction: "none", //to prevent scroll on touch screens
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

  let d = 0;
  var r = document.querySelector(":root") as HTMLElement;
  var rs = getComputedStyle(r);
  var checker = parseInt(rs.getPropertyValue("--checkerSize")) * 18; //convert rem to px
  let pointLength = items.length;
  let drcTop = "ltr" as Direction;
  return (
    <div
      id={colName}
      ref={setNodeRef}
      className={drction + " relative " + pointClass}
    >
      {items.map(
        (checkerClr, key) => (
          pointLength <= 6
            ? (d = checker * key)
            : (d = ((checker * 6) / pointLength) * key),
          (
            <div
              style={
                drction == drcTop ? { top: d + "px" } : { bottom: d + "px" }
              }
              className={"absolute "}
            >
              <Checker
                disabled={checkerClr != allowedClr || !moveAllowed}
                key={key}
                parent={colName}
                clr={checkerClr}
                title={colName + "-ch-" + key}
              />
            </div>
          )
        )
      )}
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
