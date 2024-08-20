'use client'

import Link from "next/link"
import { useCartStore } from "@/providers/cart-store-provider"

export default function ClientHeader() {
    const { items } = useCartStore((state) => state,)
    return <div className="client-header flex p-5 w-full">
        <Link href="/">
            <p className="client-logo">Home</p>
        </Link>
        <div>
            <Link className="flex" href="/cart">
            <div className="client-cart-number">
                {items.length}
            </div>
                <p className="client-nav">Cart</p>
            </Link>
        </div>
    </div>
}