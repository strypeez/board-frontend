import { Game } from "@/models/gameModel";
import OrdersViewsPage from "./components/OrderViews";

import axios from "axios";
import { Order } from "@/models/orderModel";

import { CartItem } from "@/app/(client)/cart/page";

export default async function OrdersPage() {
    let orderData, orderError, gamesData;
    try {
        const newData = await axios.get(`https://board-backend-b9tn.onrender.com/orders/`)
        orderData = newData.data.data;
        const setOfGames: Set<string> = orderData.reduce((list: Set<string>, current: Order) => {
            const cartGames = current.cart;
            cartGames.forEach((game) => {
                list.add(game.item)
            });
            return list;
        }, new Set<string>());

        const gameData = await axios.post(`https://board-backend-b9tn.onrender.com/games/list`, {
            items: Array.from(setOfGames),
        });

        const gameMap: {
            [key: string]: Game
        } = {};
        gameData.data.data.forEach((item: Game) => {
            gameMap[item._id] = item;
        })

        gamesData = gameMap;

    } catch (e) {
        if (axios.isAxiosError(e)) {
        if (e.response?.status === 500) {
            orderError = e.response.data;
        }
        }
    }

    return <OrdersViewsPage orderData={orderData} gamesData={gamesData} orderError={orderError} />
}