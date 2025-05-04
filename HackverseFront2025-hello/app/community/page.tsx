import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Calendar, MessageSquare, ThumbsUp, Users } from "lucide-react"
import CommunityNewsletter from "@/components/community-newsletter"

// Mock data for news
const news = [
  {
    id: 1,
    title: "Lancement de la nouvelle plateforme e-commerce",
    excerpt:
      "Nous sommes ravis de vous annoncer le lancement officiel de notre nouvelle plateforme e-commerce pour l'établissement.",
    content:
      "Nous sommes ravis de vous annoncer le lancement officiel de notre nouvelle plateforme e-commerce pour l'établissement. Cette plateforme a été conçue pour faciliter les achats de fournitures, goodies et billets d'événements au sein de notre communauté éducative.\n\nParmi les fonctionnalités clés, vous trouverez :\n- Un catalogue organisé avec gestion des stocks en temps réel\n- Un processus d'achat fluide avec plusieurs options de paiement\n- Un système de livraison par étudiants relais\n- Des statistiques détaillées pour les vendeurs\n\nNous vous invitons à créer votre compte dès maintenant et à découvrir les nombreux produits déjà disponibles sur la plateforme.",
    image: "/placeholder.svg?height=400&width=600",
    date: "30 mai 2023",
    author: {
      name: "Équipe EduMarket",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Administrateur",
    },
    category: "Annonces",
    featured: true,
  },
  {
    id: 2,
    title: "Nouveau vendeur : Club Informatique",
    excerpt:
      "Le Club Informatique rejoint notre plateforme avec une gamme de produits technologiques et des billets pour leurs événements.",
    content:
      "Le Club Informatique rejoint notre plateforme avec une gamme de produits technologiques et des billets pour leurs événements. Fondé en 2010, le Club Informatique est l'une des associations les plus actives de notre établissement.\n\nLeur boutique proposera :\n- Des accessoires informatiques personnalisés\n- Des t-shirts et goodies à l'effigie du club\n- Des billets pour leurs ateliers et conférences\n- Des services de réparation et de conseil\n\nPour célébrer leur arrivée, ils offrent une réduction de 10% sur tous leurs produits jusqu'à la fin du mois. N'hésitez pas à visiter leur boutique !",
    image: "/placeholder.svg?height=400&width=600",
    date: "28 mai 2023",
    author: {
      name: "Marie Leclerc",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Responsable partenariats",
    },
    category: "Nouveaux vendeurs",
    featured: false,
  },
  {
    id: 3,
    title: "Événement à venir : Gala annuel de l'ENSPY",
    excerpt:
      "Les billets pour le Gala annuel de l'ENSPY sont maintenant disponibles sur notre plateforme. Ne manquez pas cet événement incontournable !",
    content:
      "Les billets pour le Gala annuel de l'ENSPY sont maintenant disponibles sur notre plateforme. Ne manquez pas cet événement incontournable de la vie étudiante !\n\nLe Gala aura lieu le 15 juin 2023 à partir de 19h dans la grande salle de réception du campus. Au programme : dîner de gala, remise des prix d'excellence, spectacles et soirée dansante.\n\nPlusieurs catégories de billets sont disponibles :\n- Billet standard : 10 000 FCFA\n- Billet premium (avec place réservée) : 15 000 FCFA\n- Pack groupe (5 personnes) : 45 000 FCFA\n\nLes places sont limitées, alors réservez vos billets dès maintenant !",
    image: "/placeholder.svg?height=400&width=600",
    date: "25 mai 2023",
    author: {
      name: "Association des Étudiants",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Organisateur",
    },
    category: "Événements",
    featured: true,
  },
  {
    id: 4,
    title: "Nouvelle collection de goodies ENSPY",
    excerpt:
      "La Boutique Officielle ENSPY lance sa nouvelle collection de goodies pour la rentrée 2023-2024. Découvrez des designs exclusifs !",
    content:
      "La Boutique Officielle ENSPY lance sa nouvelle collection de goodies pour la rentrée 2023-2024. Découvrez des designs exclusifs créés par des étudiants en arts graphiques de notre établissement.\n\nCette nouvelle collection comprend :\n- T-shirts et sweats à capuche avec de nouveaux motifs\n- Mugs et gourdes isothermes\n- Casquettes et accessoires\n- Papeterie et fournitures aux couleurs de l'école\n\nUne partie des bénéfices sera reversée à l'association des étudiants pour financer les projets associatifs de l'année. Profitez d'une réduction de 15% pour tout achat de la nouvelle collection avant le 15 juin !",
    image: "/placeholder.svg?height=400&width=600",
    date: "22 mai 2023",
    author: {
      name: "Boutique Officielle ENSPY",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Vendeur",
    },
    category: "Nouveaux produits",
    featured: false,
  },
  {
    id: 5,
    title: "Programme de livraison par étudiants : recrutement ouvert",
    excerpt:
      "Nous recherchons des étudiants relais pour notre programme de livraison sur le campus. Gagnez un revenu complémentaire !",
    content:
      "Nous recherchons des étudiants relais pour notre programme de livraison sur le campus. Gagnez un revenu complémentaire tout en aidant votre communauté !\n\nEn tant qu'étudiant livreur, vous pourrez :\n- Définir vos propres horaires en fonction de votre emploi du temps\n- Recevoir une commission de 10% sur chaque livraison effectuée\n- Accéder à des statistiques détaillées sur vos performances\n- Bénéficier de formations et d'un accompagnement personnalisé\n\nPour postuler, il vous suffit de créer un compte sur la plateforme et de remplir le formulaire dans la section \"Devenir livreur\". Les candidats sélectionnés seront contactés pour une courte session d'information.",
    image: "/placeholder.svg?height=400&width=600",
    date: "20 mai 2023",
    author: {
      name: "Équipe EduMarket",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Administrateur",
    },
    category: "Opportunités",
    featured: false,
  },
]

