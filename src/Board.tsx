import { Color, PlayerNames, TdiceRoll } from "./Game";
import { anyMoveAvailable, setAllowedColumns, togglePlayer } from "./gameRules";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { Quadrant } from "./Points";
import Bar from "./Bar";
import Out from "./out";

type BoardProps = {
  currentBoardState: Color[][];
  onMove: (boardState: Color[][]) => void;
  currentDiceRoll: TdiceRoll;
  onRoll: (roll: TdiceRoll) => void;
  currentPlayer: string;
  onPlayerChange: (player: string) => void;
  selectedColumn: number;
  onColumnSelect: (column: number) => void;
  moveLeft: number;
  onMoveLeft: (allowed: number) => void;
  whiteBar: number;
  onWhiteBar: (counter: number) => void;
  blackBar: number;
  onBlackBar: (counter: number) => void;
  whiteOut: number;
  onWhiteOut: (counter: number) => void;
  blackOut: number;
  onBlackOut: (counter: number) => void;
  winner: string;
  onWinner: (winner: string) => void;
};
export function Board({
  currentBoardState,
  onMove,
  currentDiceRoll,
  onRoll,
  currentPlayer,
  onPlayerChange,
  selectedColumn,
  onColumnSelect,
  moveLeft,
  onMoveLeft,
  whiteBar,
  onWhiteBar,
  blackBar,
  onBlackBar,
  whiteOut,
  onWhiteOut,
  blackOut,
  onBlackOut,
  winner,
  onWinner,
}: BoardProps) {
  let allowedColumns: number[];
  let allowedChecker: string;
  if (PlayerNames.white[0] == currentPlayer) {
    allowedChecker = "White";
  } else {
    allowedChecker = "Black";
  }

  allowedColumns = setAllowedColumns(
    currentBoardState,
    currentDiceRoll,
    currentPlayer,
    selectedColumn
  );

  function handelDragStart(e: DragStartEvent) {
    const parent: string = e.active.data.current?.parent ?? "";
    let allowedColumns: number[] = [];
    let currentPoint = 0;

    if (parent == "Bar") {
      console.log("drag from bar");

      if (allowedChecker == "White") {
        currentPoint = -1;
      } else {
        currentPoint = 24;
      }
    } else {
      currentPoint = +parent.slice(parent.length - 2, parent.length) - 10;
    }
    onColumnSelect(currentPoint);
  }

  function handleDragEnd(e: DragEndEvent) {
    let newPlayer: string;
    if (!e.over) return;
    const target = e.over.id as string;
    if (typeof e.over.id !== "string") throw new Error("id is not string");
    if (typeof e.over.id !== "string") throw new Error("id is not string");
    const index = e.active.data.current?.index ?? 0;
    const parent = e.active.data.current?.parent ?? "";
    console.log("----handle-drag end----------");
    let oldCol: number = 0;
    let oldColColor: Color = "White";
    const newBoardState = currentBoardState;
    const newDiceRoll = currentDiceRoll;
    let newCol: number = 0;
    let newColColor;
    let newMoveLeft = moveLeft;
    let newWhiteBar = whiteBar;
    let newBlackBar = blackBar;
    let newWhiteOut = whiteOut;
    let newBlackOut = blackOut;
    let moveOut = false;

    //check if checker is from bar or not to determine old color
    if (parent == "Bar") {
      console.log("drag from bar");
      if (currentPlayer == PlayerNames.black[0]) {
        oldColColor = "Black";
      }
    } else {
      oldCol = parent.slice(6, 8) - 10;
      oldColColor = currentBoardState[oldCol][index];
    }

    //check if the move is a move out
    // if (allowedColumns.includes(100) || allowedColumns.includes(200)) {
    if (target == "whiteOut" && oldColColor == "White") {
      console.log("move out");
      moveOut = true;
      newBoardState[oldCol].pop();
      newWhiteOut = newWhiteOut + 1;
      newMoveLeft = newMoveLeft - 1;
    }

    if (target == "blackOut" && oldColColor == "Black") {
      console.log("move out");
      moveOut = true;
      newBoardState[oldCol].pop();
      newBlackOut = newBlackOut + 1;
      newMoveLeft = newMoveLeft - 1;
    }

    //if the move is not a move out
    //check if the target is a point
    if (moveOut == false) {
      if (target.slice(0, 6) == "Point-") {
        newCol = +target.slice(6, 8) - 10;
        newColColor = currentBoardState[newCol][0];
      } else {
        console.log("target is not a point");
        onColumnSelect(50); //reset the color of the allowed points
        return;
      }

      //if oldCol is the same as newcol return
      if (oldCol == newCol) {
        console.log("same column");
        onColumnSelect(50); //reset the color of the allowed points
        return;
      }
      //update states

      if (
        newCol + 10 != allowedColumns[0] &&
        newCol + 10 != allowedColumns[1]
      ) {
        console.log("This move is not not allowed");
        onColumnSelect(50); //reset the color of the allowed points
        return;
      } else {
        //a move is allowed
        //rule#3--if the move is a hit
        if (
          newBoardState[newCol].length == 1 && //if the target column has one checker it is a blot
          newBoardState[newCol][0] != oldColColor //if the checker is not the same color as the moving checker
        ) {
          if (newBoardState[newCol][0] == "White") {
            onWhiteBar(whiteBar + 1);
          } else {
            onBlackBar(blackBar + 1);
          }
          newBoardState[newCol].pop();
        }

        newBoardState[newCol].push(oldColColor);
        if (parent == "Bar") {
          if (currentPlayer == PlayerNames.black[0]) {
            newBlackBar = newBlackBar - 1;
            onBlackBar(newBlackBar);
          } else {
            newWhiteBar = newWhiteBar - 1;
            onWhiteBar(newWhiteBar);
          }
        } else {
          newBoardState[oldCol].pop();
        }
        newMoveLeft = newMoveLeft - 1;
      }
    }

    //rull--set dice state
    if (currentDiceRoll[0] != currentDiceRoll[1]) {
      //if the move is not a double
      let homePosition;
      if (allowedChecker == "White") {
        homePosition = 24 - selectedColumn;
      } else {
        homePosition = selectedColumn + 1;
      }
      if (target == "whiteOut" || target == "blackOut") {
        //it is a move out
        if ((homePosition = newDiceRoll[0])) {
          newDiceRoll[0] = 0;
        }
        if ((homePosition = newDiceRoll[1])) {
          newDiceRoll[1] = 0;
        }
      } else {
        //it is a board move
        if (newCol + 10 == allowedColumns[0]) {
          newDiceRoll[0] = 0;
        }
        if (newCol + 10 == allowedColumns[1]) {
          newDiceRoll[1] = 0;
        }
      }
    } else {
      //if the move is a double
      if (newMoveLeft == 0) {
        newDiceRoll[0] = 0;
        newDiceRoll[1] = 0;
      }
    }

    //******************check if no move is available */
    let moveAllowed = anyMoveAvailable(
      newBoardState,
      currentPlayer,
      newDiceRoll,
      newWhiteBar,
      newBlackBar
    );

    if (moveAllowed[0] === false && moveAllowed[1] === false) {
      newMoveLeft = 0;
    }

    if (newMoveLeft == 0) {
      //change player
      togglePlayer(currentPlayer, onPlayerChange);
    }

    onColumnSelect(50); //reset the color of the allowed points
    onWhiteOut(newWhiteOut);
    onBlackOut(newBlackOut);
    onMoveLeft(newMoveLeft);
    onMove(newBoardState);

    return;
  }

  let moveAllowed = anyMoveAvailable(
    currentBoardState,
    currentPlayer,
    currentDiceRoll,
    whiteBar,
    blackBar
  );

  return (
    <DndContext
      onDragStart={handelDragStart}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Out
        whiteOut={whiteOut}
        blackOut={blackOut}
        currentPlayer={currentPlayer}
        allowedColumns={allowedColumns}
      />

      <div className="board">
        <Quadrant
          boardState={currentBoardState}
          start={12}
          end={18}
          drction={"ltr"}
          allowedColumns={allowedColumns}
          currentPlayer={currentPlayer}
          moveAllowed={moveAllowed[0]}
        />
        <Quadrant
          boardState={currentBoardState}
          start={18}
          end={24}
          drction={"ltr"}
          allowedColumns={allowedColumns}
          currentPlayer={currentPlayer}
          moveAllowed={moveAllowed[0]}
          bar={blackBar}
        />
        <Quadrant
          boardState={currentBoardState}
          start={6}
          end={12}
          drction={"rtl"}
          allowedColumns={allowedColumns}
          currentPlayer={currentPlayer}
          moveAllowed={moveAllowed[0]}
        />
        <Quadrant
          boardState={currentBoardState}
          start={0}
          end={6}
          drction={"rtl"}
          allowedColumns={allowedColumns}
          currentPlayer={currentPlayer}
          moveAllowed={moveAllowed[0]}
          bar={whiteBar}
        />
      </div>
      <Bar
        whiteBar={whiteBar}
        blackBar={blackBar}
        currentPlayer={currentPlayer}
      />
    </DndContext>
  );
}
