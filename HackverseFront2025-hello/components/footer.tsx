import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-950 to-blue-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <span className="font-bold text-white">E</span>
              </div>
              <h3 className="text-xl font-bold">EduMarket</h3>
            </div>
            <p className="text-gray-400">
              La plateforme e-commerce dédiée à l'écosystème de votre établissement éducatif.
            </p>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-white hover:bg-orange-500/20"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-white hover:bg-orange-500/20"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-white hover:bg-orange-500/20"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens rapides</h3>
            <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-400 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/vendor/register" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Devenir vendeur
                </Link>
              </li>
              
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacts</h3>
            <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-orange-500" />
                </div>
                <span className="text-gray-400">Ecole Nationale Supérieure Polytechnique de Yaoundé</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-orange-500" />
                </div>
                <span className="text-gray-400">+237 653 98 19 59</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-orange-500" />
                </div>
                <span className="text-gray-400">helpservice@edumarket.com</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
            <p className="text-gray-400">Inscrivez-vous pour recevoir nos dernières actualités et offres.</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-blue-900/50 border-blue-800 focus-visible:ring-orange-500"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">S'inscrire</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} EduMarket. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
