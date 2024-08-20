import axios from 'axios';
import ItemTable from '../../components/itemTable';

export default  async function ItemPage({params}: { params: {slug:string}} ) {

    let gameData, gameError;

    try {
        const data = await axios.get(
            `https://board-backend-b9tn.onrender.com/games/game/${params.slug}`
        );
        gameData = data.data.data;
    } catch (e) {
        if (e.response.status === 500) {
            gameError = e.response.data;
        }
    }


    return <ItemTable data={gameData} error={gameError} />
}