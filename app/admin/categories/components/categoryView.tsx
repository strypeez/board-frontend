'use client'

import { useState } from 'react';

import CategoryForm from '../../components/categoryForm';
import CategoryList from "./categoryList";

import { Category } from '@/models/categoryModel';

import axios from 'axios';

export default function CategoriesView({categoryData, categoryError}) {
    const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState();

    const handleSubmit = async function(data: Category) {
      try {
        await axios.post(`https://board-backend-b9tn.onrender.com/categories/create`, {
          params: {
            ...data
          }
        });
  
        window.location.reload();
      } catch (e) {
        if (e.response.status === 500) {
          setErrMessage(e.response.data)
        }
      }
    }
    return (
      <main className='admin-page'>
        <h1 className="admin-title">
            Categories
        </h1>
        {errMessage && <div className='admin-error'>
          {errMessage}
        </div> }
        <button className="admin-button mt-3" onClick={() => {
          setIsAddOpen((isAddOpen) => {
            return !isAddOpen
          })
        }}>New Category</button>
        {isAddOpen && <CategoryForm categoryId="" action="Add" submitAction={(data: Category) => {handleSubmit(data)}}/>}
        <CategoryList categoryData={categoryData} categoryError={categoryError} />
      </main>
    );
  }
  