import { Color, TdiceRoll, PlayerNames } from "./GamePlay";

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
  let barCounter: number = 0;
  let enteryPoint: number = 0;
  let homeCheckStart: number = 0;
  let homeStart: number = 0;
  let moveAvailable = [false, false]; //for [movefromboard, movefrombar]
  let allCheckersAtHome = true;
  let target1;
  let target1Length;
  let target1Color;
  let target2;
  let target2Length;
  let target2Color;

  if (PlayerNames.white[0] == currentPlayer) {
    allowedChecker = "White";
    blockedChecker = "Black";
    direction = +1;
    barCounter = whiteBar;
    enteryPoint = -1; //white checkers can enter from 0 to 5
    homeCheckStart = 0;
    homeStart = 24;
  } else {
    allowedChecker = "Black";
    blockedChecker = "White";
    direction = -1;
    barCounter = blackBar;
    enteryPoint = 24; //black checkers can enter from 18 to 23
    homeCheckStart = 23;
    homeStart = -1;
  }

  //check if all the checkers are at home
  allCheckersAtHome = isAllCheckersAtHome(
    homeCheckStart,
    direction,
    currentBoardState,
    allowedChecker,
    allCheckersAtHome,
    barCounter
  );
  console.log("allCheckersAtHome", allCheckersAtHome);
  //--------------------------------------------------------------

  //check if any move is available from the board or the bar

  if (currentDiceRoll[0] == 0 && currentDiceRoll[1] == 0) {
    moveAvailable[0] = false;
  } else {
    if (barCounter > 0) {
      //no move is allowed from the board if there is a checker on the bar
      moveAvailable[0] = false;
      //check if any move is available from the bar

      if (currentDiceRoll[0] == 0) {
        moveAvailable[1] = false;
        //check targhet2
      } else {
        //deal with target1
        target1 = enteryPoint + currentDiceRoll[0] * direction;
        target1Length = currentBoardState[target1].length;
        target1Color = currentBoardState[target1][0];
        if (target1Length >= 2 && target1Color == blockedChecker) {
          moveAvailable[1] = false;
        } else {
          moveAvailable[1] = true;
        }
      }
      if (!moveAvailable[1]) {
        if (currentDiceRoll[1] == 0) {
          //deal with target2
          moveAvailable[1] = false;
        } else {
          //deal with target2
          target2 = enteryPoint + currentDiceRoll[1] * direction;
          target2Length = currentBoardState[target2].length;
          target2Color = currentBoardState[target2][0];
          if (target2Length >= 2 && target2Color == blockedChecker) {
            moveAvailable[1] = false;
          } else {
            moveAvailable[1] = true;
          }
        }
      }
    } else {
      //check if any move is available from the board
      for (let index = 0; index < currentBoardState.length; index++) {
        let col = currentBoardState[index];

        if (col.length > 0 && col[0] == allowedChecker) {
          //if the column has checkers and the first checker is allowed checker
          //find allowed moves for corrent column

          target1 = index + currentDiceRoll[0] * direction;
          target2 = index + currentDiceRoll[1] * direction;

          //rule#1
          //check if the target is less that 23 and free or same color and
          //no double opponent checker

          if (target1 > 23 || target1 < 0 || currentDiceRoll[0] == 0) {
            // moveAvailable[0] = false;
          } else {
            target1Length = currentBoardState[target1].length;
            target1Color = currentBoardState[target1][0];
            if (target1Length >= 2 && target1Color == blockedChecker) {
              // console.log("can't move");
              // moveAvailable[0] = false;
            } else {
              moveAvailable[0] = true;
              break;
            }
          }

          if (target2 > 23 || target2 < 0 || currentDiceRoll[1] == 0) {
            // moveAvailable[0] = false;
          } else {
            target2Length = currentBoardState[target2].length;
            target2Color = currentBoardState[target2][0];
            if (target2Length >= 2 && target2Color == blockedChecker) {
              // moveAvailable[0] = false;
            } else {
              moveAvailable[0] = true;
              break;
            }
          }
        } else {
          // moveAvailable[0] = false;
        }
      }
      if (allCheckersAtHome) {
        //check if any moveout is available from home
        //rule for moving out If the roll of the dice is higher than
        //all of the home positions, the checkers in the highest position can move out

        if (currentDiceRoll[0] !== 0) {
          //deal with position1
          target1 = homeStart - currentDiceRoll[0] * direction;
          target1Color = currentBoardState[target1][0];
          if (target1Color == allowedChecker || currentDiceRoll[0] == 6) {
            //when current dic roll is 6,
            //it means that it is the highest position and
            //there is no higher position to check
            moveAvailable[0] = true;
          } else {
            //check higher positions
            for (let i = currentDiceRoll[0] + 1; i < 7; i++) {
              target1 = homeStart - i * direction;
              target1Color = currentBoardState[target1][0];
              if (target1Color !== allowedChecker) {
                moveAvailable[0] = true;
              }
            }
          }
        }
        if (currentDiceRoll[1] !== 0) {
          //deal with target2
          target2 = homeStart - currentDiceRoll[1] * direction;
          target2Color = currentBoardState[target2][0];
          if (target2Color == allowedChecker || currentDiceRoll[1] == 6) {
            //when current dic roll is 6,
            //it means that it is the highest position and
            //there is no higher position to check
            moveAvailable[0] = true;
          } else {
            //check higher positions
            for (let i = currentDiceRoll[1] + 1; i < 7; i++) {
              target2 = homeStart - i * direction;
              target2Color = currentBoardState[target2][0];
              if (target2Color !== allowedChecker) {
                moveAvailable[0] = true;
              }
            }
          }
        }

        console.log("moveout Available from home", moveAvailable[0]);
      }
    }
  }

  console.log(" anyMovesAvailable >>>" + moveAvailable + "<<<");
  return moveAvailable;
}

