"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "T-shirt ENSPY",
    price: 5000,
    image: "/placeholder.svg?height=300&width=300",
    category: "Goodies",
    isNew: true,
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: "Cahier personnalisé",
    price: 1500,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fournitures",
    isNew: false,
    rating: 4.2,
    inStock: true,
  },
  {
    id: 3,
    name: "Billet Gala annuel",
    price: 10000,
    image: "/placeholder.svg?height=300&width=300",
    category: "Événements",
    isNew: true,
    rating: 4.8,
    inStock: true,
  },
  {
    id: 4,
    name: "Stylo gravé",
    price: 1000,
    image: "/placeholder.svg?height=300&width=300",
    category: "Papeterie",
    isNew: false,
    rating: 4.0,
    inStock: true,
  },
]

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([])
  const { addItem } = useCart()
  const { toast } = useToast()

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    if (!product.inStock) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })

    toast({
      title: "Produit ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
      duration: 3000,
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden group card-hover border-orange-100 dark:border-orange-900/20">
          <Link href={`/products/${product.id}`}>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {product.isNew && (
                <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">Nouveau</Badge>
              )}
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                <span className="text-xs font-medium">{product.rating}</span>
              </div>
            </div>
          </Link>
          <CardContent className="p-4">
            <div className="text-sm text-blue-800 dark:text-blue-400 font-medium mb-1">{product.category}</div>
            <Link href={`/products/${product.id}`} className="hover:underline">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            </Link>
            <div className="font-bold text-orange-500">{product.price.toLocaleString()} FCFA</div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white button-glow"
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Ajouter
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleFavorite(product.id)}
              className={`${
                favorites.includes(product.id)
                  ? "bg-orange-50 border-orange-500 dark:bg-orange-950 dark:border-orange-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-orange-500 text-orange-500" : ""}`} />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
