'use client'

import { useState } from "react";

import ItemForm from "../../components/itemForm";
import { Game } from "@/models/gameModel";

import axios from 'axios';

interface AdminGameItemType {
    game: Game,
    clickFunction: (id: string, data: Game) => void,
    showButtons: boolean
}

export default function AdminGameItem({game, clickFunction, showButtons}: AdminGameItemType) {
    const [isEditing, setIsEditing] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    const handleDelete = async function() {
        try {
            await axios.delete(`https://board-backend-b9tn.onrender.com/games/game/delete/${game._id}`)   
        } catch (e: any) {
            if (e.response.status === 500) {
                setErrMessage(e.response.data)
            }
        }
    }

    return <div>
        {errMessage && <div className="admin-error">{errMessage}</div>}
    <div className="admin-list-item hover:drop-shadow-lg">
        <div className="w-24 h-24 overflow-hidden">
            <img className="admin-list-item-image" src={game.thumbnail}/>
        </div>
        <div className="flex flex-col p-2 grow justify-between">
            <div>
                <h3 className="admin-list-item-title">{game.title}</h3>
            </div>
            <div className="flex justify-between">
                <div className="flex items-end">
                    <p className="admin-list-item-quantity">qty:{game.quantity} <span className="admin-list-item-price">${game.price}</span></p>
                </div>
                {showButtons && <div>
                <button className="admin-button" onClick={()=>{setIsEditing(!isEditing)}}>Edit</button>
                <button className="admin-button" onClick={() => {handleDelete()}}>Del</button>
                </div>}
            </div>
        </div>
    </div>
    {isEditing && <div className="admin-list-edit-item">
        <ItemForm action={'Edit'} game={game} submitAction={(data) => {clickFunction(game._id, data)}}/>
    </div>}
    </div>
}