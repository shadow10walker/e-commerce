import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Package, ShoppingBag, TrendingUp, Users } from "lucide-react"
import AdminSalesChart from "@/components/admin-sales-chart"
import AdminProductsChart from "@/components/admin-products-chart"

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord administrateur</h1>
          <p className="text-muted-foreground">
            Gérez la plateforme e-commerce de votre établissement
          </p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button asChild>
            <Link href="/admin/settings">
              Paramètres de la plateforme
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Ventes totales
                </p>
                <h3 className="text-2xl font-bold mt-1">1 250 000 FCFA</h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +15% ce mois
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
                <p className="text-sm font-medium text-muted-foreground">
                  Commandes
                </p>
                <h3 className="text-2xl font-bold mt-1">156</h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +8% ce mois
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
                <p className="text-sm font-medium text-muted-foreground">
                  Produits
                </p>
                <h3 className="text-2xl font-bold mt-1">78</h3>
                <p className="text-xs text-yellow-600 mt-1 flex items-center">
                  <Package className="h-3 w-3 mr-1" /> 5 en rupture
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
                <p className="text-sm font-medium text-muted-foreground">
                  Utilisateurs
                </p>
                <h3 className="text-2xl font-bold mt-1">245</h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <Users className="h-3 w-3 mr-1" /> +12 nouveaux
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Aperçu des ventes</CardTitle>
            <CardDescription>
              Ventes mensuelles de la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminSalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des produits</CardTitle>
            <CardDescription>
              Produits par catégorie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminProductsChart />
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>
              Les dernières activités sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="orders">
              <TabsList className="mb-4">
                <TabsTrigger value="orders">Commandes récentes</TabsTrigger>
                <TabsTrigger value="users">Nouveaux utilisateurs</TabsTrigger>
                <TabsTrigger value="products">Nouveaux produits</TabsTrigger>
              </TabsList>
              <TabsContent value="orders">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
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
                              className={
                                order.status === "Livrée"
                                  ? "bg-green-100 text-green-700 hover:bg-green-100"
                                  : ""
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
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
              <TabsContent value="users">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date d'inscription</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          name: "Jean Dupont",
                          email: "jean.dupont@example.com",
                          date: "30/05/2023",
                          role: "Client",
                        },
                        {
                          name: "Marie Leclerc",
                          email: "marie.leclerc@example.com",
                          date: "29/05/2023",
                          role: "Vendeur",
                        },
                        {
                          name: "Pierre Martin",
                          email: "pierre.martin@example.com",
                          date: "28/05/2023",
                          role: "Livreur",
                        },
                        {
                          name: "Sophie Dubois",
                          email: "sophie.dubois@example.com",
                          date: "27/05/2023",
                          role: "Client",
                        },
                        {
                          name: "Thomas Bernard",
                          email: "thomas.bernard@example.com",
                          date: "26/05/2023",
                          role: "Client",
                        },
                      ].map((user, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "Vendeur"
                                  ? "default"
                                  : user.role === "Livreur"
                                  ? "outline"
                                  : "secondary"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
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
              <TabsContent value="products">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produit</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Vendeur</TableHead>
                        <TableHead>Date d'ajout</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          name: "T-shirt ENSPY",
                          category: "Goodies",
                          price: 5000,
                          seller: "Boutique Officielle",
                          date: "30/05/2023",
                        },
                        {
                          name: "Billet Gala annuel",
                          category: "Événements",
                          price: 10000,
                          seller: "Association des Étudiants",
                          date: "29/05/2023",
                        },
                        {
                          name: "Cahier personnalisé",
                          category: "Fournitures",
                          price: 1500,
                          seller: "Boutique Officielle",
                          date: "28/05/2023",
                        },
                        {
                          name: "Mug ENSPY",
                          category: "Goodies",
                          price: 3500,
                          seller: "Club Informatique",
                          date: "27/05/2023",
                        },
                        {
                          name: "Stylo gravé",
                          category: "Papeterie",
                          price: 1000,
                          seller: "Boutique Officielle",
                          date: "26/05/2023",
                        },
                      ].map((product, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price.toLocaleString()} FCFA</TableCell>
                          <TableCell>{product.seller}</TableCell>
                          <TableCell>{product.date}</TableCell>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Vendeurs actifs</CardTitle>
            <CardDescription>
              Les vendeurs les plus actifs sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Boutique Officielle ENSPY",
                  products: \
