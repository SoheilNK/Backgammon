import { useLocalStorage } from "../services/useLocalStorage";
import { getUser } from "../services/user.service";
import { PlayerNames } from "./GamePlay";
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
  //disable checker if it is not the allowed online player
  const [online, setOnline] = useLocalStorage("online", null);
  const username = getUser().username;
  let onlineMoveAllowed = true;
  if (online !== null) {
    if (currentPlayer != username) {
      onlineMoveAllowed = false;
    }
  }
  //--------------------------

  return (
    <div className="grid-container-bar barGrid">
      <div className="blackBar grid-item-bar">
        {
          <div className="blackBar">
            {blackBar > 0 &&
              Array.from(Array(blackBar).keys()).map((i) => (
                <Checker
                  title={"bBlot_" + i}
                  key={"blackBar_" + i}
                  clr="Black"
                  parent="Bar"
                  disabled={
                    PlayerNames.black[0] != currentPlayer ||
                    onlineMoveAllowed == false
                  }
                />
              ))}
          </div>
        }
      </div>
      <div className="flex flex-col-reverse">
        {
          <div className="">
            {whiteBar > 0 &&
              Array.from(Array(whiteBar).keys()).map((i) => (
                <Checker
                  title={"wBlot_" + i}
                  key={"wihtBar_" + i}
                  clr="White"
                  parent="Bar"
                  disabled={
                    PlayerNames.white[0] != currentPlayer ||
                    onlineMoveAllowed == false
                  }
                />
              ))}
          </div>
        }
      </div>
    </div>
  );
}
