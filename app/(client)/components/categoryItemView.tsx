import CategoryGame from "./categoryGame"
import {useState, useEffect} from 'react';
import Link from 'next/link';
import { Category } from "@/models/categoryModel";
import { Game } from "@/models/gameModel";

import axios from 'axios';

interface CategoryItemViewType {
    category: Category
}

export default function CategoryItemView({category}: CategoryItemViewType) {
    const [categoryGames, setCategoryGames] = useState<Game[]>([])
    const [errMessage, setErrMessage] = useState();

    useEffect(() => {
        async function retrieveGames() {
            try {
                const gameData = await axios.post(
                    `https://board-backend-b9tn.onrender.com/games/list`,
                    {
                        items: category.items,
                    }
                );
                setCategoryGames(gameData.data.data);
            } catch (e: any) {
                if (e.response.status === 500) {
                    setErrMessage(e.response.data) 
                }
            }
        }
        retrieveGames();
    }, [category.items])
    
    return <div className="categoryList">
        {errMessage && <div className="admin-error">{errMessage} </div>}
        <div className="category-header">
            <div>
                <h2 className="category-title">{category.title}</h2>
                <p className="category-description">{category.description}</p>
            </div>
            <Link href={`/category/${category._id}`}>
                <div className="client-button">Shop More</div>
            </Link>
        </div>
        <div className="category-items-container">
            {categoryGames.map((item) => {
                return <CategoryGame key={item._id} item={item} link={true} clickFunction={(id) => {}}/>
            })}
        </div>
    </div>
}