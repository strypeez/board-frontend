'use client'

import {useState, useEffect,useCallback } from 'react';
import CategoryGame from '@/app/(client)/components/categoryGame';

import { Game } from '@/models/gameModel';

import axios from 'axios';

interface CarouselViewProps {
    carouselData: string[]
    carouselError: string
    gamesData: Game[]
    gameError: string
}

export default function CarouselView({carouselData, carouselError, gamesData, gameError}: CarouselViewProps) {
    const [items, setItems] = useState<Game[]>([]);
    const [carouselItems, setCarouselItems] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [filteredGames, setFilteredGames] = useState<JSX.Element[]>([]);
    const [errMessage, setErrMessage] = useState("");

    const handleSelectedGames = useCallback((id: string) => {
        if (carouselItems.includes(id)) {
            const itemIndex = carouselItems.indexOf(id);
            setCarouselItems([...carouselItems.slice(0, itemIndex), ...carouselItems.slice(itemIndex+1)]);
        } else {
            setCarouselItems([...carouselItems, id]);
        }
    }, [carouselItems])

    useEffect(() => {
        const newGames = items.filter((game) => {
            return !carouselItems.includes(game._id) && (searchValue === '' || game.title.includes(searchValue));
        }).map((game) => {
            return <CategoryGame link={false} key={game._id} item={game} clickFunction={(id:string) => {handleSelectedGames(id)}} />
        })

        setFilteredGames(newGames);
    }, [searchValue, items, handleSelectedGames, carouselItems])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    useEffect(() => {
        setCarouselItems(carouselData);
        setItems(gamesData);
        setErrMessage(carouselError || gameError);
    }, [carouselData, gamesData, carouselError, gameError])

    return <div className="admin-page">
        {
            errMessage && <div className="admin-error">
                {errMessage}
            </div>
        }
        <div className='flex justify-between items-center'>
            <h1 className="admin-title">
                Carousel
            </h1>
            <div className="admin-button" onClick={async () => {
                try {
                    await axios.put(`https://board-backend-b9tn.onrender.com/meta/carousel`, {
                        "newItems": carouselItems
                    });
                } catch(e) {
                    if (axios.isAxiosError(e)) {
                        if (e.response?.status === 500) {
                            setErrMessage(e.response.data)
                        }
                    }

                }
            }}>
                Save
            </div>
        </div>
        <div className="mt-3 flex overflow-x-auto scroll-smooth">
            {carouselItems.length !== 0 && items.filter((item) => {
                return carouselItems.includes(item._id);
            }).map((item) => {
            return <CategoryGame link={false} key={item._id} item={item} clickFunction={(id:string) => {handleSelectedGames(id)}} />
            })}
            {carouselItems.length === 0 && <div className="empty-selection">
            <p>Looks like no games are selected for carousel</p>
        </div>}
        </div>
        <h2 className="text-xl font-bold mt-3">Other Items</h2>
        <div className="flex flex-col">
            <label className="search-title">Search</label>
            <input type="text" onChange={(e)=>{handleChange(e)}} className="search-bar"></input>
        </div>
        <div className="mt-3 flex overflow-x-auto scroll-smooth">
            {filteredGames.length !== 0 && filteredGames}
            {filteredGames.length === 0 && <div className="empty-selection">
            <p>Looks like no games match search</p>
        </div>}
        </div>
    </div>
}