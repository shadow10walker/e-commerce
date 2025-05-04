import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Star } from "lucide-react"

// Mock data for vendors
const vendors = [
  {
    id: 1,
    name: "Boutique Officielle ENSPY",
    description: "La boutique officielle de l'École Nationale Supérieure Polytechnique de Yaoundé.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 56,
    products: 24,
    categories: ["Goodies", "Fournitures", "Papeterie"],
    verified: true,
  },
  {
    id: 2,
    name: "Club Informatique",
    description: "Produits et services proposés par le club informatique de l'établissement.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 32,
    products: 15,
    categories: ["Goodies", "Événements"],
    verified: true,
  },
  {
    id: 3,
    name: "Association des Étudiants",
    description: "Produits et billets d'événements proposés par l'association des étudiants.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 48,
    products: 18,
    categories: ["Événements", "Goodies"],
    verified: true,
  },
  {
    id: 4,
    name: "Département Génie Civil",
    description: "Fournitures spécialisées pour les étudiants en génie civil.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.3,
    reviews: 21,
    products: 12,
    categories: ["Fournitures", "Papeterie"],
    verified: true,
  },
  {
    id: 5,
    name: "Projet Étudiant EcoDesign",
    description: "Produits écologiques conçus par des étudiants en design.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 15,
    products: 8,
    categories: ["Projets étudiants"],
    verified: false,
  },
  {
    id: 6,
    name: "Startup Campus Tech",
    description: "Gadgets et accessoires technologiques créés par une startup du campus.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviews: 27,
    products: 14,
    categories: ["Projets étudiants", "Goodies"],
    verified: false,
  },
  {
    id: 7,
    name: "Bibliothèque Centrale",
    description: "Fournitures et accessoires proposés par la bibliothèque de l'établissement.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.2,
    reviews: 19,
    products: 10,
    categories: ["Fournitures", "Papeterie"],
    verified: true,
  },
  {
    id: 8,
    name: "Club Arts & Culture",
    description: "Produits artisanaux et billets d'événements culturels.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 38,
    products: 16,
    categories: ["Événements", "Projets étudiants"],
    verified: true,
  },
]

export default function VendorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Vendeurs</h1>
          <p className="text-muted-foreground">Découvrez tous les vendeurs de notre plateforme</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher un vendeur..." className="pl-8 w-full" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="goodies">Goodies</SelectItem>
              <SelectItem value="fournitures">Fournitures</SelectItem>
              <SelectItem value="papeterie">Papeterie</SelectItem>
              <SelectItem value="evenements">Événements</SelectItem>
              <SelectItem value="projets">Projets étudiants</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="rating">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Meilleures évaluations</SelectItem>
              <SelectItem value="products">Nombre de produits</SelectItem>
              <SelectItem value="reviews">Nombre d'avis</SelectItem>
              <SelectItem value="name">Nom (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={vendor.image || "/placeholder.svg"}
                alt={vendor.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              {vendor.verified && <Badge className="absolute top-2 right-2 bg-teal-500">Vérifié</Badge>}
            </div>
            <CardContent className="p-4 flex-1">
              <Link href={`/vendors/${vendor.id}`}>
                <h2 className="text-xl font-semibold hover:text-teal-600 transition-colors">{vendor.name}</h2>
              </Link>
              <div className="flex items-center mt-1 mb-2">
                <div className="flex items-center">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(vendor.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : i < vendor.rating
                              ? "text-yellow-400 fill-yellow-400 opacity-50"
                              : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  {vendor.rating} ({vendor.reviews} avis)
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{vendor.description}</p>
              <div className="flex flex-wrap gap-1 mt-auto">
                {vendor.categories.map((category, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{vendor.products} produits</span>
              <Button asChild>
                <Link href={`/vendors/${vendor.id}`}>Voir le profil</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
