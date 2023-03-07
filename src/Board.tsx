import { Color } from "./Game";
import { useState } from "react";

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

  return (
    <img className="checker" src={imgUrl} />
  );
}
type PointProps = { value: Array<Color> };
function Point({ value }: PointProps) {
  const checkers = value.map((checker, i) => <Checker key={i} clr={checker} />);

  return <>{checkers}</>;
}

type BoardProps = { currentState: Color[][]}
export function Board({ currentState }: BoardProps) {
  const [points, setPoints] = useState(currentState);
  return (
    <div className="board">
      <div className="grid-container">
        <div className="grid-item">
          <Point value={points[12]} />
        </div>
        <div className="grid-item">
          <Point value={points[13]} />
        </div>
        <div className="grid-item">
          <Point value={points[14]} />
        </div>
        <div className="grid-item">
          <Point value={points[15]} />
        </div>
        <div className="grid-item">
          <Point value={points[16]} />
        </div>
        <div className="grid-item">
          <Point value={points[17]} />
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-item">
          <Point value={points[18]} />
        </div>
        <div className="grid-item">
          <Point value={points[19]} />
        </div>
        <div className="grid-item">
          <Point value={points[20]} />
        </div>
        <div className="grid-item">
          <Point value={points[21]} />
        </div>
        <div className="grid-item">
          <Point value={points[22]} />
        </div>
        <div className="grid-item">
          <Point value={points[23]} />
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-item bottom-items">
          <Point value={points[11]} />
        </div>
        <div className="grid-item bottom-items">
          <Point value={points[10]} />
        </div>
        <div className="grid-item bottom-items">
          <Point value={points[9]} />
        </div>
        <div className="grid-item bottom-items">
          <Point value={points[8]} />
        </div>
        <div className="grid-item bottom-items">
          <Point value={points[7]} />
        </div>
        <div className="grid-item bottom-items">
          <Point value={points[6]} />
        </div>
      </div>{" "}
      <div className="grid-container">
        <div className="grid-item bottom-items">
          <Point value={points[5]} />
        </div>
        <div className="grid-item bottom-items">
          <Point value={points[4]} />
        </div>
        <div className="grid-item bottom-items">
          <Point value={points[3]} />
        </div>
        <div className="grid-item bottom-items">
          <Point value={points[2]} />
        </div>
        <div className="grid-item bottom-items">
          <Point value={points[1]} />
        </div>
        <div className="grid-item bottom-items">
          <Point value={points[0]} />
        </div>
      </div>
    </div>
  );
}