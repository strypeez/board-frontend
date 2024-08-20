'use client'

import { Game } from "@/models/gameModel";
import { useState } from "react";
import axios from 'axios';

interface GameItemType {
    game: Game,
    clickFunction: (id: string) => void
}

export default function GameItem({game, clickFunction}: GameItemType) {
    const [errMessage, setErrMessage] = useState('');
    const handleDelete = async function() {
        try {
            await axios.delete(`https://board-backend-b9tn.onrender.com/games/game/delete/${game._id}`);
            return {message: 'test'}
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 500) {
                    setErrMessage(e.response.data);
                }
            }
        }
    }
    return <div onClick={() => {
        clickFunction(game._id);
    }} className="flex m-5 border border-black p-5 space-x-0 justify-between">
        {errMessage && <div className="admin-error">{errMessage}</div>}
        <p>{game._id}</p>
        <div>
            <h3 className="text-lg font-bold">{game.title}</h3>
        </div>
        <div className="flex">
            <p className='mr-2'>${game.price}</p>
            <p><span>qty: </span>{game.quantity}</p>
        </div>
        <button onClick={()=> {handleDelete()}}>Del</button>
    </div>
}