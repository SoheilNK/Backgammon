import { useState } from "react";
import { Color } from "./Game";
import { Direction } from "./Game";

let imgUrl = "";

type CheckerProps = {
  clr: Color;
};
function Checker({ clr }: CheckerProps) {
  if (clr == "White") {
    imgUrl = "Checker-W.png";
  }
  if (clr == "Black") {
    imgUrl = "Checker-B.png";
  }

  return <img className="checker" src={imgUrl} />;
}
type PointProps = { value: Array<Color> };
function Point({ value }: PointProps) {
  const checkers = value.map((checker, i) => <Checker key={i} clr={checker} />);

  return <>{checkers}</>;
}

type BoardProps = { currentState: Color[][] };
export function Board({ currentState }: BoardProps) {
  const [points, setPoints] = useState(currentState);
  return (
    <div className="board">
      <Container points={currentState} start={12} end={18} drction={"ltr"} />
      <Container points={currentState} start={18} end={24} drction={"ltr"} />
      <Container points={currentState} start={6} end={12} drction={"rtl"} />
      <Container points={currentState} start={0} end={6} drction={"rtl"} />
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
        <div key={i} className={"grid-item " +  drction}>
          <Point value={point} />
        </div>
      ))}
    </div>
  );
}
