import { arrayBuffer } from 'stream/consumers'
import { createStore } from 'zustand/vanilla'

export type ItemCart = {
  item: string
  originalQuantity: number
  quantity: number
}

export type Toast = {
  message: string
  type: string
}

export type CartState = {
  items: ItemCart[]
  toasts: Toast[]
}

export type CartActions = {
  updateItems: (newItems:any) => void
  addItem: (item: any, quantity: any, originalQuantity: any) => void
  addToast: (type: any, message: any) => void
  removeToast: (index: any) => void
  clearCart: () => void
}

export type CartStore = CartState & CartActions

export const defaultInitState: CartState = {
  items: [],
  toasts: [{
    type: 'info',
    message: 'This is a message for the toast from the store'
  }],
}

export const createCartStore = (
  initState: CartState = defaultInitState,
) => {
  return createStore<CartStore>()((set) => ({
    ...initState,
    updateItems: (newItems) => set((state) => ({ ...state, items: newItems })),
    clearCart: () => set((state) => ({...state, items: []})),
    addItem: (item, quantity, originalQuantity) => set((state) => ({...state, items: [...state.items, {item: item, quantity: quantity, originalQuantity: originalQuantity}]})),
    addToast: (type, message) => set((state) => ({...state, toasts: [...state.toasts, { type: type, message: message}]})),
    removeToast: (index) => set((state) => ({...state, toasts: [...state.toasts.slice(0, index), ...state.toasts.slice(index+ 1)]}))
  }))
}