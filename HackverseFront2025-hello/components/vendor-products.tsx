"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Heart, Search } from "lucide-react"

// Mock data for vendor products
const vendorProducts = [
  {
    id: 1,
    name: "T-shirt ENSPY",
    price: 5000,
    image: "/placeholder.svg?height=300&width=300",
    category: "Goodies",
    isNew: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Cahier personnalisé",
    price: 1500,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fournitures",
    isNew: false,
    inStock: true,
  },
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
    id: 4,
    name: "Stylo gravé",
    price: 1000,
    image: "/placeholder.svg?height=300&width=300",
    category: "Papeterie",
    isNew: false,
    inStock: false,
  },
]

export default function VendorProducts({ vendorId }: { vendorId: number }) {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Produits ({vendorProducts.length})</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher..." className="pl-8 w-full sm:w-[200px]" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="goodies">Goodies</SelectItem>
              <SelectItem value="fournitures">Fournitures</SelectItem>
              <SelectItem value="papeterie">Papeterie</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="newest">
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Plus récents</SelectItem>
              <SelectItem value="price-asc">Prix croissant</SelectItem>
              <SelectItem value="price-desc">Prix décroissant</SelectItem>
              <SelectItem value="popular">Popularité</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendorProducts.map((product) => (
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
              <Button className="w-full" disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Ajouter
              </Button>
              <Button variant="outline" size="icon" onClick={() => toggleFavorite(product.id)}>
                <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="outline" asChild>
          <Link href={`/products?vendor=${vendorId}`}>Voir tous les produits de ce vendeur</Link>
        </Button>
      </div>
    </div>
  )
}