// Mock data for events
const events = [
  {
    id: 1,
    title: "Gala annuel de l'ENSPY",
    date: "15 juin 2023",
    time: "19:00",
    location: "Grande salle de réception, Campus principal",
    organizer: "Association des Étudiants",
    image: "/placeholder.svg?height=200&width=300",
    ticketPrice: "10 000 - 15 000 FCFA",
    featured: true,
  },
  {
    id: 2,
    title: "Hackathon Innovation Tech",
    date: "10-12 juin 2023",
    time: "48 heures non-stop",
    location: "Département Informatique",
    organizer: "Club Informatique",
    image: "/placeholder.svg?height=200&width=300",
    ticketPrice: "5 000 FCFA",
    featured: false,
  },
  {
    id: 3,
    title: "Conférence sur l'Intelligence Artificielle",
    date: "5 juin 2023",
    time: "14:00 - 17:00",
    location: "Amphithéâtre A",
    organizer: "Département Informatique",
    image: "/placeholder.svg?height=200&width=300",
    ticketPrice: "Gratuit",
    featured: false,
  },
  {
    id: 4,
    title: "Tournoi sportif inter-filières",
    date: "20-22 juin 2023",
    time: "9:00 - 18:00",
    location: "Complexe sportif",
    organizer: "Association Sportive",
    image: "/placeholder.svg?height=200&width=300",
    ticketPrice: "2 000 FCFA",
    featured: true,
  },
]

