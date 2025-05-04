import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

// Mock data for related news
const relatedNews = [
  {
    id: 2,
    title: "Nouveau vendeur : Club Informatique",
    excerpt:
      "Le Club Informatique rejoint notre plateforme avec une gamme de produits technologiques et des billets pour leurs événements.",
    image: "/placeholder.svg?height=200&width=300",
    date: "28 mai 2023",
    category: "Nouveaux vendeurs",
  },
  {
    id: 3,
    title: "Événement à venir : Gala annuel de l'ENSPY",
    excerpt:
      "Les billets pour le Gala annuel de l'ENSPY sont maintenant disponibles sur notre plateforme. Ne manquez pas cet événement incontournable !",
    image: "/placeholder.svg?height=200&width=300",
    date: "25 mai 2023",
    category: "Événements",
  },
  {
    id: 4,
    title: "Nouvelle collection de goodies ENSPY",
    excerpt:
      "La Boutique Officielle ENSPY lance sa nouvelle collection de goodies pour la rentrée 2023-2024. Découvrez des designs exclusifs !",
    image: "/placeholder.svg?height=200&width=300",
    date: "22 mai 2023",
    category: "Nouveaux produits",
  },
]

export default function RelatedNews({ currentId }: { currentId: number }) {
  // Filter out the current article
  const filteredNews = relatedNews.filter((item) => item.id !== currentId)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {filteredNews.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="relative h-40 w-full">
            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            <div className="absolute top-2 left-2">
              <Badge variant="secondary">{item.category}</Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex items-center text-muted-foreground text-xs mb-2">
              <Calendar className="h-3 w-3 mr-1" />
              {item.date}
            </div>
            <h3 className="font-semibold mb-2 line-clamp-2">
              <Link href={`/community/news/${item.id}`} className="hover:text-teal-600 transition-colors">
                {item.title}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
