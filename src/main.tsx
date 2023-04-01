import React from 'react'
import ReactDOM from 'react-dom/client'
import Game, { PlayerNames } from './Game'
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Game
      currentDiceRoll={[3, 4]}
      currentBoardState={[]}
      currentPlayer={PlayerNames.white}
      playerWon={false}
    />
  </React.StrictMode>
);

