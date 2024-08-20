import { Game } from "@/models/gameModel"
import { ChangeEvent } from "react";

interface CartItemProps {
    updateFunction: (id: string, quantity: number) => void,
    deleteFunction: (id: string) => void,
    item: Game,
    quantity: number
}

export default function CartItem({updateFunction, deleteFunction, item, quantity}: CartItemProps) {
    return <div className="cart-item">
        <img className="cart-item-image" src={item.thumbnail}></img>
        <div className="cart-item-details">
        <p className="cart-item-title">{item.title}</p>
        <p className="cart-item-price">${item.price}</p>
        <div className="cart-item-controls">
        <input onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateFunction(item._id, parseInt(e.target.value));
        }} className="h-8 w-14 p-2 border-b border-black" min="0" max={item.quantity} type="number" defaultValue={quantity}/>
        <div onClick={() => {
            deleteFunction(item._id);
        }} className="client-button ml-3">Del</div>
        </div>
        </div>
    </div>
}