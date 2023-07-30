import PageClass from "../components/PageClass";
import { useSearchParams } from "react-router-dom";

function OnlineGame() {
//   const url =
//     "http://localhost:5173/Backgammon#/onlinegame/?matchID=1690659596342";

//   // Create a URL object with the given URL
//   const urlObj = new URL(url);

//   // Get the searchParams object from the URL
//   const searchParams = urlObj.searchParams;

//   // Retrieve the matchID parameter
//   const matchID = searchParams.get("matchID");

//   console.log(matchID); // Output: 1690659596342
    const [searchParams, setSearchParams] = useSearchParams();
    
//   const searchParams = new URL(location.href).searchParams;
  const matchID = searchParams.get("matchID");
  console.log(matchID);

  if (matchID !== null) {
    window.history.replaceState({}, document.title, "/Backgammon/");
    console.log(matchID);
  }

  return (
    <div>
      <div className="container m-auto p-1">
        <div className="  bg-white relative  rounded-md p-8 m-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
          <div></div>
          <h1>Online game with matchID ${matchID}</h1>
        </div>
      </div>
    </div>
  );
}

const OnlineGamePage: React.FC = () => {
  return <PageClass inputComponent={OnlineGame} />;
};
export default OnlineGamePage;
