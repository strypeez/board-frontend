'use client'

import {useState, useEffect} from 'react';
import { xml2json } from "xml-js"
import { Game } from '@/models/gameModel';

import ItemForm from '@/app/admin/components/itemForm';
import { DefaultGame } from '@/defaults';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function parseGame(result: string) {
    const elements = JSON.parse(result);
    const gameObject = {
        title: elements.items.item.name[0]._attributes.value,
        description: elements.items.item.description._text,
        image: elements.items.item.image._text,
        maxPlayers: elements.items.item.maxplayers._attributes.value,
        minPlayers: elements.items.item.minplayers._attributes.value,
        playingTime: elements.items.item.playingtime._attributes.value,
        thumbnail: elements.items.item.thumbnail._text,
        yearPublished: elements.items.item.yearpublished._attributes.value,
        _id: "new",
        price: 0.00,
        quantity: 0
    }
    return gameObject;
}

export default function AddItem({params}: { params: {slug:string}} ) {
    
    const [game, setGame] = useState<Game>(DefaultGame)
    const [errMessage, setErrMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            await axios.post(`https://board-backend-b9tn.onrender.com/games/create`, {
                params: {
                  ...data
                }
              });
            router.push('/admin/items');
        } catch (e: any) {
            if (e.response.status === 500) {
                setErrMessage(e.response.data)
            }
        }
    }

    useEffect(() => {
        async function retrieveGame() {
            const search = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${params.slug}`);
            const response = await search.text();
            const data = new window.DOMParser().parseFromString(response, "text/xml")
            const result = xml2json(response, {compact: true, spaces: 4});
            const parsedGame = parseGame(result);
            setGame(parsedGame)
        }

        retrieveGame();
    }, [params.slug])

    return <div className='admin-page'>
        {errMessage && <div className="admin-error">{errMessage}</div>}
        <ItemForm action="Add" game={game} submitAction={(data) => {handleSubmit(data)}}/>
    </div>
}