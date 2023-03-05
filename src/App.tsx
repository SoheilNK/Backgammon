import { useState } from "react";

function Game() {
  return (
    <div>
      <Board />
    </div>
  );
}

export default Game;
let imgUrl = "";
let clr = "";

let data = [
  { column: 1, checkers: ["black", "black"] },
  { column: 7, checkers: ["white", "white"] },
  { column: 13, checkers: ["white"] },
  { column: 19, checkers: ["black"] },
];

function Checker({ clr }) {
  if (clr == "White") {
    imgUrl = "Checker-W.png";
  }
  if (clr == "Black") {
    imgUrl = "Checker-B.png";
  }

  return (
    // <div>
    <img className="checker" src={imgUrl} />
    // </div>
  );
}
let initialData = [
  ["White", "White"],
  [],
  [],
  [],
  [],
  ["Black", "Black", "Black", "Black", "Black"],
  [],
  ["Black", "Black", "Black"],
  [],
  [],
  [],
  ["White", "White", "White", "White", "White"],
  ["Black", "Black", "Black", "Black", "Black"],
  [],
  [],
  [],
  ["White", "White", "White"],
  [],
  ["White", "White", "White", "White", "White"],
  [],
  [],
  [],
  [],
  ["Black", "Black"],
];

function Board() {
  const [points, setPoints] = useState(initialData)
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
        <div className="grid-item">
          <Point value={points[11]} />
        </div>
        <div className="grid-item">
          <Point value={points[10]} />
        </div>
        <div className="grid-item">
          <Point value={points[9]} />
        </div>
        <div className="grid-item">
          <Point value={points[8]} />
        </div>
        <div className="grid-item">
          <Point value={points[7]} />
        </div>
        <div className="grid-item">
          <Point value={points[6]} />
        </div>
      </div>{" "}
      <div className="grid-container">
        <div className="grid-item">
          <Point value={points[5]} />
        </div>
        <div className="grid-item">
          <Point value={points[4]} />
        </div>
        <div className="grid-item">
          <Point value={points[3]} />
        </div>
        <div className="grid-item">
          <Point value={points[2]} />
        </div>
        <div className="grid-item">
          <Point value={points[1]} />
        </div>
        <div className="grid-item">
          <Point value={points[0]} />
        </div>
      </div>
    </div>
  );
}

function Point({ value }) {
  const checkers = value.map((checker) => (
      <Checker clr={checker} />
  ));
  return <>{checkers}</>;

  
}
