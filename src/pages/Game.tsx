"use client";

import { ErrorBoundary } from "react-error-boundary";
import GamePlay from "../components/GamePlay";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import PageClass from "../components/PageClass";

function Game() {

  return (
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              {" "}
              <GamePlay />
            </ErrorBoundary>
  );
}

const GamePage: React.FC = () => {
  return (
    <div className="w-1/2">
      <PageClass inputComponent={Game} />
    </div>
  );
};

export default GamePage;
