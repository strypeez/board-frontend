import CategoryTable from '../../components/categoryTable';
import axios from 'axios';

export default async function CategoryPage({params}: { params: {slug:string}} ) {
    let categoryData, gamesData, error;
    try {
        const data = await axios.get(
            `https://board-backend-b9tn.onrender.com/categories/category/${params.slug}`
        );
        categoryData = data.data.data;
        const gameData = await axios.post(
            `https://board-backend-b9tn.onrender.com/games/list`,
            {
                items: data.data.data.items,
            }
            );
        gamesData = gameData.data.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 500) {
                error = e.response.data;
            }
        }
    }
        
    return <CategoryTable categoryData={categoryData} gamesData={gamesData} error={error}/>
}