import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Filter, Search } from "lucide-react"
import ProductGrid from "@/components/product-grid"

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Tous les produits</h1>
          <p className="text-muted-foreground">Découvrez notre sélection de produits pour votre établissement</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher..." className="w-full md:w-[200px] pl-8" />
          </div>
          <Select defaultValue="newest">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Plus récents</SelectItem>
              <SelectItem value="price-asc">Prix croissant</SelectItem>
              <SelectItem value="price-desc">Prix décroissant</SelectItem>
              <SelectItem value="popular">Popularité</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:sticky md:top-20 h-fit">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filtres</h2>
              <Button variant="ghost" size="sm">
                Réinitialiser
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Catégories</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fournitures" />
                    <label
                      htmlFor="fournitures"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Fournitures
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="papeterie" />
                    <label
                      htmlFor="papeterie"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Papeterie
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="evenements" />
                    <label
                      htmlFor="evenements"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Événements
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="goodies" />
                    <label
                      htmlFor="goodies"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Goodies
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="projets" />
                    <label
                      htmlFor="projets"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Projets étudiants
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Prix</h3>
                  <span className="text-sm text-muted-foreground">0 - 15 000 FCFA</span>
                </div>
                <Slider defaultValue={[0, 15000]} max={15000} step={500} className="mb-6" />
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="Min" className="h-9" defaultValue={0} />
                  <span>-</span>
                  <Input type="number" placeholder="Max" className="h-9" defaultValue={15000} />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Disponibilité</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="in-stock" />
                    <label
                      htmlFor="in-stock"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      En stock
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="out-of-stock" />
                    <label
                      htmlFor="out-of-stock"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Rupture de stock
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Vendeurs</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="official" />
                    <label
                      htmlFor="official"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Boutique officielle
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="student" />
                    <label
                      htmlFor="student"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Projets étudiants
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="department" />
                    <label
                      htmlFor="department"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Départements
                    </label>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <Filter className="mr-2 h-4 w-4" /> Appliquer les filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <ProductGrid />
        </div>
      </div>
    </div>
  )
}
