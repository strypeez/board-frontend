'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import SearchItem from "../categories/components/searchItem";
import { useState, useCallback, useEffect } from "react";

import { Game } from "@/models/gameModel";

import FormField from "./formField";
import { Category } from "@/models/categoryModel";
import { DefaultCategory } from "@/defaults";
import axios from "axios";

export type Inputs = {
    title: string
    description: string
}

interface CategoryFormType {
  submitAction: (data: Category) => void,
  action: string,
  categoryId: string
}

export default function CategoryForm({submitAction, action, categoryId}: CategoryFormType) {
  const [games, setGames] = useState<Game[]>([]);
  const [category, setCategory] = useState<Category>(DefaultCategory);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [errMessage, setErrMessage] = useState<string>('');

  const handleSelectedGames = (id: string) => {
      if (selectedGames.includes(id)) {
          const itemIndex = selectedGames.indexOf(id);
          setSelectedGames([...selectedGames.slice(0, itemIndex), ...selectedGames.slice(itemIndex+1)]);
      } else {
          setSelectedGames([...selectedGames, id]);
      }
  }

  useEffect(() => {
    async function retrieveCategory() {
      try {
        const data = await axios.get(`https://board-backend-b9tn.onrender.com/categories/category/${categoryId}`);
        setCategory(data.data.data)
      } catch(e) {
        if (axios.isAxiosError(e)) {
          if (e.response?.status === 500) {
            setErrMessage(e.response.data);
          }
        }
      }
    }
    if (action === 'Edit') {
      retrieveCategory();
    }
  }, [submitAction, action, categoryId])

  useEffect(() => {
      async function retrieveGames() {
          try {
            const data = await axios.get(`https://board-backend-b9tn.onrender.com/games/`);
            setGames(data.data.data);
          } catch (e) {
            if (axios.isAxiosError(e)) {
              if (e.response?.status === 500) {
                setErrMessage(e.response.data);
              }
            }
          }
      }

      retrieveGames();
  }, [])
  
      const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data) => submitAction({...data, _id: 'new', items: selectedGames});

      const resetForm = useCallback(async (category: Category) => {
        reset(category);
      }, [reset])

      useEffect(() => {
        resetForm(category);
        setSelectedGames(category.items)
      }, [category, resetForm])

    return <div className="admin-category-edit-form">
      {errMessage && <div className="admin-error">
          {errMessage}
        </div>}
      {
        !errMessage && <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
    <div className="flex mb-3 justify-between items-center">
    <h1 className="admin-category-edit-form-title"> {action} Category Form</h1>
    <input type="submit" className="admin-button"></input>
    </div>

      <FormField type="input" defaultValue={category.title} label="Category Name" fieldName="title" errors={errors.title} register={register}/>
      <FormField type="input" defaultValue={category.description} label="Category Description" fieldName="description" errors={errors.description} register={register}/>
    <SearchItem games={games} selectedGames={selectedGames} handleSelectedGames={handleSelectedGames}/>
      </form>
      } 
    </div>
}