import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Pencil, Ticket, Gift, Coffee } from "lucide-react"

const categories = [
  {
    title: "Fournitures",
    href: "/products/category/fournitures",
    description: "Cahiers, stylos et autres fournitures personnalisées",
    icon: <BookOpen className="h-6 w-6" />,
    image: "/placeholder.svg?height=200&width=200",
    color: "bg-gradient-to-br from-orange-100 to-orange-200",
    darkColor: "dark:bg-gradient-to-br dark:from-orange-950/40 dark:to-orange-900/20",
    iconColor: "text-orange-500",
    darkIconColor: "dark:text-orange-400",
  },
  {
    title: "Papeterie",
    href: "/products/category/papeterie",
    description: "Papier, enveloppes et articles de papeterie",
    icon: <Pencil className="h-6 w-6" />,
    image: "/placeholder.svg?height=200&width=200",
    color: "bg-gradient-to-br from-blue-100 to-blue-200",
    darkColor: "dark:bg-gradient-to-br dark:from-blue-950/40 dark:to-blue-900/20",
    iconColor: "text-blue-800",
    darkIconColor: "dark:text-blue-400",
  },
  {
    title: "Événements",
    href: "/products/category/evenements",
    description: "Billets pour les événements de l'établissement",
    icon: <Ticket className="h-6 w-6" />,
    image: "/placeholder.svg?height=200&width=200",
    color: "bg-gradient-to-br from-orange-100 to-orange-200",
    darkColor: "dark:bg-gradient-to-br dark:from-orange-950/40 dark:to-orange-900/20",
    iconColor: "text-orange-500",
    darkIconColor: "dark:text-orange-400",
  },
  {
    title: "Goodies",
    href: "/products/category/goodies",
    description: "Articles à l'effigie de l'école",
    icon: <Gift className="h-6 w-6" />,
    image: "/placeholder.svg?height=200&width=200",
    color: "bg-gradient-to-br from-blue-100 to-blue-200",
    darkColor: "dark:bg-gradient-to-br dark:from-blue-950/40 dark:to-blue-900/20",
    iconColor: "text-blue-800",
    darkIconColor: "dark:text-blue-400",
  },
  {
    title: "Projets étudiants",
    href: "/products/category/projets-etudiants",
    description: "Produits créés par les étudiants",
    icon: <Coffee className="h-6 w-6" />,
    image: "/placeholder.svg?height=200&width=200",
    color: "bg-gradient-to-br from-orange-100 to-orange-200",
    darkColor: "dark:bg-gradient-to-br dark:from-orange-950/40 dark:to-orange-900/20",
    iconColor: "text-orange-500",
    darkIconColor: "dark:text-orange-400",
  },
]

export default function CategoryShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {categories.map((category, index) => (
        <Link key={category.title} href={category.href}>
          <Card className="overflow-hidden h-full transition-all hover:shadow-lg hover:-translate-y-1 border-transparent">
            <div className={`${category.color} ${category.darkColor} p-8 flex justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-white/30 blur-xl"></div>
                <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full bg-white/30 blur-xl"></div>
              </div>
              <div className={`${category.iconColor} ${category.darkIconColor} relative z-10`}>{category.icon}</div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
