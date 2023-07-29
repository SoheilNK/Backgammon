import PageClass from "../components/PageClass";


function OnlineGame() {
  const url =
    "http://localhost:5173/Backgammon#/onlinegame?matchID=1690659596342";

  // Create a URL object with the given URL
  const urlObj = new URL(url);

  // Get the searchParams object from the URL
  const searchParams = urlObj.searchParams;

  // Retrieve the matchID parameter
  const matchId = searchParams.get("matchID");

  console.log(matchId); // Output: 1690659596342

    
    
//   const searchParams = new URL(location.href).searchParams;
//   const matchId = searchParams.get("matchId");
//   console.log(matchId);

  if (matchId !== null) {
    window.history.replaceState({}, document.title, "/Backgammon/");
    console.log(matchId);
  }

  return (
    <div>
      <div className="container m-auto p-1">
        <div className="  bg-white relative  rounded-md p-8 m-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
          <div></div>
          <h1>Online game with matchID ${matchId}</h1>
        </div>
      </div>
    </div>
  );
}

const OnlineGamePage: React.FC = () => {
  return <PageClass inputComponent={OnlineGame} />;
};
export default OnlineGamePage;
