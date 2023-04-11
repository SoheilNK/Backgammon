import { Color, TdiceRoll, PlayerNames } from "./Game";

//define a function to return a boolean value if any move is available or not
export function anyMoveAvailable(
  currentBoardState: Color[][],
  currentPlayer: string,
    currentDiceRoll: TdiceRoll,
    whiteBar: number,
    blackBar: number
) {
  let allowedChecker: string;
  let blockedChecker: string;
  let direction: number = +1 || -1;
  let move1: number = 0;
  let move2: number = 0;
  let barCounter: number = 0;
  let enteryPoint: number = 0;

  if (PlayerNames.white[0] == currentPlayer) {
    allowedChecker = "White";
    blockedChecker = "Black";
    direction = +1;
    barCounter = whiteBar;
    enteryPoint = -1; //white checkers can enter from 0 to 5
  } else {
    allowedChecker = "Black";
    blockedChecker = "White";
    direction = -1;
    barCounter = blackBar;
    enteryPoint = 24; //black checkers can enter from 18 to 23
  }

  let moveAvailable = [false, false]; //for [movefromboard, movefrombar]
  if (
    currentDiceRoll[0] == 0 &&
    currentDiceRoll[1] == 0 //check if any move is available from the board
  ) {
    moveAvailable[0] = false;
  } else {
    if (barCounter > 0) {
      moveAvailable[0] = false; //no move is allowed from the board if there is a checker on the bar
      //check if any move is available from the bar
      let target1 = enteryPoint + currentDiceRoll[0] * direction;
      let target2 = enteryPoint + currentDiceRoll[1] * direction;
      let target1Length = currentBoardState[target1].length;
      let target1Color = currentBoardState[target1][0];
      let target2Length = currentBoardState[target2].length;
      let target2Color = currentBoardState[target2][0];

      if (
        target1Length >= 2 &&
        target1Color == blockedChecker &&
        target2Length >= 2 &&
        target2Color == blockedChecker
      ) {
        moveAvailable[1] = false;
      } else {
        moveAvailable[1] = true;
      }
    } else {
      //check if any move is available from the board
      for (let index = 0; index < currentBoardState.length; index++) {
        let col = currentBoardState[index];

        if (col.length > 0 && col[0] == allowedChecker) {
          //if the column has checkers and the first checker is allowed checker
          //find allowed moves for corrent column

          move1 = index + currentDiceRoll[0] * direction;
          move2 = index + currentDiceRoll[1] * direction;

          //rule#1
          //check if the target is less that 23 and free or same color and no double opponent checker

          if (move1 > 23 || move1 < 0 || currentDiceRoll[0] == 0) {
            moveAvailable[0] = false;
          } else {
            let move1Length = currentBoardState[move1].length;
            let move1Color = currentBoardState[move1][0];
            if (move1Length >= 2 && move1Color == blockedChecker) {
              // console.log("can't move");
              moveAvailable[0] = false;
            } else {
              moveAvailable[0] = true;
              break;
            }
          }

          if (move2 > 23 || move2 < 0 || currentDiceRoll[1] == 0) {
            moveAvailable[0] = false;
          } else {
            let target2Length = currentBoardState[move2].length;
            let target2Color = currentBoardState[move2][0];
            if (target2Length >= 2 && target2Color == blockedChecker) {
              moveAvailable[0] = false;
            } else {
              moveAvailable[0] = true;
              break;
            }
          }
        } else {
          moveAvailable[0] = false;
        }
      }
    }
  }
  console.log(" anyMovesAvailable >>>" + moveAvailable + "<<<");
  return moveAvailable;
}

export function setAllowedColumns(
  currentBoardState: Color[][],
  currentDiceRoll: TdiceRoll,
  currentPlayer: string,
  selectedColumn: number
) {
  let allowedColumns: number[] = [];
  let allowedChecker: string;
  let blockedChecker: string;
  let direction: number = +1 || -1;
  if (PlayerNames.white[0] == currentPlayer) {
    allowedChecker = "White";
    blockedChecker = "Black";
    direction = +1;
  } else {
    allowedChecker = "Black";
    blockedChecker = "White";
    direction = -1;
  }

  //find allowed columns from selected column
  //check if the selected checker is from bar or not

  let target1 = selectedColumn + currentDiceRoll[0] * direction;
  let target2 = selectedColumn + currentDiceRoll[1] * direction;

  //rule#1
  //check if the target is less that 23 and same color or not double opponent checker
  if (target1 > 23 || target1 < 0) {
    target1 = 0;
  } else {
    let target1Length = currentBoardState[target1].length;
    let target1Color = currentBoardState[target1][0];
    if (target1Length >= 2 && target1Color == blockedChecker) {
      // console.log("can't move");
      target1 = 0;
    } else {
      target1 = target1 + 10;
    }
  }

  if (target2 > 23 || target2 < 0) {
    target2 = 0;
  } else {
    let target2Length = currentBoardState[target2].length;
    let target2Color = currentBoardState[target2][0];
    if (target2Length >= 2 && target2Color == blockedChecker) {
      target2 = 0;
    } else {
      target2 = target2 + 10;
    }
  }
  console.log("target1>>>" + target1);
  console.log("target2>>>" + target2);

  return (allowedColumns = [target1, target2]);
}

export function togglePlayer(
  currentPlayer: string,
  onPlayerChange: (player: string) => void,
  onMessage: (message: string) => void
) {
  let newPlayer: string;
  if (currentPlayer == PlayerNames.white[0]) {
    newPlayer = PlayerNames.black[0];
  } else {
    newPlayer = PlayerNames.white[0];
  }
  onPlayerChange(newPlayer);
  onMessage(newPlayer + " roll the dice");
  return;
}

