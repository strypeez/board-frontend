'use client'
import CategoryItem from "./categoryItem"
import { useEffect, useState } from "react"

import { Category } from "@/models/categoryModel"
import axios from "axios"

import io from 'socket.io-client';

interface CategoryListProps {
    categoryData: Category[]
    categoryError: string
}

export default function CategoryList({categoryData, categoryError}: CategoryListProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [errMessage, setErrMessage] = useState<string>('');

    useEffect(() => {
        const socket = io(`https://board-backend-b9tn.onrender.com`);
        socket.on('DELETE_CATEGORY', async (data) => {
            try {
                const catData = await axios.get(`https://board-backend-b9tn.onrender.com/categories/`);
                setCategories(catData.data.data);
            }  catch(e) {
                
                if (axios.isAxiosError(e)) {
                    if (e.response?.status === 500) {
                        setErrMessage(e.response.data);
                    }
                }
            }

        })
  
        return () => {
            socket.off('disconnect');
            socket.disconnect();
        }
    }, [])

    useEffect(() => {
        setCategories(categoryData);
        setErrMessage(categoryError);
    }, [categoryData, categoryError])

    return <div>
        {errMessage && <div className="admin-error">{errMessage}</div>
        }
        {categories.map((category:any) => {
           return <CategoryItem key={category.id} category={category} />
        })}
    </div>
}