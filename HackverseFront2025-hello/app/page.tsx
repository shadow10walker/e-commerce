import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, ShoppingBag, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import FeaturedProducts from "@/components/featured-products"
import CategoryShowcase from "@/components/category-showcase"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="gradient-mixed text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="flex-1 space-y-6">
            <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-2">
              La plateforme e-commerce de votre campus
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              La boutique officielle de votre <span className="text-orange-300">établissement</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Découvrez nos fournitures personnalisées, goodies à l'effigie de l'école, billets pour les événements et
              produits de projets étudiants.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-orange-500 hover:bg-orange-50 shadow-colored shadow-colored-hover"
              >
                <Link href="/products">
                  Découvrir les produits <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link href="/about">En savoir plus</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute -inset-4 rounded-full bg-orange-500/20 blur-xl"></div>
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Produits de l'établissement"
                width={500}
                height={500}
                className="object-cover rounded-2xl shadow-2xl relative z-10 border-4 border-white/20"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-4">Pourquoi choisir notre plateforme ?</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          EduMarket offre une expérience unique adaptée aux besoins spécifiques de votre établissement éducatif.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center text-center card-hover border border-orange-100 dark:border-orange-900/20">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-full mb-4 shadow-inner">
              <ShoppingBag className="h-7 w-7 text-orange-500 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Catalogue complet</h3>
            <p className="text-muted-foreground">Tous les produits de l'établissement regroupés en un seul endroit.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center text-center card-hover border border-blue-100 dark:border-blue-900/20">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4 shadow-inner">
              <Users className="h-7 w-7 text-blue-800 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Livraison par étudiants</h3>
            <p className="text-muted-foreground">Un réseau d'étudiants pour des livraisons rapides sur le campus.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center text-center card-hover border border-orange-100 dark:border-orange-900/20">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-full mb-4 shadow-inner">
              <Calendar className="h-7 w-7 text-orange-500 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Planification intelligente</h3>
            <p className="text-muted-foreground">Planifiez vos livraisons en fonction de votre emploi du temps.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center text-center card-hover border border-blue-100 dark:border-blue-900/20">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4 shadow-inner">
              <TrendingUp className="h-7 w-7 text-blue-800 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Statistiques détaillées</h3>
            <p className="text-muted-foreground">Suivez les tendances et analysez les ventes en temps réel.</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="gradient-card py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explorez nos catégories</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-blue-800 mx-auto rounded-full"></div>
          </div>
          <CategoryShowcase />
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Produits populaires</h2>
            <div className="h-1 w-16 bg-orange-500 rounded-full mt-2"></div>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-950 dark:hover:text-orange-300"
          >
            <Link href="/products">
              Voir tout <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <FeaturedProducts />
      </section>

      {/* CTA Section */}
      <section className="gradient-cta text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vous êtes vendeur ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez notre plateforme pour vendre vos produits aux étudiants et au personnel de l'établissement.
            </p>
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg button-glow">
              <Link href="/vendor/register">
                Devenir vendeur <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 right-0 text-background"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>
    </div>
  )
}
