'use client'

import { useState, useEffect } from 'react';
import AdminGameItem from './adminItem';
import io from 'socket.io-client';

import { Game } from "@/models/gameModel";
import axios from "axios";

import Link from 'next/link';

interface ItemListProps {
    gameData: Game[]
    gamesError: string
}

export default function ItemList({gameData, gamesError}: ItemListProps) {

    const [games, setGames] = useState<Game[]>([]);
    const [errMessage, setErrMessage] = useState('')

    useEffect(() => {
        const socket = io(`https://board-backend-b9tn.onrender.com`);
        socket.on('DELETE_GAME', async (data) => {
            const gameData = await axios.get(`https://board-backend-b9tn.onrender.com/games`)
            setGames(gameData.data.data);
        })

        return () => {
            socket.off('disconnect');
            socket.disconnect();
        }
    }, [])

    const handleUpdate = async function(id: String, item:Game) {
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

    useEffect(() => {
        setGames(gameData);
        setErrMessage(gamesError);
    }, [gameData, gamesError])

    return <div className="admin-page">
        {errMessage && <div className='admin-error'>{errMessage}</div>}
        <h1 className="admin-title">
            Items
        </h1>
        <Link href={'/admin/items/add'}>
            <button className='admin-button mt-3'>
                Add Item
            </button>
        </Link>
        <div>
            {games.map((game) => {
                return <AdminGameItem showButtons={true} key={game._id} game={game} clickFunction={(id, item) => {handleUpdate(id, item)}}/>
            })}
        </div>
    </div>
}