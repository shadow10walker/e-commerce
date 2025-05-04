"use client"

import { createContext, useState, useContext, ReactNode } from "react"


export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  quantity: number
}

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  isNew: boolean
  inStock: boolean
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  getCartItemsCount: () => number
}


export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  getCartItemsCount: () => 0,
})


interface CartProviderProps {
  children: ReactNode
}


export const useCart = () => useContext(CartContext)

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // Vérifie si le produit est déjà dans le panier
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        // Si le produit existe déjà, incrémente la quantité
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      } else {
        // Sinon, ajoute le nouveau produit avec quantité 
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  // Fonction pour obtenir le nombre total d'articles dans le panier
  const getCartItemsCount = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  
  const value: CartContextType = {
    cartItems,
    addToCart,
    getCartItemsCount
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}