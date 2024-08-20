import Link from 'next/link';

import { Game } from '@/models/gameModel';

interface CategoryGameType {
    item: Game,
    link: boolean,
    clickFunction: (id: string) => void
}

export default function CategoryGame({item, clickFunction, link}: CategoryGameType) {
    if (link) {
        return <Link className='category-item' href={`/item/${item._id}`}>
        <div className="w-48">
        <img className="category-item-image" src={item.thumbnail}></img>
            <div className='category-item-text'>
            <h3 className="category-item-title">{item.title}</h3>
            <div className="category-item-info">
                {item.quantity && <p>qty: {item.quantity}</p>}
                {item.price && <p className="category-item-price">${item.price}</p>}
            </div>
        </div>

        </div>
        </Link>
    } else {
        return <div onClick={() => {
            clickFunction(item._id)
        }} className="category-item">
        <img className="category-item-image" src={item.thumbnail}></img>
        <div className='category-item-text'>
            <h3 className="category-item-title">{item.title}</h3>
            <div className="category-item-info">
                {item.quantity && <p>qty: {item.quantity}</p>}
                {item.price && <p className="category-item-price">${item.price}</p>}
            </div>
        </div>

    </div>
    }
}