import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, DollarSign, MapPin, Package, TrendingUp } from "lucide-react"
import DeliveryScheduler from "@/components/delivery-scheduler"
import DeliveryMap from "@/components/delivery-map"

export default function DeliveryDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord livreur</h1>
          <p className="text-muted-foreground">Gérez vos livraisons et votre emploi du temps</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button asChild>
            <Link href="/delivery/available">Voir les livraisons disponibles</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenus totaux</p>
                <h3 className="text-2xl font-bold mt-1">15 000 FCFA</h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +8% ce mois
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
                <p className="text-sm font-medium text-muted-foreground">Livraisons effectuées</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +3 cette semaine
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Livraisons en attente</p>
                <h3 className="text-2xl font-bold mt-1">3</h3>
                <p className="text-xs text-yellow-600 mt-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> 2 pour aujourd'hui
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taux de satisfaction</p>
                <h3 className="text-2xl font-bold mt-1">4.8/5</h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +0.2 ce mois
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Carte des livraisons</CardTitle>
            <CardDescription>Vos livraisons planifiées pour aujourd'hui</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <DeliveryMap />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Livraisons à venir</CardTitle>
            <CardDescription>Vos prochaines livraisons planifiées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((delivery) => (
                <div key={delivery} className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Package className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Commande #{delivery + 10000}</h4>
                      <Badge>
                        {delivery === 1 ? "Aujourd'hui" : `Dans ${delivery} jour${delivery > 1 ? "s" : ""}`}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {delivery % 2 === 0 ? "Jean Dupont" : "Marie Leclerc"} - {(delivery * 2000).toLocaleString()} FCFA
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" /> Campus ENSPY, Bâtiment {String.fromCharCode(64 + delivery)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/delivery/orders">
                Voir toutes les livraisons <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Planification des disponibilités</CardTitle>
            <CardDescription>Gérez votre emploi du temps pour les livraisons</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="schedule">
              <TabsList className="mb-4">
                <TabsTrigger value="schedule">Emploi du temps</TabsTrigger>
                <TabsTrigger value="history">Historique des livraisons</TabsTrigger>
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
                  <DeliveryScheduler />
                </div>
              </TabsContent>
              <TabsContent value="history">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Commande</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[1, 2, 3, 4].map((delivery) => (
                        <TableRow key={delivery}>
                          <TableCell className="font-medium">#{delivery + 10000}</TableCell>
                          <TableCell>{delivery % 2 === 0 ? "Jean Dupont" : "Marie Leclerc"}</TableCell>
                          <TableCell>{new Date(2023, 4, delivery + 20).toLocaleDateString("fr-FR")}</TableCell>
                          <TableCell>{(delivery * 1000).toLocaleString()} FCFA</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                              Livré
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
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenus et commissions</CardTitle>
            <CardDescription>Aperçu de vos revenus en tant que livreur étudiant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Commande</TableHead>
                    <TableHead>Vendeur</TableHead>
                    <TableHead>Montant commande</TableHead>
                    <TableHead>Commission (10%)</TableHead>
                    <TableHead className="text-right">Statut paiement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      date: "28/05/2023",
                      order: "#10001",
                      seller: "Boutique Officielle ENSPY",
                      amount: 15000,
                      commission: 1500,
                      paid: true,
                    },
                    {
                      date: "25/05/2023",
                      order: "#10002",
                      seller: "Club Informatique",
                      amount: 12000,
                      commission: 1200,
                      paid: true,
                    },
                    {
                      date: "22/05/2023",
                      order: "#10003",
                      seller: "Boutique Officielle ENSPY",
                      amount: 8000,
                      commission: 800,
                      paid: true,
                    },
                    {
                      date: "20/05/2023",
                      order: "#10004",
                      seller: "Association des Étudiants",
                      amount: 5000,
                      commission: 500,
                      paid: false,
                    },
                  ].map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="font-medium">{item.order}</TableCell>
                      <TableCell>{item.seller}</TableCell>
                      <TableCell>{item.amount.toLocaleString()} FCFA</TableCell>
                      <TableCell>{item.commission.toLocaleString()} FCFA</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={item.paid ? "default" : "outline"}
                          className={item.paid ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}
                        >
                          {item.paid ? "Payé" : "En attente"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/delivery/earnings">
                Voir tous les revenus <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
