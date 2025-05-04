"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const shipping = items.length > 0 ? 1000 : 0
  const total = subtotal + shipping - discount

  const handleApplyPromoCode = () => {
    // Mock promo code validation
    if (promoCode.toLowerCase() === "edupromo") {
      const discountAmount = Math.round(subtotal * 0.1) // 10% discount
      setDiscount(discountAmount)
      toast({
        title: "Code promo appliqué",
        description: `Vous avez obtenu une réduction de ${discountAmount.toLocaleString()} FCFA.`,
      })
    } else {
      toast({
        title: "Code promo invalide",
        description: "Le code promo saisi n'est pas valide ou a expiré.",
        variant: "destructive",
      })
    }

    setPromoCode("")
  }

  const handleRemoveItem = (id: number) => {
    removeItem(id)
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier.",
    })
  }

  const handleClearCart = () => {
    clearCart()
    toast({
      title: "Panier vidé",
      description: "Tous les produits ont été retirés de votre panier.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panier</h1>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Articles ({items.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id}>
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                            {item.name}
                          </Link>
                          <div className="font-bold">{(item.price * item.quantity).toLocaleString()} FCFA</div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {item.variant?.color && `Couleur: ${item.variant.color}`}
                          {item.variant?.color && item.variant?.size && " | "}
                          {item.variant?.size && `Taille: ${item.variant.size}`}
                          {item.variant?.type && `Type: ${item.variant.type}`}
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <div className="border-y border-x-0 h-8 px-3 flex items-center">{item.quantity}</div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Link href="/products" className="flex items-center">
                    Continuer les achats
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Vider le panier</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Vider le panier</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir vider votre panier ? Cette action ne peut pas être annulée.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearCart}>Confirmer</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{subtotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frais de livraison</span>
                  <span>{shipping.toLocaleString()} FCFA</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Réduction</span>
                    <span>-{discount.toLocaleString()} FCFA</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{total.toLocaleString()} FCFA</span>
                </div>

                <div className="pt-4">
                  <div className="mb-2 text-sm font-medium">Code promo</div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Entrez votre code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={handleApplyPromoCode} disabled={!promoCode}>
                      Appliquer
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" asChild disabled={items.length === 0}>
                  <Link href="/checkout">
                    Passer à la caisse <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Votre panier est vide</h2>
          <p className="text-muted-foreground mb-6">Vous n'avez pas encore ajouté d'articles à votre panier.</p>
          <Button asChild size="lg">
            <Link href="/products">Découvrir les produits</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
