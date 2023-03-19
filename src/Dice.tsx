import { TdiceRoll } from "./Game";
interface DiceProps {
  currentDiceRoll: TdiceRoll;
  callback: Function;
  disabled: boolean;
}

export default function Dice({
    currentDiceRoll,
    callback,
    disabled,
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
                // console.log(currentDiceRoll);
            }}>
                Roll Dice
            </button>
        </div>
    );
    
}