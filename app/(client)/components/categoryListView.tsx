'use client'
import {useState, useEffect} from 'react';
import CategoryItemView from './categoryItemView';

import { Category } from '@/models/categoryModel';

export default function CategoryListView({data, error}) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [errMessage, setErrMessage] = useState<string>('');

    useEffect(() => {
        setCategories(data);
        setErrMessage(error);
    }, [data, error])
    return <div>
        {
            errMessage && <div className='client-error'>
                {errMessage}
                </div>
        }
        {
            categories.map((category) => {
                return <CategoryItemView key={category._id} category={category}/>
            })
        }
    </div>
}