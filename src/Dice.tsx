import * as React from "react";
import Dice from "react-dice-roll";
// import "./styles.css";
import "./index.css";

interface Dice1Props {
  callback: Function;
  disabled: true | false;
}

export default function Dice1({ d1, d2,  callback, disabled }: Dice1Props) {
  return (
    <div>
      <h1>Dice </h1>
      <Dice size={80} disabled={disabled} />
      <Dice size={80} disabled={disabled} />
    </div>
  );
}
