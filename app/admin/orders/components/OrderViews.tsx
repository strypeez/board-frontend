'use client'

import { useState, useEffect } from "react"
import AdminOrder from "./AdminOrder";

import { Order } from "@/models/orderModel";
import { Game } from "@/models/gameModel";
import io from 'socket.io-client';

import axios from "axios";

interface OrdersViewsPage {
    orderData: Order[]
    gamesData: {[key: string]: Game} | undefined
    orderError: string
}

export default function OrdersViewsPage({ orderData, gamesData, orderError}: OrdersViewsPage) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [games, setGames] = useState<{[key: string]: Game}>({});
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        setOrders(orderData);
        setGames(gamesData || {});
        setErrMessage(orderError);
    }, [orderData, gamesData, orderError])

useEffect(() => {
    const socket = io(`https://board-backend-b9tn.onrender.com`);
    socket.on('NEW_ORDER', async (data) => {
        try {
            const newData = await axios.get(`https://board-backend-b9tn.onrender.com/orders/`)
            setOrders(newData.data.data)
        } catch (e) {
            if (axios.isAxiosError(e)) {
            if (e.response?.status === 500) {
                setErrMessage(e.response.data)
            }
            }
        }
    })

    return () => {
        socket.off('disconnect');
        socket.disconnect();
    }
}, [])

    return <div className="admin-page">
        <h1 className="admin-title">Orders</h1>
        {errMessage && <div className="admin-error">{errMessage}</div>}
        { orders.map((order) => {
            return <AdminOrder games={games} order={order} key={order._id} />
        })}
    </div>
}