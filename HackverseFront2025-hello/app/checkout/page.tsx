"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Home, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

export default function ConfirmationPage() {
  const { items, clearCart, subtotal } = useCart()
  const router = useRouter()

  const orderNumber = "CMD-" + Math.floor(100000 + Math.random() * 900000)
  const orderDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const shipping = 1000
  const total = subtotal + shipping

  // Clear cart after successful order
  useEffect(() => {
    // If there are no items and we're not coming from a cart page, redirect to home
    if (items.length === 0) {
      router.push("/")
      return
    }

    // Clear cart after a short delay to ensure the page has loaded
    const timer = setTimeout(() => {
      clearCart()
    }, 1000)

    return () => clearTimeout(timer)
  }, [items.length, clearCart, router])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Commande confirmée !</h1>
        <p className="text-muted-foreground">
          Merci pour votre commande. Vous recevrez un email de confirmation avec les détails de votre achat.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Détails de la commande</CardTitle>
          <CardDescription>
            Commande #{orderNumber} | {orderDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Informations de livraison</h3>
              <div className="text-sm text-muted-foreground">
                <p>Jean Dupont</p>
                <p>Campus ENSPY, Bâtiment A</p>
                <p>Yaoundé, Cameroun</p>
                <p>+237 6XX XX XX XX</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Méthode de paiement</h3>
              <div className="text-sm text-muted-foreground">
                <p>Paiement par Mobile Money</p>
                <p>MTN Mobile Money</p>
                <p>+237 6XX XX XX XX</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Méthode de livraison</h3>
            <div className="text-sm text-muted-foreground">
              <p>Livraison standard (2-3 jours)</p>
              <p>Livraison par un étudiant relais selon son planning</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-4">Récapitulatif de la commande</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} {item.variant?.color ? `(${item.variant.color})` : ""}
                    {item.variant?.size ? `, ${item.variant.size}` : ""} (x{item.quantity})
                  </span>
                  <span>{(item.price * item.quantity).toLocaleString()} FCFA</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{subtotal.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frais de livraison</span>
                <span>{shipping.toLocaleString()} FCFA</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{total.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Retour à l'accueil
            </Link>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/account/orders">
              <ShoppingBag className="mr-2 h-4 w-4" /> Voir mes commandes
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link href={`/checkout/invoice/${orderNumber}`}>
              <Download className="mr-2 h-4 w-4" /> Télécharger la facture
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
