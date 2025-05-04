import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Calendar, DollarSign, Download, TrendingDown, TrendingUp } from "lucide-react"
import VendorSalesChart from "@/components/vendor-sales-chart"
import VendorProductsChart from "@/components/vendor-products-chart"
import VendorCustomersChart from "@/components/vendor-customers-chart"

export default function VendorStatisticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Statistiques de vente</h1>
          <p className="text-muted-foreground">Analysez vos performances et optimisez votre stratégie commerciale</p>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 derniers jours</SelectItem>
              <SelectItem value="30days">30 derniers jours</SelectItem>
              <SelectItem value="90days">90 derniers jours</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
              <SelectItem value="all">Toutes les données</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Personnaliser
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exporter
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
                  <TrendingUp className="h-3 w-3 mr-1" /> +12% vs période précédente
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
                  <TrendingUp className="h-3 w-3 mr-1" /> +5% vs période précédente
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-700"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Panier moyen</p>
                <h3 className="text-2xl font-bold mt-1">5 208 FCFA</h3>
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" /> -2% vs période précédente
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-purple-700"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taux de conversion</p>
                <h3 className="text-2xl font-bold mt-1">4.8%</h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +0.5% vs période précédente
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-amber-700"
                >
                  <path d="m2 12 5.25 5 2.625-5H8c0-3.75 3-7.5 7.5-7.5 2.25 0 4.125.75 5.25 2.25" />
                  <path d="M22 12c-5.25 5.25-9.75 6-13.5 6-2.25 0-4.125-.75-5.25-2.25" />
                  <path d="M8 19.5 2.25 14 4.5 9.5" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Évolution des ventes</CardTitle>
            <CardDescription>Analyse de vos ventes sur la période sélectionnée</CardDescription>
          </CardHeader>
          <CardContent>
            <VendorSalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des ventes</CardTitle>
            <CardDescription>Par catégorie de produits</CardDescription>
          </CardHeader>
          <CardContent>
            <VendorProductsChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Démographie des clients</CardTitle>
            <CardDescription>Répartition de votre clientèle</CardDescription>
          </CardHeader>
          <CardContent>
            <VendorCustomersChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performances des produits</CardTitle>
            <CardDescription>Analyse des ventes par produit</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bestsellers">
              <TabsList className="mb-4">
                <TabsTrigger value="bestsellers">Meilleures ventes</TabsTrigger>
                <TabsTrigger value="profitable">Plus rentables</TabsTrigger>
                <TabsTrigger value="views">Plus consultés</TabsTrigger>
              </TabsList>
              <TabsContent value="bestsellers">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produit</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Vendus</TableHead>
                        <TableHead>Revenus</TableHead>
                        <TableHead>Évolution</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          name: "T-shirt ENSPY",
                          category: "Goodies",
                          price: 5000,
                          sold: 24,
                          revenue: 120000,
                          trend: "+15%",
                          positive: true,
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Mug ENSPY",
                          category: "Goodies",
                          price: 3500,
                          sold: 18,
                          revenue: 63000,
                          trend: "+8%",
                          positive: true,
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Cahier personnalisé",
                          category: "Fournitures",
                          price: 1500,
                          sold: 15,
                          revenue: 22500,
                          trend: "-3%",
                          positive: false,
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Stylo gravé",
                          category: "Papeterie",
                          price: 1000,
                          sold: 12,
                          revenue: 12000,
                          trend: "+5%",
                          positive: true,
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Casquette ENSPY",
                          category: "Goodies",
                          price: 4000,
                          sold: 10,
                          revenue: 40000,
                          trend: "+20%",
                          positive: true,
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
                          <TableCell>{product.revenue.toLocaleString()} FCFA</TableCell>
                          <TableCell>
                            <span
                              className={`flex items-center ${product.positive ? "text-green-600" : "text-red-600"}`}
                            >
                              {product.positive ? (
                                <TrendingUp className="h-4 w-4 mr-1" />
                              ) : (
                                <TrendingDown className="h-4 w-4 mr-1" />
                              )}
                              {product.trend}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="profitable">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produit</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Marge</TableHead>
                        <TableHead>Vendus</TableHead>
                        <TableHead>Profit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          name: "Casquette ENSPY",
                          category: "Goodies",
                          price: 4000,
                          margin: "65%",
                          sold: 10,
                          profit: 26000,
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "T-shirt ENSPY",
                          category: "Goodies",
                          price: 5000,
                          margin: "60%",
                          sold: 24,
                          profit: 72000,
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Mug ENSPY",
                          category: "Goodies",
                          price: 3500,
                          margin: "55%",
                          sold: 18,
                          profit: 34650,
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Stylo gravé",
                          category: "Papeterie",
                          price: 1000,
                          margin: "50%",
                          sold: 12,
                          profit: 6000,
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Cahier personnalisé",
                          category: "Fournitures",
                          price: 1500,
                          margin: "45%",
                          sold: 15,
                          profit: 10125,
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
                          <TableCell>{product.margin}</TableCell>
                          <TableCell>{product.sold}</TableCell>
                          <TableCell>{product.profit.toLocaleString()} FCFA</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="views">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produit</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Vues</TableHead>
                        <TableHead>Taux de conversion</TableHead>
                        <TableHead>Vendus</TableHead>
                        <TableHead>Tendance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          name: "T-shirt ENSPY",
                          category: "Goodies",
                          views: 520,
                          conversion: "4.6%",
                          sold: 24,
                          trend: "+12%",
                          positive: true,
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Mug ENSPY",
                          category: "Goodies",
                          views: 480,
                          conversion: "3.8%",
                          sold: 18,
                          trend: "+5%",
                          positive: true,
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Casquette ENSPY",
                          category: "Goodies",
                          views: 350,
                          conversion: "2.9%",
                          sold: 10,
                          trend: "+18%",
                          positive: true,
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Cahier personnalisé",
                          category: "Fournitures",
                          views: 320,
                          conversion: "4.7%",
                          sold: 15,
                          trend: "-2%",
                          positive: false,
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Stylo gravé",
                          category: "Papeterie",
                          views: 280,
                          conversion: "4.3%",
                          sold: 12,
                          trend: "+3%",
                          positive: true,
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
                          <TableCell>{product.views}</TableCell>
                          <TableCell>{product.conversion}</TableCell>
                          <TableCell>{product.sold}</TableCell>
                          <TableCell>
                            <span
                              className={`flex items-center ${product.positive ? "text-green-600" : "text-red-600"}`}
                            >
                              {product.positive ? (
                                <TrendingUp className="h-4 w-4 mr-1" />
                              ) : (
                                <TrendingDown className="h-4 w-4 mr-1" />
                              )}
                              {product.trend}
                            </span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
            <CardDescription>Les 5 dernières commandes reçues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Commande</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "#10001",
                      customer: "Jean Dupont",
                      date: "30/05/2023",
                      amount: 15000,
                      status: "Livrée",
                    },
                    {
                      id: "#10002",
                      customer: "Marie Leclerc",
                      date: "29/05/2023",
                      amount: 8000,
                      status: "En cours",
                    },
                    {
                      id: "#10003",
                      customer: "Pierre Martin",
                      date: "28/05/2023",
                      amount: 12000,
                      status: "En attente",
                    },
                    {
                      id: "#10004",
                      customer: "Sophie Dubois",
                      date: "27/05/2023",
                      amount: 5000,
                      status: "Livrée",
                    },
                    {
                      id: "#10005",
                      customer: "Thomas Bernard",
                      date: "26/05/2023",
                      amount: 20000,
                      status: "Annulée",
                    },
                  ].map((order, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.amount.toLocaleString()} FCFA</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Livrée"
                              ? "default"
                              : order.status === "Annulée"
                                ? "destructive"
                                : "outline"
                          }
                          className={order.status === "Livrée" ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" asChild>
                <Link href="/vendor/orders">
                  Voir toutes les commandes <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produits à surveiller</CardTitle>
            <CardDescription>Produits nécessitant votre attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Vues</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Stylo gravé",
                      status: "Rupture",
                      stock: 0,
                      views: 45,
                      image: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Cahier personnalisé",
                      status: "Faible",
                      stock: 3,
                      views: 32,
                      image: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "T-shirt ENSPY",
                      status: "Populaire",
                      stock: 8,
                      views: 120,
                      image: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Mug ENSPY",
                      status: "Faible",
                      stock: 5,
                      views: 65,
                      image: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Porte-clés",
                      status: "Inactif",
                      stock: 25,
                      views: 8,
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
                      <TableCell>
                        <Badge
                          variant={
                            product.status === "Rupture"
                              ? "destructive"
                              : product.status === "Faible"
                                ? "outline"
                                : product.status === "Populaire"
                                  ? "default"
                                  : "secondary"
                          }
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.views}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          {product.status === "Rupture" || product.status === "Faible"
                            ? "Réapprovisionner"
                            : "Voir détails"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" asChild>
                <Link href="/vendor/products">
                  Gérer l'inventaire <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
