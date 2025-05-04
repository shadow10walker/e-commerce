"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  variant?: {
    color?: string
    size?: string
    type?: string
  }
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("edumarket-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        localStorage.removeItem("edumarket-cart")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("edumarket-cart", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      // Check if item already exists in cart
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.variant?.color === newItem.variant?.color &&
          item.variant?.size === newItem.variant?.size &&
          item.variant?.type === newItem.variant?.type,
      )

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        return updatedItems
      } else {
        // Add new item if it doesn't exist
        return [...currentItems, newItem]
      }
    })
  }

  const removeItem = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return

    setItems((currentItems) => currentItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  // Calculate total number of items
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
