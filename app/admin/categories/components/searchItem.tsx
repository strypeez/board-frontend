'use client'
import {useState, useEffect} from 'react';
import CategoryGame from "@/app/(client)/components/categoryGame";
import { Game } from "@/models/gameModel";

interface SearchItemType {
    games: Game[],
    selectedGames: string[],
    handleSelectedGames: (id: string) => void
}

export default function SearchItem({games, selectedGames, handleSelectedGames}: SearchItemType) {

    const [searchValue, setSearchValue ] = useState("");
    const [filteredGames, setFilteredGames] = useState<JSX.Element[]>([]);
    
    useEffect(() => {
        const newGames = games.filter((game) => {
            return !selectedGames.includes(game._id) && (searchValue === '' || game.title.includes(searchValue));
        }).map((game) => {
            return <CategoryGame link={false} key={game._id} item={game} clickFunction={(id:string) => {handleSelectedGames(id)}} />
        })

        setFilteredGames(newGames);
    }, [searchValue, games, handleSelectedGames, selectedGames])

    const handleChange = (e: any) => {
        setSearchValue(e.target.value);
    }

    return <div>
        <h2 className="admin-category-edit-form-title">Selected Items</h2>
        <div className="mt-3 flex overflow-x-auto scroll-smooth">
{  selectedGames.length === 0 &&      <div className="empty-selection">
            <p>Looks like no games are selected</p>
        </div>}
        {selectedGames.length !== 0 && games.filter((game) => {
            return selectedGames.includes(game._id);
        }).map((game) => {
            return <CategoryGame link={false} key={game._id} item={game} clickFunction={(id:string) => {handleSelectedGames(id)}} />
        })}
        </div>
        <h2 className="admin-category-edit-form-title">List of Games</h2>
        <div className="flex flex-col">
            <label className="search-title">Search</label>
            <input onChange={(e) => {
                handleChange(e)
            }} className="search-bar" type="text"></input>
        </div>

        <div className="category-form-games mt-3 flex overflow-x-auto scroll-smooth scroll-pb-8 snap-x">
            {filteredGames.length !== 0 && filteredGames}
            {filteredGames.length === 0 && <div className="empty-selection">
            <p>Looks like no games match</p>
        </div>}
        </div>
    </div>
}