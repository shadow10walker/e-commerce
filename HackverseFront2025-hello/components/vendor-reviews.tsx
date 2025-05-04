"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"

// Mock data for vendor reviews
const vendorReviews = [
  {
    id: 1,
    user: {
      name: "Jean Dupont",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
    },
    rating: 5,
    date: "Il y a 2 jours",
    comment:
      "Excellent service ! Les produits sont de très bonne qualité et la livraison a été rapide. Je recommande vivement cette boutique à tous les étudiants de l'ENSPY.",
  },
  {
    id: 2,
    user: {
      name: "Marie Leclerc",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ML",
    },
    rating: 4,
    date: "Il y a 1 semaine",
    comment:
      "Très satisfaite de mon achat. Les articles sont conformes à la description et le personnel est très aimable. Seul petit bémol : le délai de livraison un peu long.",
  },
  {
    id: 3,
    user: {
      name: "Pierre Martin",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PM",
    },
    rating: 5,
    date: "Il y a 2 semaines",
    comment:
      "J'ai acheté plusieurs fois dans cette boutique et je n'ai jamais été déçu. Les prix sont raisonnables et la qualité est au rendez-vous. Je recommande !",
  },
  {
    id: 4,
    user: {
      name: "Sophie Dubois",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SD",
    },
    rating: 3,
    date: "Il y a 1 mois",
    comment:
      "Les produits sont bons mais j'ai eu un problème avec ma commande. Heureusement, le service client a été réactif et a résolu le problème rapidement.",
  },
  {
    id: 5,
    user: {
      name: "Thomas Bernard",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TB",
    },
    rating: 5,
    date: "Il y a 1 mois",
    comment:
      "Parfait ! J'ai commandé des fournitures pour toute mon année et tout est arrivé en parfait état. Les prix sont très compétitifs par rapport aux magasins en ville.",
  },
]

export default function VendorReviews({ vendorId }: { vendorId: number }) {
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmitReview = () => {
    // Logic to submit review would go here
    alert("Votre avis a été soumis avec succès !")
    setNewReview("")
    setRating(0)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Avis clients</h2>
        <div className="text-sm text-muted-foreground">
          Note moyenne : <span className="font-bold text-foreground">4.4/5</span> basée sur{" "}
          <span className="font-bold text-foreground">{vendorReviews.length}</span> avis
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Laisser un avis</h3>
          <div className="flex items-center mb-4">
            <div className="mr-2">Votre note :</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= (hoveredRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <Textarea
            placeholder="Partagez votre expérience avec ce vendeur..."
            className="mb-4"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <Button onClick={handleSubmitReview} disabled={!rating || !newReview.trim()}>
            Soumettre
          </Button>
        </div>

        {vendorReviews.map((review) => (
          <div key={review.id}>
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                <AvatarFallback>{review.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{review.user.name}</h4>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex items-center mt-1">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                </div>
                <p className="mt-2 text-muted-foreground">{review.comment}</p>
              </div>
            </div>
            <Separator className="my-4" />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Voir plus d'avis</Button>
      </div>
    </div>
  )
}
