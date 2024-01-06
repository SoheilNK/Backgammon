import { ErrorBoundary } from "react-error-boundary";
import PageClass from "../components/PageClass";
import { useLocalStorage } from "../services/useLocalStorage";
import { GameList } from "../services/GameService";
import OfflineGame from "./OfflineGame";

function Game() { 
  const [online, setOnline] = useLocalStorage("online", false);
  if (online === false) {
    //offline mode
    localStorage.setItem("started", JSON.stringify("yes"));
    return (
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <OfflineGame />
      </ErrorBoundary>
    );
  } else {
    return (
      //online mode
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <GameList />
      </ErrorBoundary>
    );
  }
}

const GamePage: React.FC = () => {
  return (
    <div id="Game" className="w-1/2">
      <PageClass inputComponent={Game} />
    </div>
  );
};

export default GamePage;
