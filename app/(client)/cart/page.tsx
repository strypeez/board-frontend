'use client'

import {useState, useEffect } from 'react'

import CartItem from './components/cartItem'
import { ItemCart } from '@/stores/cart-store'

import { useCartStore } from '@/providers/cart-store-provider'
import { Game } from '@/models/gameModel'

import axios from 'axios';
import { useRouter } from 'next/navigation';

export interface CartItem {
    item: string,
    quantity: number,
    origianlQuantity: number
}


export default function Cart() {
    const { items, updateItems, clearCart, addToast } = useCartStore((state) => state,)
    const [cartGames, setCartGames] = useState<Game[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [errMessage, setErrMessage] = useState('');

    const router = useRouter();
    const handleQuantityChange = (id: string, newQuantity: number) => {
        const newCart = items.map((game: ItemCart) => {
            if (game.item === id) {
                return {
                    ...game,
                    quantity: newQuantity,
                }
            } else return game;
        })
        updateItems(newCart);
    }

    const handleDelete = (id: string) => {
        const newCart = items.filter((game: ItemCart) => {
            return game.item !== id;
        })

        const newCartGames = cartGames.filter((game: Game) => {
            return id !== game._id;
        })
        setCartGames(newCartGames);
        updateItems(newCart);
    }

    const handleCreate = async function() {
        try {
            await axios.post(`https://board-backend-b9tn.onrender.com/orders/create`, {
                params: {
                    cart: items,
                    state: 'Preparing',
                }
            })
    
            addToast('info', 'Placed your order')
            clearCart();
            router.push('/');
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 500) {
                    setErrMessage(e.response?.data);
                }
            }
        }
    }

    useEffect(() => {
        const total = cartGames.reduce((total, item, index) => {
            if (items[index]) {
                return total + (item.price * items[index].quantity)
            } else {
                return 0;
            }
        }, 0)
        setTotal(total);
    }, [cartGames, items])

    useEffect(() => {
        async function getGames() {
            try {
                const listOfGames = items.map((item) => {
                    return item.item;
                })
                const data = await axios.post(`https://board-backend-b9tn.onrender.com/games/list`, {
                    items: listOfGames
                });
                setCartGames(data.data.data);
            } catch(e) {
                if (axios.isAxiosError(e)) {
                    setErrMessage(e.response?.data);
                }
            }

        }
        getGames();
    }, [items])

    return <div className="client-page">
        <h1 className="client-title mb-5">
            Shopping Cart
        </h1>
        {errMessage && <div className="client-error">{errMessage}</div>}
        <div className="">
            {cartGames.map((item, index) => {
                return <CartItem key={item._id} updateFunction={handleQuantityChange} deleteFunction={handleDelete} item={item} quantity={items[index] && items[index].quantity}/>
            })}
        </div>
        <div className="flex flex-col items-end justify-end bg-white rounded-md p-5 text-xl">
            <p className="font-bold text-base-red mb-3"><span className="font-bold text-lg text-darker-red">Subtotal:</span> ${total}</p>
            <button  onClick={() => {
                handleCreate();
            }} className="client-button ">Place Order</button>
        </div>
    </div>
}