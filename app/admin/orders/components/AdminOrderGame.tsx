import { Game } from "@/models/gameModel"

interface AdminOrderGameType {
    item: Game,
    quantity: number
}

export default function AdminOrderGame({item, quantity}: AdminOrderGameType) {
    return <div className="flex mt-3">
        <img className="w-16 h-16" src={item.thumbnail}></img>
        <div className="flex items-center justify-between p-3 grow">
            <h3 className="grow text-base-red font-bold">{item.title}</h3>
            <p className="text-sm font-bold admin-order-quantity">x{quantity}</p>
        </div>
    </div>
}