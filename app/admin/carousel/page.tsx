import CarouselView from './components/carouselView';

import axios from 'axios';

export default async function Carousel() {
    let gamesData, gameError;
    let carouselData, carouselError;

    try {
        const data = await axios.get(`https://board-backend-b9tn.onrender.com/meta/`);
        carouselData = data.data.data.carousel;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 500) {
                carouselError = e.response.data;
            }
        }
    }
        
    try {
        const gameData = await axios.get(
            `https://board-backend-b9tn.onrender.com/games`
        );
        
        gamesData = gameData.data.data;
    } catch(e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 500) {
                gameError = e.response.data;
            }
        }
    }

    return <CarouselView carouselData={carouselData} carouselError={carouselError} gamesData={gamesData} gameError={gameError} />
}