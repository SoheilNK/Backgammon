import axios from "axios";
import { getAccessToken } from "../services/user.service";

//call the api to get the list of online games
export const getOnlineGames = async () => {
    const token = await getAccessToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const { data } = await axios.get("http://localhost:8000/api/games", config);
    return data;
}

//create a component for online users to create a game room and join a game room
export function GameRoom() {
    //get the list of online games
    const [games, setGames] = useState([]);
    useEffect(() => {
        const getGames = async () => {
            const games = await getOnlineGames();
            setGames(games);
        }
        getGames();
    }
        , []);
    

}

