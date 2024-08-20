import Link from "next/link"

export default function AdminHeader() {
    return <div className="admin-header p-5 flex w-full">
        <Link href="/admin">
            <p className="admin-logo">Admin</p>
        </Link>
        <div className="flex">
            <Link href="/admin/items">
                <p className="admin-nav ml-2">Items</p>
            </Link>
            <Link href="/admin/carousel">
                <p className="admin-nav ml-2">Carousel</p>
            </Link>
            <Link href="/admin/categories">
                <p className="admin-nav ml-2">Categories</p>
            </Link>
            <Link href="/admin/orders">
                <p className="admin-nav ml-2">Orders</p>
            </Link>
        </div>
    </div>
}