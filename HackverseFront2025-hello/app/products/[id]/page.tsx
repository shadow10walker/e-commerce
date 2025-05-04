"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"
import RelatedProducts from "@/components/related-products"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"

// Mock product data
const product = {
  id: 1,
  name: "T-shirt ENSPY",
  price: 5000,
  description:
    "T-shirt officiel de l'ENSPY avec logo brodé. Fabriqué en coton de haute qualité pour un confort optimal. Disponible en plusieurs tailles et couleurs.",
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  category: "Goodies",
  inStock: true,
  stockQuantity: 25,
  rating: 4.5,
  reviews: 12,
  seller: {
    name: "Boutique Officielle ENSPY",
    rating: 4.8,
    products: 24,
  },
  variants: {
    colors: ["Noir", "Blanc", "Bleu"],
    sizes: ["S", "M", "L", "XL"],
  },
  features: ["100% coton", "Logo brodé", "Col rond", "Manches courtes", "Lavable en machine"],
  delivery: {
    options: [
      {
        name: "Standard",
        price: 1000,
        time: "2-3 jours",
      },
      {
        name: "Express",
        price: 2000,
        time: "24 heures",
      },
    ],
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedDelivery, setSelectedDelivery] = useState("standard")

  const { addItem } = useCart()
  const { toast } = useToast()

  const incrementQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    if (!product.inStock) return

    // Validate required selections
    if (product.variants.colors.length > 0 && !selectedColor) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner une couleur",
        variant: "destructive",
      })
      return
    }

    if (product.variants.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner une taille",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      variant: {
        color: selectedColor || undefined,
        size: selectedSize || undefined,
      },
    })

    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name} a été ajouté à votre panier.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2 space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square overflow-hidden rounded-md border cursor-pointer ${
                  selectedImage === index
                    ? "border-primary ring-2 ring-primary ring-opacity-50"
                    : "hover:border-primary"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Vue ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/products" className="hover:underline">
                  Produits
                </Link>
                <span>/</span>
                <Link href={`/products/category/${product.category.toLowerCase()}`} className="hover:underline">
                  {product.category}
                </Link>
              </div>
              <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : i < product.rating
                              ? "text-yellow-400 fill-yellow-400 opacity-50"
                              : "text-gray-300"
                        }`}
                      />
                    ))}
                  <span className="ml-2 text-sm text-muted-foreground">({product.reviews} avis)</span>
                </div>
                <Badge variant={product.inStock ? "outline" : "destructive"} className="text-xs">
                  {product.inStock
                    ? product.stockQuantity > 10
                      ? "En stock"
                      : `Plus que ${product.stockQuantity} en stock`
                    : "Rupture de stock"}
                </Badge>
              </div>
            </div>

            <div className="text-2xl font-bold">{product.price.toLocaleString()} FCFA</div>

            <p className="text-muted-foreground">{product.description}</p>

            <Separator />

            <div className="space-y-4">
              {product.variants.colors.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-1 block">Couleur</label>
                  <div className="flex gap-2">
                    {product.variants.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        className="rounded-md px-4"
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {product.variants.sizes.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-1 block">Taille</label>
                  <div className="flex gap-2">
                    {product.variants.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        className="rounded-md w-12 h-12"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-1 block">Quantité</label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-r-none"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="border-y px-4 py-2">{quantity}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-l-none"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stockQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Ajouter au panier
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Truck className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Options de livraison</h3>
                    <Select defaultValue="standard" value={selectedDelivery} onValueChange={setSelectedDelivery}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Choisir une option" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.delivery.options.map((option) => (
                          <SelectItem key={option.name.toLowerCase()} value={option.name.toLowerCase()}>
                            {option.name} - {option.price.toLocaleString()} FCFA ({option.time})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-sm">
              <div className="font-medium">Vendu par</div>
              <Link href="#" className="text-teal-600 hover:underline">
                {product.seller.name}
              </Link>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.seller.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                <span className="ml-2 text-xs text-muted-foreground">{product.seller.products} produits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">Détails du produit</TabsTrigger>
            <TabsTrigger value="reviews">Avis ({product.reviews})</TabsTrigger>
            <TabsTrigger value="delivery">Livraison et retours</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
                <h3 className="text-lg font-semibold mt-6 mb-4">Caractéristiques</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg border">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Détails du produit"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold">{product.rating}</div>
                <div>
                  <div className="flex items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : i < product.rating
                                ? "text-yellow-400 fill-yellow-400 opacity-50"
                                : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Basé sur {product.reviews} avis</div>
                </div>
                <div className="ml-auto">
                  <Button>Écrire un avis</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-6">
                {/* Mock reviews */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                        JD
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Jean Dupont</h4>
                        <span className="text-sm text-muted-foreground">Il y a 2 jours</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        Excellent t-shirt, très confortable et de bonne qualité. La taille correspond parfaitement et
                        les finitions sont soignées.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-4">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                        ML
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Marie Leclerc</h4>
                        <span className="text-sm text-muted-foreground">Il y a 1 semaine</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        Bon produit, mais la couleur est légèrement différente de celle présentée sur les photos. Sinon,
                        la qualité est au rendez-vous.
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Voir plus d'avis
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="delivery" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Options de livraison</h3>
                <div className="space-y-4">
                  {product.delivery.options.map((option) => (
                    <div key={option.name} className="flex items-start gap-4 p-4 border rounded-lg">
                      <Truck className="h-5 w-5 text-teal-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">{option.name}</h4>
                        <p className="text-muted-foreground">Délai de livraison estimé: {option.time}</p>
                        <p className="font-medium mt-1">{option.price.toLocaleString()} FCFA</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Politique de retour</h3>
                <p className="text-muted-foreground">
                  Les retours sont acceptés dans un délai de 7 jours après réception du produit. Le produit doit être
                  dans son état d'origine, non utilisé et dans son emballage d'origine.
                </p>
                <p className="text-muted-foreground mt-2">
                  Pour effectuer un retour, veuillez contacter notre service client ou vous rendre au point de vente de
                  l'établissement.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
        <RelatedProducts />
      </div>
    </div>
  )
}
