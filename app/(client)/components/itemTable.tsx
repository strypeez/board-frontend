'use client'

import {useState, useEffect} from 'react';

import { useCartStore } from '@/providers/cart-store-provider'
import { Game } from '@/models/gameModel';
import { DefaultGame } from '@/defaults';
import axios from 'axios';

type ItemTableProps = {
    data: any
    error: any
}

export default function ItemTable({data, error}: ItemTableProps) {
    const [game, setGame] = useState<Game>(DefaultGame)
    const { addItem, addToast } = useCartStore((state) => state,)
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        setGame(data);
        setErrMessage(error);
    }, [data, error])

    const handleAddToCart = () => {
        addItem(game._id, 1, game.quantity);
        addToast('info', 'Testing add to cart toast')
    }

    return <div className='client-item-page client-page'>
        {errMessage && <div className='admin-order'>{errMessage}</div>}
        <div className="left-col">
            <img src={game.image}></img>
            <div className="description-container">
                <h2 className='client-item-page-subheading'>Description</h2>
                <p className="mt-2 text-sm">{game.description}</p>
            </div>
        </div>
        <div id="right-col" className="right-col">        
            <h1 className="client-item-page-title">{game.title}</h1>
            <div className='p-3 border-b'>
                <h2 className='client-item-page-subheading'>Price</h2>
                <div className="flex justify-between items-end">
                    <p>qty: {game.quantity}</p>
                    <p className='client-item-price'>${game.price}</p>
                </div>
            </div>
            <div className='p-3 border-b'>
                <h2 className='client-item-page-subheading'>Published</h2>
                <p>{game.yearPublished}</p>
            </div>
            <div className='p-3 border-b'>
                <h2 className='client-item-page-subheading'>Player Count</h2>
                <p>{game.minPlayers} - {game.maxPlayers}</p>
            </div>
            <div className='p-3 border-b'>
                <h2 className='client-item-page-subheading'>Player Count</h2>
                <p>{game.minPlayers} - {game.maxPlayers}</p>
            </div>
            <div className='p-3 border-b'>
                <h2 className='client-item-page-subheading'>Playing Time</h2>
                <p>{game.playingTime} mins</p>
            </div>
            <div onClick={() => {handleAddToCart()}} className='client-button m-5'>
                Add to Cart
            </div>
        </div>
        <div className="description-container-mobile">
                <h2 className='client-item-page-subheading'>Description</h2>
                <p className="mt-2 text-sm">{game.description}</p>
        </div>
    </div>
}