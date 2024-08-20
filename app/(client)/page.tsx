
import CategoryListView from "./components/categoryListView";
import MainCarousel from "./components/mainCarousel";
import axios from 'axios';

export default async function Home() {
    let carouselData, carouselError;
    let categoryData, categoryError;
    try {
      const meta = await axios.get(`https://board-backend-b9tn.onrender.com/meta/`);
      const gameData = await axios.post(
        `https://board-backend-b9tn.onrender.com/games/list`,
          {
            items: meta.data.data.carousel,
          }
      );
      carouselData = gameData.data.data;
    } catch (e) {
      if (e?.response?.status === 500) {
          carouselError = e.response.data;
      }
    }

    try {
      const data = await axios.get(`https://board-backend-b9tn.onrender.com/categories/`);
      categoryData = data.data.data;
    } catch (e) {
      console.log('we are in the error of category', e)
      if (e?.response?.status === 500) {
          categoryError = e.response.data;
      }
    }




  return (
    <main className="client-page">
    <MainCarousel data={carouselData} error={carouselError}/>
    <CategoryListView data={categoryData} error={categoryError} />
    </main>
  );
}
