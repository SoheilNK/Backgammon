import { Checker } from "./Points";

interface BarProps {
    whiteBar: number;
    blackBar: number;
}
export default function Bar({

    whiteBar,
    blackBar,
 
}: BarProps): JSX.Element {
    return (
      <div className="grid-container-bar">
        <div className="whiteBar grid-item-bar ">
          {whiteBar > 0 ? (
            <div className="whiteBar">
              {Array.from(Array(whiteBar).keys()).map((i) => (
                <Checker
                  title={""}
                  clr={"White"}
                  parent={""}
                  disabled={false}
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
                  title={""}
                  clr={"Black"}
                  parent={""}
                  disabled={false}
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
