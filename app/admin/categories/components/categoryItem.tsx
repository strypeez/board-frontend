'use client'

import { useState, useEffect } from 'react';
import AdminGameItem from "../../items/components/adminItem";

import { Game } from '@/models/gameModel';
import Link from "next/link";
import axios from 'axios';

import { Category } from '@/models/categoryModel';
interface CategoryItemType {
    category: Category
}

export default function CategoryItem({category}: CategoryItemType) {

    const [gameItems, setGameItems] = useState<Game[]>([]);
    const [errMessage, setErrMessage] = useState('');


    const handleDelete = async function() {
        try {
            await axios.delete(`https://board-backend-b9tn.onrender.com/categories/category/${category._id}`);
        } catch (e) {
            if (e.response.status === 500) {
                setErrMessage(e.response.data);
            }
        }
    }

    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.post(`https://board-backend-b9tn.onrender.com/games/list`, {
                    items: category.items,
                });
                setGameItems(data.data.data);
            } catch (e) {
                if (e.response.status === 500) {
                    setErrMessage(e.response.data);
                }
            }

        }

        getList()
    }, [category.items])

    return <div className="admin-category-item">
        {errMessage && <div className="admin-error">{errMessage}</div>}
        <h2 className="admin-category-item-title">{category.title}</h2>
        <p className="admin-category-item-subtitle">{category.description}</p>
        <Link href={`/admin/categories/edit/${category._id}`}>
            <button className="admin-button">Edit</button>
        </Link>
        <button className="admin-button" onClick={() => {
            handleDelete()
        }}>Delete</button>
        <h2 className="admin-category-item-title font-bold mt-3">Games</h2>
        <div>
            {gameItems.map((item) => {
                return <AdminGameItem key={item._id} game={item} showButtons={false} clickFunction={(()=>{})} />
            })}
        </div>
    </div>
} 