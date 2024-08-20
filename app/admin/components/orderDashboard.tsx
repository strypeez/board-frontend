'use client'

import { useEffect, useState } from "react";
import AdminOrder from "../orders/components/AdminOrder";
import Link from "next/link";

export default function OrderDashboard({orderDashData, orderError, orderGamesData}) {

    const [orders, setOrders] = useState([])
    const [games, setGames] = useState<{[key: string]: Game}>({});
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        setOrders(orderDashData);
        setErrMessage(orderError);
        setGames(orderGamesData);
    }, [orderDashData, orderError, orderGamesData])

    return <div>
        <div className="admin-dashboard-header">
            <h2>Orders</h2>
            <Link href="/admin/orders">
                <p>See More</p>
            </Link>
        </div>
        <div className="admin-dashboard-body">
        {errMessage && <div className="admin-error">{errMessage}</div>}
        { orders.map((order) => {
            return <AdminOrder games={games} order={order} key={order._id} />
        }).slice(0, 3)}
        </div>        
    </div>
}