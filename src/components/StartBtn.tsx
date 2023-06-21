import { useLocalStorage } from "../services/useLocalStorage";
import { useNavigate } from "react-router-dom";

export const StartBtn = () => {
  const [player1, setPlayer1] = useLocalStorage("player1", "");
  const [player2, setPlayer2] = useLocalStorage("player2", "");
  const navigate = useNavigate();

  return (
    <button
      disabled={!player1 || !player2}
      className="bg-blue-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200"
      onClick={() => {
        var p1 = player1;
        var p2 = player2;
        localStorage.clear();

        localStorage.setItem("player1", JSON.stringify(p1));
        localStorage.setItem("player2", JSON.stringify(p2));

        localStorage.setItem("started", JSON.stringify("yes"));

        navigate("/Game");
      }}
    >
      Start the Game!
    </button>
  );
};
