import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Share2 } from "lucide-react"
import RelatedNews from "@/components/related-news"

// Mock data for news article
const newsArticle = {
  id: 1,
  title: "Lancement de la nouvelle plateforme e-commerce",
  excerpt:
    "Nous sommes ravis de vous annoncer le lancement officiel de notre nouvelle plateforme e-commerce pour l'établissement.",
  content:
    "Nous sommes ravis de vous annoncer le lancement officiel de notre nouvelle plateforme e-commerce pour l'établissement. Cette plateforme a été conçue pour faciliter les achats de fournitures, goodies et billets d'événements au sein de notre communauté éducative.\n\nParmi les fonctionnalités clés, vous trouverez :\n- Un catalogue organisé avec gestion des stocks en temps réel\n- Un processus d'achat fluide avec plusieurs options de paiement\n- Un système de livraison par étudiants relais\n- Des statistiques détaillées pour les vendeurs\n\nNous vous invitons à créer votre compte dès maintenant et à découvrir les nombreux produits déjà disponibles sur la plateforme.\n\nCette initiative s'inscrit dans notre volonté de moderniser les services proposés à notre communauté et de faciliter la vie quotidienne sur le campus. En centralisant les ventes de produits et de billets d'événements, nous espérons créer un écosystème dynamique qui profitera à tous.\n\nLes vendeurs bénéficieront d'une visibilité accrue et d'outils de gestion performants, tandis que les acheteurs pourront facilement trouver et acheter les produits dont ils ont besoin. Le système de livraison par étudiants relais permettra également de créer des opportunités de revenus complémentaires pour les étudiants.\n\nNous tenons à remercier toutes les personnes qui ont contribué à ce projet, notamment l'équipe de développement, les associations étudiantes et l'administration de l'établissement. Votre soutien et vos retours ont été précieux pour créer une plateforme qui répond aux besoins de tous.\n\nN'hésitez pas à nous faire part de vos commentaires et suggestions pour améliorer encore davantage cette plateforme. Nous sommes à l'écoute de vos besoins et continuerons à développer de nouvelles fonctionnalités pour enrichir votre expérience.",
  image: "/placeholder.svg?height=600&width=1200",
  date: "30 mai 2023",
  author: {
    name: "Équipe EduMarket",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Administrateur",
    initials: "EM",
  },
  category: "Annonces",
  featured: true,
  tags: ["Lancement", "Plateforme", "E-commerce", "Nouveauté"],
}

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/community">
          <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux actualités
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Badge className="mb-4">{newsArticle.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{newsArticle.title}</h1>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={newsArticle.author.avatar || "/placeholder.svg"} alt={newsArticle.author.name} />
              <AvatarFallback>{newsArticle.author.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{newsArticle.author.name}</div>
              <div className="text-sm text-muted-foreground">{newsArticle.author.role}</div>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {newsArticle.date}
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
          <Image src={newsArticle.image || "/placeholder.svg"} alt={newsArticle.title} fill className="object-cover" />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          {newsArticle.content.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("- ")) {
              // Handle lists
              return (
                <ul key={index} className="my-4">
                  {paragraph
                    .split("\n")
                    .map((item) => item.replace("- ", ""))
                    .map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                </ul>
              )
            }
            return <p key={index}>{paragraph}</p>
          })}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {newsArticle.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center mb-12">
          <Button variant="outline" asChild>
            <Link href="/community">Retour aux actualités</Link>
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" /> Partager
          </Button>
        </div>

        <Separator className="mb-12" />

        <div>
          <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
          <RelatedNews currentId={newsArticle.id} />
        </div>
      </div>
    </div>
  )
}
