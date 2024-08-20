'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import { useState} from 'react'
import { xml2json } from "xml-js"

import SearchItem from "./searchItem"

type Inputs = {
    gameName: string
}

function parseGames(xml: string) {
    const elements = JSON.parse(xml);
    const newArray = elements.items.item.map((item: any) => {
        return {title: item.name._attributes.value, year: item.yearpublished._attributes.value, id: item._attributes.id, };
    })
    return newArray;
}

export default function SearchGame() {
    const [searchItems, setSearchItems] = useState([]);
    
    async function searchForItems(query: string) {
        const search = await fetch(`https://boardgamegeek.com/xmlapi2/search?query=${query}&type=boardgame`);
        const response = await search.text();
        const data = new window.DOMParser().parseFromString(response, "text/xml")
        const result = xml2json(response, {compact: true, spaces: 4});
        const parsedGames = parseGames(result);
        setSearchItems(parsedGames);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data) => searchForItems(data.gameName);

      return <div className="mt-5">
  <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
    <input className="admin-form-field border-black border-b" defaultValue="testing" {...register("gameName", {required: true})} />
    {errors.gameName && <span>This field is required</span>}

    <input className="admin-button mt-2" type="submit" />
  </form>
  <div>
    <h2 className="admin-title mt-5">Search results</h2>
    <div>
      {searchItems.map((item, index) => {
        return <SearchItem key={index} item={item} />
      })}
    </div>
  </div>
  </div>
}