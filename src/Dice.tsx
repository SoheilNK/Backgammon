import { PlayerNames, TdiceRoll } from "./Game";
interface DiceProps {
  currentDiceRoll: TdiceRoll;
  callback: Function;
  disabled: boolean;
  setPlayer: Function;
}

export default function Dice({
    currentDiceRoll,
    callback,
    disabled,
    setPlayer,
}: DiceProps) {
    return (
        <div>
            <h2>{currentDiceRoll}</h2>
            <button type="button" disabled={disabled} onClick={() => {
                currentDiceRoll = [
                  Math.floor(Math.random() * 5 + 1),
                  Math.floor(Math.random() * 5 + 1),
                ] as TdiceRoll;
                callback(currentDiceRoll)
                setPlayer(PlayerNames.white) //test
                // console.log(currentDiceRoll);
            }}>
                Roll Dice
            </button>
        </div>
    );
    
}