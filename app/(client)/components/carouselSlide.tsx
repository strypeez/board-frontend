import Link from "next/link"

import { Game } from "@/models/gameModel"

interface CarouselSlide {
    game: Game
}

export default function CarouselSlide({game}: CarouselSlide) {
    return <Link href={`/item/${game._id}`}>
        <div className="relative h-full">
        <img className="object-cover h-full w-full" src={game.image}></img>
        <div className="p-5 absolute h-32 w-full bg-shadow/75 bottom-0 left-0">
            <h1 className="text-3xl font-bold text-white">{game.title}</h1>
        </div>
    </div>
    </Link>
}