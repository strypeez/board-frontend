'use client'

import { useEffect, useState } from "react";
import axios from 'axios';
import AdminGameItem from "../items/components/adminItem";
import Link from "next/link";
import { Game } from "@/models/gameModel";

interface GameDashboardProps {
    gameDashData: Game[]
    gameError: string
}

export default function GameDashboard({gameDashData, gameError}: GameDashboardProps) {

    const [games, setGames] = useState<Game[]>([]);
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        setGames(gameDashData);
        setErrMessage(gameError);
    }, [gameDashData, gameError])
    
    const handleUpdate = async function(id: String, item: Game) {
        try {
            await axios.put(`https://board-backend-b9tn.onrender.com/games/game/update/${id}`, {
                params: {
                    ...item
                }
            })
    
            window.location.reload();
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 500) {
                    setErrMessage(e.response.data);
                }
            }
        }
    }

    return <div>
        <div className="admin-dashboard-header">
            {errMessage && <div className="admin-error">{errMessage}</div>}
            <h2>Items</h2>
            <Link href="/admin/items">
                <p>See More</p>
            </Link>
        </div>
        <div className="admin-dashboard-body">
            {games.map((game) => {
                return <AdminGameItem showButtons={true} key={game._id} game={game} clickFunction={(id, item) => {handleUpdate(id, item)}}/>
            }).slice(0, 3)}
        </div>        
    </div>
}