// Mock data for forum discussions
const discussions = [
  {
    id: 1,
    title: "Quels sont vos produits préférés sur la plateforme ?",
    author: {
      name: "Jean Dupont",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
    },
    date: "Il y a 2 jours",
    replies: 15,
    likes: 8,
    lastReply: "Il y a 3 heures",
    category: "Général",
  },
  {
    id: 2,
    title: "Suggestions pour améliorer le système de livraison",
    author: {
      name: "Marie Leclerc",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ML",
    },
    date: "Il y a 4 jours",
    replies: 23,
    likes: 17,
    lastReply: "Il y a 1 jour",
    category: "Suggestions",
  },
  {
    id: 3,
    title: "Recherche coéquipiers pour le Hackathon Innovation Tech",
    author: {
      name: "Pierre Martin",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PM",
    },
    date: "Il y a 1 semaine",
    replies: 8,
    likes: 5,
    lastReply: "Il y a 2 jours",
    category: "Événements",
  },
  {
    id: 4,
    title: "Avis sur les nouveaux t-shirts de la Boutique Officielle",
    author: {
      name: "Sophie Dubois",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SD",
    },
    date: "Il y a 5 jours",
    replies: 12,
    likes: 9,
    lastReply: "Il y a 12 heures",
    category: "Avis produits",
  },
  {
    id: 5,
    title: "Comment devenir vendeur sur la plateforme ?",
    author: {
      name: "Thomas Bernard",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TB",
    },
    date: "Il y a 3 jours",
    replies: 7,
    likes: 3,
    lastReply: "Il y a 1 jour",
    category: "Questions",
  },
]

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Communauté</h1>
          <p className="text-muted-foreground">
            Restez informé des dernières actualités et événements de notre plateforme
          </p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button asChild>
            <Link href="/community/forum/new">
              <MessageSquare className="mr-2 h-4 w-4" /> Nouvelle discussion
            </Link>
          </Button>
        </div>
      </div>

      {/* Featured News */}
      {news.filter((item) => item.featured).length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">À la une</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news
              .filter((item) => item.featured)
              .map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-teal-500">{item.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      <Link href={`/community/news/${item.id}`} className="hover:text-teal-600 transition-colors">
                        {item.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {item.date} • Par {item.author.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href={`/community/news/${item.id}`}>
                        Lire la suite <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      )}

      <Tabs defaultValue="news" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="news">Actualités</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
          <TabsTrigger value="forum">Forum</TabsTrigger>
        </TabsList>
        <TabsContent value="news">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <Card key={item.id} className="overflow-hidden flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">
                    <Link href={`/community/news/${item.id}`} className="hover:text-teal-600 transition-colors">
                      {item.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {item.date} • Par {item.author.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3">{item.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="p-0 h-auto text-teal-600 hover:text-teal-700">
                    <Link href={`/community/news/${item.id}`}>
                      Lire la suite <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/community/news">Voir toutes les actualités</Link>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-48 md:h-auto md:w-1/3">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    {event.featured && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-teal-500">À la une</Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold mb-2">
                      <Link href={`/community/events/${event.id}`} className="hover:text-teal-600 transition-colors">
                        {event.title}
                      </Link>
                    </h3>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mt-0.5" />
                      <div>
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Lieu:</span> {event.location}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      <span className="font-medium">Organisateur:</span> {event.organizer}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{event.ticketPrice}</span>
                      <Button asChild size="sm">
                        <Link href={`/products?category=evenements&event=${event.id}`}>Acheter un billet</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/community/events">Voir tous les événements</Link>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="forum">
          <div className="rounded-md border">
            <div className="bg-muted/50 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">Discussions récentes</h3>
              </div>
              <Button asChild size="sm">
                <Link href="/community/forum/new">Nouvelle discussion</Link>
              </Button>
            </div>
            <div className="divide-y">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} alt={discussion.author.name} />
                      <AvatarFallback>{discussion.author.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">
                            <Link
                              href={`/community/forum/${discussion.id}`}
                              className="hover:text-teal-600 transition-colors"
                            >
                              {discussion.title}
                            </Link>
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <span>{discussion.author.name}</span>
                            <span>•</span>
                            <span>{discussion.date}</span>
                            <span>•</span>
                            <Badge variant="outline">{discussion.category}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {discussion.replies}
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {discussion.likes}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Dernière réponse: {discussion.lastReply}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/community/forum">Voir toutes les discussions</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Nouveaux vendeurs</CardTitle>
              <CardDescription>Découvrez les derniers vendeurs qui ont rejoint notre plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    name: "Club Informatique",
                    description: "Produits et services proposés par le club informatique de l'établissement.",
                    image: "/placeholder.svg?height=100&width=100",
                    products: 15,
                    joined: "Il y a 3 jours",
                  },
                  {
                    name: "Projet Étudiant EcoDesign",
                    description: "Produits écologiques conçus par des étudiants en design.",
                    image: "/placeholder.svg?height=100&width=100",
                    products: 8,
                    joined: "Il y a 1 semaine",
                  },
                  {
                    name: "Club Arts & Culture",
                    description: "Produits artisanaux et billets d'événements culturels.",
                    image: "/placeholder.svg?height=100&width=100",
                    products: 16,
                    joined: "Il y a 2 semaines",
                  },
                ].map((vendor, index) => (
                  <div key={index}>
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden">
                        <Image
                          src={vendor.image || "/placeholder.svg"}
                          alt={vendor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">
                          <Link href={`/vendors/${index + 2}`} className="hover:text-teal-600 transition-colors">
                            {vendor.name}
                          </Link>
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{vendor.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                          <span>{vendor.products} produits</span>
                          <span>•</span>
                          <span>A rejoint {vendor.joined}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/vendors/${index + 2}`}>Voir le profil</Link>
                      </Button>
                    </div>
                    {index < 2 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/vendors">
                  Voir tous les vendeurs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <CommunityNewsletter />
        </div>
      </div>
    </div>
  )
}
