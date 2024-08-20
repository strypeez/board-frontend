
import axios from "axios";
import ItemList from "./components/itemList";

export default async function AdminItemPage() {
    let gamesData, gamesError;
    try {
        const gameData = await axios.get(`https://board-backend-b9tn.onrender.com/games`)
        gamesData = gameData.data.data;
    } catch(e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 500) {
            gamesError = e.response.data;
            }
        }
    }


    return <ItemList gameData={gamesData} gamesError={gamesError}/>
}