import { useState } from 'react'

interface CartItem {
  id: string
  name: string
  emoji: string
  price: number
  quantity: number
}

// Estado fora do hook para ser partilhado entre componentes
let globalItems: CartItem[] = []
let listeners: (() => void)[] = []

const setGlobalItems = (updater: (prev: CartItem[]) => CartItem[]) => {
  globalItems = updater(globalItems)
  listeners.forEach((l) => l())
}

export function useCart() {
  const [, rerender] = useState(0)

  const subscribe = () => {
    const listener = () => rerender((n) => n + 1)
    listeners.push(listener)
    return () => { listeners = listeners.filter((l) => l !== listener) }
  }

  useState(subscribe)

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    setGlobalItems((prev) => {
      const exists = prev.find((i) => i.id === product.id)
      if (exists) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setGlobalItems((prev) => {
      const exists = prev.find((i) => i.id === id)
      if (exists && exists.quantity > 1) return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
      return prev.filter((i) => i.id !== id)
    })
  }

  const deleteItem = (id: string) => {
    setGlobalItems((prev) => prev.filter((i) => i.id !== id))
  }

  const total = globalItems.reduce((acc, i) => acc + i.price * i.quantity, 0)
  const count = globalItems.reduce((acc, i) => acc + i.quantity, 0)

  return { items: globalItems, addItem, removeItem, deleteItem, total, count }
}