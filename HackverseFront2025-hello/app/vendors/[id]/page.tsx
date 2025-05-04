import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ExternalLink, Mail, MapPin, Phone, Star, Store, Users } from "lucide-react"
import VendorProducts from "@/components/vendor-products"
import VendorReviews from "@/components/vendor-reviews"

// Mock data for vendor
const vendor = {
  id: 1,
  name: "Boutique Officielle ENSPY",
  description:
    "La boutique officielle de l'École Nationale Supérieure Polytechnique de Yaoundé. Nous proposons une large gamme de produits à l'effigie de l'école, des fournitures scolaires et des articles de papeterie pour tous les étudiants et le personnel de l'établissement.",
  longDescription:
    "Fondée en 2015, la Boutique Officielle ENSPY est le point de vente central pour tous les produits officiels de l'École Nationale Supérieure Polytechnique de Yaoundé. Notre mission est de fournir des produits de qualité qui reflètent l'identité et les valeurs de notre institution.\n\nNous travaillons en étroite collaboration avec l'administration et les associations étudiantes pour proposer des articles qui répondent aux besoins spécifiques de notre communauté académique. Tous nos produits sont soigneusement sélectionnés et conçus pour offrir le meilleur rapport qualité-prix.\n\nEn plus de notre gamme standard, nous proposons régulièrement des collections limitées et des éditions spéciales pour les événements importants de l'école. N'hésitez pas à nous contacter pour toute demande spécifique ou personnalisation.",
  image: "/placeholder.svg?height=400&width=400",
  coverImage: "/placeholder.svg?height=400&width=1200",
  logo: "/placeholder.svg?height=200&width=200",
  rating: 4.8,
  reviews: 56,
  products: 24,
  categories: ["Goodies", "Fournitures", "Papeterie"],
  verified: true,
  contact: {
    email: "boutique@enspy.cm",
    phone: "+237 6XX XX XX XX",
    address: "Campus ENSPY, Bâtiment Principal, Yaoundé, Cameroun",
    website: "https://boutique.enspy.cm",
  },
  socialMedia: {
    facebook: "https://facebook.com/enspyboutique",
    instagram: "https://instagram.com/enspyboutique",
    twitter: "https://twitter.com/enspyboutique",
  },
  openingHours: [
    { day: "Lundi", hours: "08:00 - 16:00" },
    { day: "Mardi", hours: "08:00 - 16:00" },
    { day: "Mercredi", hours: "08:00 - 16:00" },
    { day: "Jeudi", hours: "08:00 - 16:00" },
    { day: "Vendredi", hours: "08:00 - 16:00" },
    { day: "Samedi", hours: "09:00 - 12:00" },
    { day: "Dimanche", hours: "Fermé" },
  ],
  team: [
    { name: "Jean Dupont", role: "Responsable", image: "/placeholder.svg?height=100&width=100" },
    { name: "Marie Leclerc", role: "Assistante", image: "/placeholder.svg?height=100&width=100" },
    { name: "Pierre Martin", role: "Vendeur", image: "/placeholder.svg?height=100&width=100" },
  ],
  stats: {
    founded: "2015",
    customers: "1200+",
    orders: "3500+",
    satisfaction: "98%",
  },
}

export default function VendorPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/vendors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux vendeurs
        </Link>
      </Button>

      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8">
        <Image
          src={vendor.coverImage || "/placeholder.svg"}
          alt={`Couverture de ${vendor.name}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 flex items-end">
          <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden border-4 border-white bg-white">
            <Image src={vendor.logo || "/placeholder.svg"} alt={vendor.name} fill className="object-cover" />
          </div>
          <div className="ml-4 text-white">
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold">{vendor.name}</h1>
              {vendor.verified && <Badge className="ml-2 bg-teal-500">Vérifié</Badge>}
            </div>
            <div className="flex items-center mt-1">
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
              <span className="ml-2 text-sm">
                {vendor.rating} ({vendor.reviews} avis)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="products">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="products">Produits</TabsTrigger>
              <TabsTrigger value="about">À propos</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({vendor.reviews})</TabsTrigger>
            </TabsList>
            <TabsContent value="products">
              <VendorProducts vendorId={vendor.id} />
            </TabsContent>
            <TabsContent value="about">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">À propos de {vendor.name}</h2>
                  <div className="text-muted-foreground whitespace-pre-line">{vendor.longDescription}</div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Notre équipe</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {vendor.team.map((member, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="relative h-16 w-16 rounded-full overflow-hidden">
                            <Image
                              src={member.image || "/placeholder.svg"}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Quelques chiffres</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-muted-foreground text-sm">Fondé en</p>
                        <p className="text-2xl font-bold">{vendor.stats.founded}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-muted-foreground text-sm">Clients</p>
                        <p className="text-2xl font-bold">{vendor.stats.customers}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-muted-foreground text-sm">Commandes</p>
                        <p className="text-2xl font-bold">{vendor.stats.orders}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-muted-foreground text-sm">Satisfaction</p>
                        <p className="text-2xl font-bold">{vendor.stats.satisfaction}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <VendorReviews vendorId={vendor.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Informations de contact</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-sm text-muted-foreground">{vendor.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-sm text-muted-foreground">{vendor.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{vendor.contact.email}</p>
                  </div>
                </div>
                {vendor.contact.website && (
                  <div className="flex items-start gap-3">
                    <ExternalLink className="h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Site web</p>
                      <a
                        href={vendor.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-teal-600 hover:underline"
                      >
                        {vendor.contact.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <h3 className="text-lg font-semibold mb-4">Horaires d'ouverture</h3>
              <div className="space-y-2">
                {vendor.openingHours.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium">{item.day}</span>
                    <span className="text-muted-foreground">{item.hours}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <h3 className="text-lg font-semibold mb-4">Catégories</h3>
              <div className="flex flex-wrap gap-2">
                {vendor.categories.map((category, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800">
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="mt-6">
                <Button className="w-full">
                  <Store className="mr-2 h-4 w-4" /> Visiter la boutique
                </Button>
                <Button variant="outline" className="w-full mt-2">
                  <Users className="mr-2 h-4 w-4" /> Suivre ce vendeur
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
