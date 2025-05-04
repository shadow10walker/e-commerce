"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"

// Mock data for related products
const relatedProducts = [
  {
    id: 5,
    name: "Mug ENSPY",
    price: 3500,
    image: "/placeholder.svg?height=300&width=300",
    category: "Goodies",
    isNew: false,
    inStock: true,
  },
  {
    id: 7,
    name: "Porte-clés",
    price: 1200,
    image: "/placeholder.svg?height=300&width=300",
    category: "Goodies",
    isNew: false,
    inStock: true,
  },
  {
    id: 9,
    name: "Casquette ENSPY",
    price: 4000,
    image: "/placeholder.svg?height=300&width=300",
    category: "Goodies",
    isNew: true,
    inStock: true,
  },
  {
    id: 10,
    name: "Sweat à capuche ENSPY",
    price: 12000,
    image: "/placeholder.svg?height=300&width=300",
    category: "Goodies",
    isNew: false,
    inStock: true,
  },
]

export default function RelatedProducts() {
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

  const handleAddToCart = (product: (typeof relatedProducts)[0]) => {
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
      {relatedProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden group">
          <Link href={`/products/${product.id}`}>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {product.isNew && <Badge className="absolute top-2 right-2 bg-teal-500">Nouveau</Badge>}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Badge variant="outline" className="text-white border-white">
                    Rupture de stock
                  </Badge>
                </div>
              )}
            </div>
          </Link>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
            <Link href={`/products/${product.id}`} className="hover:underline">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            </Link>
            <div className="font-bold">{product.price.toLocaleString()} FCFA</div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button className="w-full" onClick={() => handleAddToCart(product)} disabled={!product.inStock}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Ajouter
            </Button>
            <Button variant="outline" size="icon" onClick={() => toggleFavorite(product.id)}>
              <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
