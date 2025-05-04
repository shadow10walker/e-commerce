"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  BookOpen,
  Pencil,
  Ticket,
  Gift,
  Coffee,
  BarChart3,
  Package,
  ShoppingBag,
  FileText,
} from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Badge } from "./ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useCart } from "@/contexts/cart-context"

const categories = [
  {
    title: "Fournitures",
    href: "/products/category/fournitures",
    description: "Cahiers, stylos et autres fournitures personnalisées",
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    title: "Papeterie",
    href: "/products/category/papeterie",
    description: "Papier, enveloppes et articles de papeterie",
    icon: <Pencil className="h-6 w-6" />,
  },
  {
    title: "Événements",
    href: "/products/category/evenements",
    description: "Billets pour les événements de l'établissement",
    icon: <Ticket className="h-6 w-6" />,
  },
  {
    title: "Goodies",
    href: "/products/category/goodies",
    description: "Articles à l'effigie de l'école",
    icon: <Gift className="h-6 w-6" />,
  },
  {
    title: "Projets étudiants",
    href: "/products/category/projets-etudiants",
    description: "Produits créés par les étudiants",
    icon: <Coffee className="h-6 w-6" />,
  },
]

// Simuler un utilisateur connecté en tant que vendeur pour la démo
const isVendor = true

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCart()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-xl font-bold" onClick={() => setIsSearchOpen(false)}>
                  EduMarket
                </Link>
                <Link
                  href="/"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium",
                    isActive("/") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Accueil
                </Link>
                <Link
                  href="/products"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium",
                    isActive("/products") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Produits
                </Link>
                <div className="font-medium text-lg">Catégories</div>
                <div className="grid gap-2 pl-4">
                  {categories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                    >
                      {category.icon}
                      <span>{category.title}</span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/about"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium",
                    isActive("/about") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  À propos
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium",
                    isActive("/contact") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Contact
                </Link>
                <Link
                  href="/vendors"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium",
                    isActive("/vendors") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Vendeurs
                </Link>
                <Link
                  href="/community"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium",
                    isActive("/community") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Communauté
                </Link>

                {isVendor && (
                  <>
                    <div className="font-medium text-lg mt-4">Espace Vendeur</div>
                    <div className="grid gap-2 pl-4">
                      <Link
                        href="/vendor/dashboard"
                        className={cn(
                          "flex items-center gap-2",
                          isActive("/vendor/dashboard") ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>Tableau de bord</span>
                      </Link>
                      <Link
                        href="/vendor/statistics"
                        className={cn(
                          "flex items-center gap-2",
                          isActive("/vendor/statistics") ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        <BarChart3 className="h-4 w-4" />
                        <span>Statistiques</span>
                      </Link>
                      <Link
                        href="/vendor/inventory"
                        className={cn(
                          "flex items-center gap-2",
                          isActive("/vendor/inventory") ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        <Package className="h-4 w-4" />
                        <span>Gestion des stocks</span>
                      </Link>
                      <Link
                        href="/vendor/accounting"
                        className={cn(
                          "flex items-center gap-2",
                          isActive("/vendor/accounting") ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        <FileText className="h-4 w-4" />
                        <span>Comptabilité</span>
                      </Link>
                    </div>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold hidden md:inline-block">EduMarket</span>
            <span className="text-xl font-bold md:hidden">EM</span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Accueil</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Catégories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <li key={category.href}>
                        <Link href={category.href} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {category.icon}
                              <div className="text-sm font-medium leading-none">{category.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {category.description}
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Tous les produits</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/vendors" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Vendeurs</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/community" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Communauté</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>À propos</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {isVendor && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <span className="flex items-center gap-1">
                      <ShoppingBag className="h-4 w-4" />
                      Espace Vendeur
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[220px] gap-2 p-4">
                      <li>
                        <Link href="/vendor/dashboard" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              "block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <ShoppingBag className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">Tableau de bord</div>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/vendor/statistics" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              "block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">Statistiques</div>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/vendor/inventory" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              "block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">Gestion des stocks</div>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/vendor/accounting" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              "block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">Comptabilité</div>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="flex items-center gap-2">
              <Input type="search" placeholder="Rechercher..." className="w-[200px] md:w-[300px]" />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Fermer la recherche</span>
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Rechercher</span>
              </Button>
              <ModeToggle />
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-orange-500">
                      {itemCount > 99 ? "99+" : itemCount}
                    </Badge>
                  )}
                  <span className="sr-only">Panier</span>
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Compte</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account/profile">Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">Mes commandes</Link>
                  </DropdownMenuItem>
                  {isVendor && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Espace Vendeur</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href="/vendor/dashboard">Tableau de bord</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/vendor/statistics">
                          <div className="flex items-center gap-2 w-full">
                            <BarChart3 className="h-4 w-4" />
                            <span>Statistiques</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/vendor/inventory">
                          <div className="flex items-center gap-2 w-full">
                            <Package className="h-4 w-4" />
                            <span>Gestion des stocks</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/vendor/accounting">
                          <div className="flex items-center gap-2 w-full">
                            <FileText className="h-4 w-4" />
                            <span>Comptabilité</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Déconnexion</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="hidden md:flex gap-2">
                <Link href="/login">
                  <Button variant="outline">Connexion</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="default">Inscription</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
