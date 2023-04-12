import { PlayerNames } from "./Game";
import { Checker } from "./Points";

interface BarProps {
  whiteBar: number;
  blackBar: number;
  currentPlayer: string;
}
export default function Bar({
  whiteBar,
  blackBar,
  currentPlayer,
}: BarProps): JSX.Element {
  return (
    <div className="grid-container-bar">
      <div className="whiteBar grid-item-bar ">
        {whiteBar > 0 ? (
          <div className="whiteBar">
            {Array.from(Array(whiteBar).keys()).map((i) => (
              <Checker
                title={"wBlot_" + i}
                key={"wihtBar_" + i}
                clr={"White"}
                parent={"Bar"}
                disabled={PlayerNames.white[0] != currentPlayer}
              />
            ))}
          </div>
        ) : (
          <div className="whiteBar"></div>
        )}
      </div>
      <div className="blackBar grid-item-bar">
        {blackBar > 0 ? (
          <div className="blackBar">
            {Array.from(Array(blackBar).keys()).map((i) => (
              <Checker
                title={"bBlot_" + i}
                key={"blackBar_" + i}
                clr={"Black"}
                parent={"Bar"}
                disabled={PlayerNames.black[0] != currentPlayer}
              />
            ))}
          </div>
        ) : (
          <div className="blackBar"></div>
        )}
      </div>
    </div>
  );
}
