
import AdminOrderGame from "./AdminOrderGame"
import { useState } from "react"
import { Order } from "@/models/orderModel";
import { Game } from "@/models/gameModel";
import axios from 'axios';

export interface AdminCartType {
    item: string,
    quantity: number,
    oldQuantity: number
}

interface AdminOrderType {
    order: Order,
    games: {
        [key: string]: Game
    }
}

export default function AdminOrder({
    order, games
}: AdminOrderType) {
    const [showItems, setShowItems] = useState(false);
    const [errMessage, setErrMessage] = useState('')

    const handleCancel = async function() {
        const newCart = order.cart.map((item) => {
            return {
                ...item,
                oldQuantity: games[item.item].quantity
            }
        })

        try {
            await axios.put(`https://board-backend-b9tn.onrender.com/orders/order/cancel/${order._id}`, {
                cart: newCart,
                newOrder: {...order, state: 'Cancelled'}
            });
        } catch (e) {
            if (e.response.status === 500) {
                setErrMessage(e.response.data)
            }
        }
    }

    const handleUpdate = async function(newOrder: Order) {
        try {
            await axios.put(`https://board-backend-b9tn.onrender.com/orders/order/${order._id}`, {
                newOrder
            })
        } catch (e) {
            if (e.response.status === 500) {
                setErrMessage(e.response.data)
            }
        }
    }

    return <div>
         {errMessage && <div className="admin-error">{errMessage}</div>}
        <div className="admin-order hover:drop-shadow-lg">
        
            <div onClick={()=>{
            setShowItems(!showItems);
        }} >
                <div className="admin-order-title">Order No.</div>
                <div className="admin-order-number"> {order._id}</div>
            </div>
            <div>
                <div className="admin-order-state">Order State</div>
                <select className="admin-order-state-select" disabled={order.state === 'Cancelled'} onChange={(e) => {
                    if (e.target.value === 'Cancelled') {
                        handleCancel();
                    } else {
                    handleUpdate({
                        ...order,
                        state: e.target.value 
                    })}
                }} defaultValue={order.state}>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Fulfilled">Fulfilled</option>
                </select>
            </div>
        </div>
        {showItems && <div className="admin-order-items">
            <h2 className="admin-order-title font-bold">Order Items</h2>
            <div>
                {order.cart.map((cart) => {
                return <AdminOrderGame key={cart.item} quantity={cart.quantity} item={games[cart.item]}/>
                })}
            </div>
        </div>}
    </div>
}