"use client";

import { ErrorBoundary } from "react-error-boundary";
import GamePlay from "../components/GamePlay";
import PageClass from "../components/PageClass";
import { useLocalStorage } from "../services/useLocalStorage";
import { GameRoom } from "../components/GameRoom";

function Game() {
  const [online, setOnline] = useLocalStorage("online", false);
  if (online === false) {
    //offline mode
    return (
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        {" "}
        <GamePlay />
      </ErrorBoundary>
    );
  } else {
    return (
      //online mode
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <GameRoom />
      </ErrorBoundary>
    );
  }
}

const GamePage: React.FC = () => {
  return (
    <div className="w-1/2">
      <PageClass inputComponent={Game} />
    </div>
  );
};

export default GamePage;
