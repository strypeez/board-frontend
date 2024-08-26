'use client'

import {useState, useEffect} from 'react';
import { Game } from '@/models/gameModel';
import { Category } from '@/models/categoryModel';

import CategoryGame from '@/app/(client)/components/categoryGame';
import { DefaultCategory } from '@/defaults';

type CategoryTableProps = {
    categoryData: any,
    gamesData: any,
    error: any
}

export default function CategoryTable({categoryData, gamesData, error}: CategoryTableProps) {
    
    const [category, setCategory] = useState<Category>(DefaultCategory);
    const [games, setGames] = useState<Game[]>([]);
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        setCategory(categoryData);
        setGames(gamesData);
        setErrMessage(error);
    }, [categoryData, gamesData, error])

    return <div className='client-page'>
        {errMessage && <div className="client-error">{errMessage}</div>}
        <h1 className="client-title">{category.title}</h1>
        <p className="client-subtitle">{category.description}</p>
        <div className='category-page-tile-container'>
            {games.map((game) => {
                return <CategoryGame key={category._id} item={game} link={true} clickFunction={()=>{}}/>
            })}
        </div>
    </div>
}