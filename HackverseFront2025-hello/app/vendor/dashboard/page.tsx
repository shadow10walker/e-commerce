import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, DollarSign, Package, PlusCircle, ShoppingBag, TrendingUp, Users } from "lucide-react"
import VendorSalesChart from "@/components/vendor-sales-chart"
import VendorScheduler from "@/components/vendor-scheduler"

export default function VendorDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord vendeur</h1>
          <p className="text-muted-foreground">Gérez vos produits, commandes et planifiez vos livraisons</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button asChild>
            <Link href="/vendor/products/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Ajouter un produit
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ventes totales</p>
                <h3 className="text-2xl font-bold mt-1">125 000 FCFA</h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12% ce mois
                </p>
              </div>
              <div className="bg-teal-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-teal-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Commandes</p>
                <h3 className="text-2xl font-bold mt-1">24</h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +5% ce mois
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Produits</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
                <p className="text-xs text-yellow-600 mt-1 flex items-center">
                  <Package className="h-3 w-3 mr-1" /> 2 en rupture
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clients</p>
                <h3 className="text-2xl font-bold mt-1">18</h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <Users className="h-3 w-3 mr-1" /> +3 nouveaux
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Aperçu des ventes</CardTitle>
            <CardDescription>Vos ventes des 30 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <VendorSalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
            <CardDescription>Les 5 dernières commandes reçues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((order) => (
                <div key={order} className="flex items-start gap-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                      {order % 2 === 0 ? "JD" : "ML"}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Commande #{order + 10000}</h4>
                      <Badge variant={order % 3 === 0 ? "outline" : "default"}>
                        {order % 3 === 0 ? "En attente" : "Confirmée"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order % 2 === 0 ? "Jean Dupont" : "Marie Leclerc"} - {(order * 5000).toLocaleString()} FCFA
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Il y a {order} heure{order > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/vendor/orders">
                Voir toutes les commandes <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Planification des livraisons</CardTitle>
            <CardDescription>Gérez votre emploi du temps et planifiez vos livraisons</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="schedule">
              <TabsList className="mb-4">
                <TabsTrigger value="schedule">Emploi du temps</TabsTrigger>
                <TabsTrigger value="deliveries">Livraisons planifiées</TabsTrigger>
              </TabsList>
              <TabsContent value="schedule">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center">
                      <Calendar className="mr-2 h-4 w-4" /> Votre emploi du temps
                    </h3>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>
                  <VendorScheduler />
                </div>
              </TabsContent>
              <TabsContent value="deliveries">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Commande</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Date de livraison</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Livreur</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[1, 2, 3, 4].map((delivery) => (
                        <TableRow key={delivery}>
                          <TableCell className="font-medium">#{delivery + 10000}</TableCell>
                          <TableCell>{delivery % 2 === 0 ? "Jean Dupont" : "Marie Leclerc"}</TableCell>
                          <TableCell>{new Date(2023, 5, delivery + 10).toLocaleDateString("fr-FR")}</TableCell>
                          <TableCell>
                            <Badge variant={delivery % 2 === 0 ? "outline" : "default"}>
                              {delivery % 2 === 0 ? "En attente" : "Confirmée"}
                            </Badge>
                          </TableCell>
                          <TableCell>{delivery % 3 === 0 ? "Non assigné" : "Étudiant relais #" + delivery}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Détails
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Produits populaires</CardTitle>
            <CardDescription>Vos produits les plus vendus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Vendus</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "T-shirt ENSPY",
                      category: "Goodies",
                      price: 5000,
                      sold: 24,
                      stock: 18,
                      image: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Mug ENSPY",
                      category: "Goodies",
                      price: 3500,
                      sold: 18,
                      stock: 12,
                      image: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Cahier personnalisé",
                      category: "Fournitures",
                      price: 1500,
                      sold: 15,
                      stock: 30,
                      image: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Stylo gravé",
                      category: "Papeterie",
                      price: 1000,
                      sold: 12,
                      stock: 0,
                      image: "/placeholder.svg?height=40&width=40",
                    },
                  ].map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-md overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price.toLocaleString()} FCFA</TableCell>
                      <TableCell>{product.sold}</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.stock === 0 ? "destructive" : product.stock < 10 ? "outline" : "default"}
                        >
                          {product.stock === 0 ? "Rupture" : product.stock < 10 ? "Faible" : product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Modifier
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/vendor/products">
                Gérer tous les produits <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
