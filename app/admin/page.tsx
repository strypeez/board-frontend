import GameDashboard from './components/gameDashboard';
import CategoryDashboard from './components/categoryDashboard';
import OrderDashboard from './components/orderDashboard';

import axios from 'axios';
import { Game } from '@/models/gameModel';
import { Order } from '@/models/orderModel';

export default async function Admin() {

  let gameDashData, gameError;
  let catDashData, catError;
  let orderDashData, orderError, orderGamesData;

  try {
    const gameData = await axios.get(`https://board-backend-b9tn.onrender.com/games`)
    gameDashData = gameData.data.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 500) {
        gameError = e.response.data;
      }
    }
  } 

  try {
    const data = await axios.get(`https://board-backend-b9tn.onrender.com/categories/`);
    catDashData = data.data.data;
} catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 500) {
          catError = e.response.data;
      }
    }
}

try {
  const newData = await axios.get(`https://board-backend-b9tn.onrender.com/orders/`)
  orderDashData = newData.data.data;
  const setOfGames: Set<string> = orderDashData.reduce((list: Set<string>, current:Order) => {
    const cartGames = current.cart;
    cartGames.forEach((game) => {
        list.add(game.item)
    });
    return list;
}, new Set<string>());

const orderGameData = await axios.post(`https://board-backend-b9tn.onrender.com/games/list`, {
  items: Array.from(setOfGames),
});

const gameMap: {
  [key: string]: Game
} = {};

orderGameData.data.data.forEach((item: Game) => {
  gameMap[item._id] = item;
})

orderGamesData = gameMap;

} catch(e) {
  if (axios.isAxiosError(e)) {
    if (e.response?.status === 500) {
        orderError = e.response.data;
    }
  }
}

    return (
      <main className="admin-page">
        <h1 className='admin-title'>Dashboard</h1>
      <GameDashboard gameDashData={gameDashData} gameError={gameError}/>
        <CategoryDashboard catDashData={catDashData} catError={catError}/>
        <OrderDashboard orderDashData={orderDashData} orderError={orderError} orderGamesData={orderGamesData}/>
      </main>
    );
  }
  