'use client'

import CategoryForm from '@/app/admin/components/categoryForm';

import { Category } from '@/models/categoryModel';
import axios from "axios";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditCategory({params}: { params: {slug:string}} ) {
    const router = useRouter();
    const [errMessage, setErrMessage] = useState('');
    const handleCategory = async function(data: Category) {

        try {
            await axios.put(`https://board-backend-b9tn.onrender.com/categories/category`, {
                categoryId: params.slug,
                params: {...data}
            })
    
            router.push('/admin/categories')
        } catch(e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 500) {
                    setErrMessage(e.response.data)
                }
            }
        }
    }

    
    return <div className='p-5'>
        {errMessage && <div className='admin-error'>
            {errMessage}
            </div>}
        <CategoryForm action="Edit" categoryId={params.slug} submitAction={(data: Category) => {handleCategory(data)}}/>
    </div>
}