function isAllCheckersAtHome(
  homeCheckStart: number,
  direction: number,
  currentBoardState: Color[][],
  allowedChecker: string,
  allCheckersAtHome: boolean,
  barCounter: number
) {
  for (let i = 0; 18 > i; i++) {
    let index = homeCheckStart + i * direction;
    let col = currentBoardState[index];
    let colLength = col.length;
    if (colLength > 0) {
      if (col[0] == allowedChecker) {
        allCheckersAtHome = false;
        break;
      }
    }
  }
  if (barCounter > 0) {
    allCheckersAtHome = false;
  }
  return allCheckersAtHome;
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
  let barCounter: number = 0;
  let enteryPoint: number = 0;
  let homeCheckStart: number = 0;
  let homeStart: number = 0;
  let allCheckersAtHome = true;
  let target1;
  let target1Length;
  let target1Color;
  let target2;
  let target2Length;
  let target2Color;
  let target1Board;
  let target2Board;
  let target1Home;
  let target2Home;

  if (selectedColumn == 50) {
    //reset the selections
    return allowedColumns;
  }

  if (PlayerNames.white[0] == currentPlayer) {
    allowedChecker = "White";
    blockedChecker = "Black";
    direction = +1;
    enteryPoint = -1; //white checkers can enter from 0 to 5
    homeCheckStart = 0;
    homeStart = 24;
  } else {
    allowedChecker = "Black";
    blockedChecker = "White";
    direction = -1;
    enteryPoint = 24; //black checkers can enter from 18 to 23
    homeCheckStart = 23;
    homeStart = -1;
  }

  //find allowed columns from selected column
  //check if the selected checker is from bar or not

  target1 = selectedColumn + currentDiceRoll[0] * direction;
  target2 = selectedColumn + currentDiceRoll[1] * direction;

  //rule#1
  //check if the target is less than 23 and same color or
  // not blocked with 2 or more opponent checkers
  if (
    target1 > 23 ||
    target1 < 0 ||
    (currentDiceRoll[0] == 0 && currentDiceRoll[1] == 0)
  ) {
    target1 = 0;
  } else {
    target1Length = currentBoardState[target1].length;
    target1Color = currentBoardState[target1][0];
    if (target1Length >= 2 && target1Color == blockedChecker) {
      // console.log("can't move");
      target1 = 0;
    } else {
      target1 = target1 + 10;
    }
  }

  if (
    target2 > 23 ||
    target2 < 0 ||
    (currentDiceRoll[0] == 0 && currentDiceRoll[1] == 0)
  ) {
    target2 = 0;
  } else {
    target2Length = currentBoardState[target2].length;
    target2Color = currentBoardState[target2][0];
    if (target2Length >= 2 && target2Color == blockedChecker) {
      target2 = 0;
    } else {
      target2 = target2 + 10;
    }
  }
  target1Board = target1;
  target2Board = target2;
  console.log("from board target1>>>" + target1Board);
  console.log("from board target2>>>" + target2Board);

  //check if the checker can go out from home
  target1 = 0;
  target2 = 0;
  target1Home = 0;
  target2Home = 0;
  allCheckersAtHome = isAllCheckersAtHome(
    homeCheckStart,
    direction,
    currentBoardState,
    allowedChecker,
    allCheckersAtHome,
    barCounter
  );
  if (allCheckersAtHome) {
    //check if any move out is available from home
    let homePosition; //position of the selected checker in home
    if (allowedChecker == "White") {
      homePosition = 24 - selectedColumn;
    } else {
      homePosition = selectedColumn + 1;
    }

    if (currentDiceRoll[0] !== 0) {
      //deal with dice roll 0
      //if selected checker's column equals to current dice roll
      //it can move out
      if (homePosition == currentDiceRoll[0]) {
        target1 = allowedChecker == "White" ? 100 : 200;
      } else {
        //check higher positions
        //check if there is any allowed checker in higher positions
        if (homePosition < currentDiceRoll[0]) {
          for (let i = homePosition + 1; i < 7; i++) {
            target1 = homeStart - i * direction;
            target1Color = currentBoardState[target1][0];
            if (target1Color == allowedChecker) {
              target1 = 0;
              break;
            } else {
              target1 = allowedChecker == "White" ? 100 : 200;
            }
          }
        } else {
          target1 = 0;
        }
      }
    }
    if (currentDiceRoll[1] !== 0) {
      //deal with target2
      if (homePosition == currentDiceRoll[1]) {
        target2 = allowedChecker == "White" ? 100 : 200;
      } else {
        //check higher positions
        //check if there is any allowed checker in higher positions
        if (homePosition < currentDiceRoll[1]) {
          for (let i = homePosition + 1; i < 7; i++) {
            target2 = homeStart - i * direction;
            target2Color = currentBoardState[target2][0];
            if (target2Color == allowedChecker) {
              target2 = 0;
              break;
            } else {
              target2 = allowedChecker == "White" ? 100 : 200;
            }
          }
        } else {
          target2 = 0;
        }
      }
    }
    target1Home = target1;
    target2Home = target2;
  }
  console.log("from home target1>>>" + target1Home);
  console.log("from home target2>>>" + target2Home);

  target1 = target1Board + target1Home;
  target2 = target2Board + target2Home;

  console.log("target1>>>" + target1);
  console.log("target2>>>" + target2);
  //100 for whiteOut and 200 for blackOut
  return (allowedColumns = [target1, target2]);
}

export function togglePlayer(
  currentPlayer: string,
  onPlayerChange: (player: string) => void
) {
  let newPlayer: string;
  if (currentPlayer == PlayerNames.white[0]) {
    newPlayer = PlayerNames.black[0];
  } else {
    newPlayer = PlayerNames.white[0];
  }
  onPlayerChange(newPlayer);
  return;
}
