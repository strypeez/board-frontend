import { Game } from "@/models/gameModel"

interface CategoryGameType {
    item: Game
}

export default function CategoryGame({item}: CategoryGameType) {
    return <div className="border border-black p-3">
        <h2 className="text-xl font-bold">{item.title}</h2>
    </div>
}