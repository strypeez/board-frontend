'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type CartStore, createCartStore } from '@/stores/cart-store'

export type CartStoreApi = ReturnType<typeof createCartStore>

export const CartStoreContext = createContext<CartStoreApi | undefined>(
  undefined,
)

export interface CartStoreProviderProps {
  children: ReactNode
}

export const CartStoreProvider = ({
  children,
}: CartStoreProviderProps) => {
  const storeRef = useRef<CartStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createCartStore()
  }

  return (
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  )
}

export const useCartStore = <T,>(
  selector: (store: CartStore) => T,
): T => {
  const cartStoreContext = useContext(CartStoreContext)

  if (!cartStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(cartStoreContext, selector)
}