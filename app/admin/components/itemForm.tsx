'use client'

import { useForm, SubmitHandler } from "react-hook-form"

import { useCallback, useEffect } from "react";

import FormField from "./formField";

import { Game } from "@/models/gameModel";

type Inputs = {
    _id: string
    title: string
    description: string
    image: string
    thumbnail: string
    minPlayers: number
    maxPlayers: number
    playingTime: number
    price: number
    quantity: number
    yearPublished: number
}

interface ItemFormType {
  action: string,
  game: Game,
  submitAction: (data: Game) => void
}

export default function ItemForm({action, game, submitAction}: ItemFormType) {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data: Game) => submitAction(data);

  
      const resetForm = useCallback(async (game: Game) => {
        reset(game);
      }, [reset])
  
      useEffect(() => {
        resetForm(game);
      }, [game, resetForm])
  
      
    return <div className="max-w-full admin-item-edit-form">
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
    <div className="flex justify-between items-center pb-5">
      <h1 className="admin-item-edit-form-title"> {action} Item</h1>
      <input className="admin-button" type="submit" />
      </div>
      <FormField type="input" defaultValue={game.title} label="Game Title" fieldName={"title"} errors={errors.title} register={register}/>

      <FormField type="textarea" defaultValue={game.description} label="Description" fieldName={"description"} errors={errors.description} register={register}/>

      <FormField type="input" defaultValue={game.image} label="Image" fieldName={"image"} errors={errors.image} register={register}/>

      <FormField type="input" defaultValue={game.thumbnail} label="Thumbnail" fieldName={"thumbnail"} errors={errors.thumbnail} register={register}/>

      <FormField type="input" defaultValue={game.minPlayers} label="Minimum Players" fieldName={"minPlayers"} errors={errors.minPlayers} register={register}/>

      <FormField type="input" defaultValue={game.maxPlayers} label="Maximum Players" fieldName={"maxPlayers"} errors={errors.maxPlayers} register={register}/>

      <FormField type="input" defaultValue={game.playingTime} label="Playing Time" fieldName={"playingTime"} errors={errors.playingTime} register={register}/>

      <FormField type="input" defaultValue={game.yearPublished} label="Year Published" fieldName={"yearPublished"} errors={errors.yearPublished} register={register}/>

      <FormField type="input" defaultValue={game.price} label="Price" fieldName={"price"} errors={errors.price} register={register}/>

      <FormField type="input" defaultValue={game.quantity} label="Quantity" fieldName={"quantity"} errors={errors.quantity} register={register}/>
    </form>
    </div>
}