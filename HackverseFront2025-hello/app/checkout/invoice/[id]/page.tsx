"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Printer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

// Mock data for invoice
const invoice = {
  id: "INV-2023-1234",
  orderNumber: "ORD-1234",
  date: "2023-05-15",
  dueDate: "2023-05-15",
  status: "Paid",
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
    address: {
      street: "123 Campus Street",
      city: "University Town",
      state: "CA",
      zip: "12345",
      country: "United States",
    },
  },
  vendor: {
    name: "EduMarket",
    email: "billing@edumarket.com",
    address: {
      street: "456 Education Avenue",
      city: "Knowledge City",
      state: "ED",
      zip: "67890",
      country: "United States",
    },
    logo: "/placeholder.svg?height=60&width=200",
  },
  items: [
    {
      id: 1,
      name: "Advanced Mathematics Textbook",
      description: "College-level mathematics textbook",
      quantity: 1,
      price: 59.99,
    },
    {
      id: 2,
      name: "Scientific Calculator",
      description: "Professional scientific calculator",
      quantity: 2,
      price: 19.99,
    },
    {
      id: 3,
      name: "Notebook Set",
      description: "Set of 2 college-ruled notebooks",
      quantity: 2,
      price: 9.99,
    },
  ],
  subtotal: 119.95,
  shipping: 10.0,
  tax: 0,
  total: 129.95,
  paymentMethod: "Credit Card (ending in 4242)",
  notes:
    "Thank you for your purchase! If you have any questions about this invoice, please contact our customer support.",
}

export default function InvoicePage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    toast({
      title: "Génération du PDF en cours",
      description: "Veuillez patienter pendant que nous préparons votre facture...",
    })

    try {
      const invoiceElement = document.getElementById("invoice-container")
      if (!invoiceElement) return

      const canvas = await html2canvas(invoiceElement, {
        scale: 2,
        logging: false,
        useCORS: true,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`facture-${invoice.id}.pdf`)

      toast({
        title: "Téléchargement réussi",
        description: "Votre facture a été téléchargée avec succès.",
      })
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/account/orders/${params.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Retour à la commande
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" /> Imprimer
          </Button>
          <Button size="sm" onClick={handleDownloadPDF} disabled={isGenerating}>
            <Download className="h-4 w-4 mr-2" /> Télécharger PDF
          </Button>
        </div>
      </div>

      <Card className="border-2" id="invoice-container">
        <CardContent className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-1">Facture</h1>
              <p className="text-muted-foreground">{invoice.id}</p>
            </div>
            <div className="text-right">
              <div className="relative h-12 w-40">
                <Image
                  src={invoice.vendor.logo || "/placeholder.svg"}
                  alt={invoice.vendor.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="font-semibold text-muted-foreground mb-2">Facturé par:</h3>
              <p className="font-medium">{invoice.vendor.name}</p>
              <p>{invoice.vendor.address.street}</p>
              <p>
                {invoice.vendor.address.city}, {invoice.vendor.address.state} {invoice.vendor.address.zip}
              </p>
              <p>{invoice.vendor.address.country}</p>
              <p className="mt-2">{invoice.vendor.email}</p>
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground mb-2">Facturé à:</h3>
              <p className="font-medium">{invoice.customer.name}</p>
              <p>{invoice.customer.address.street}</p>
              <p>
                {invoice.customer.address.city}, {invoice.customer.address.state} {invoice.customer.address.zip}
              </p>
              <p>{invoice.customer.address.country}</p>
              <p className="mt-2">{invoice.customer.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="font-semibold text-muted-foreground mb-2">Détails de la facture:</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-muted-foreground">Numéro de facture:</p>
                <p>{invoice.id}</p>
                <p className="text-muted-foreground">Numéro de commande:</p>
                <p>{invoice.orderNumber}</p>
                <p className="text-muted-foreground">Date de facturation:</p>
                <p>{invoice.date}</p>
                <p className="text-muted-foreground">Date d'échéance:</p>
                <p>{invoice.dueDate}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground mb-2">Informations de paiement:</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-muted-foreground">Méthode de paiement:</p>
                <p>{invoice.paymentMethod}</p>
                <p className="text-muted-foreground">Statut:</p>
                <p className="text-green-600 font-medium">{invoice.status}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-muted-foreground mb-4">Articles facturés:</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Article</th>
                  <th className="py-2 text-left">Description</th>
                  <th className="py-2 text-right">Qté</th>
                  <th className="py-2 text-right">Prix</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4">{item.name}</td>
                    <td className="py-4 text-muted-foreground">{item.description}</td>
                    <td className="py-4 text-right">{item.quantity}</td>
                    <td className="py-4 text-right">${item.price.toFixed(2)}</td>
                    <td className="py-4 text-right">${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-end">
            <div className="w-80">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Sous-total:</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Frais de livraison:</span>
                <span>${invoice.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Taxes:</span>
                <span>${invoice.tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-2 font-bold">
                <span>Total:</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <h3 className="font-semibold mb-2">Notes:</h3>
            <p className="text-muted-foreground">{invoice.notes}</p>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 p-4 text-center text-sm text-muted-foreground">
          Cette facture est générée automatiquement. Merci pour votre achat!
        </CardFooter>
      </Card>
    </div>
  )
}
