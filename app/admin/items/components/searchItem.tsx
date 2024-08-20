import Link from 'next/link';

interface SearchItem {
    item: {title: string, year: number, id: string}
}

export default function SearchItem({item}: SearchItem) {
    return <Link href={`/admin/items/add/${item.id}`}>
    <div className="border border-black p-5 mb-2">
        <h2>{item.title}</h2>
        <p>({item.year})</p>
    </div>
</Link>
}