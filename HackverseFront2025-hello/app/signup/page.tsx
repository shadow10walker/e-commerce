"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "student",
    acceptTerms: false,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setLoading(false)
      return
    }

    if (!formData.acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation")
      setLoading(false)
      return
    }

    // Simulate API call
    try {
      // In a real app, this would be an API call to your registration endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, let's check if required fields are filled
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        throw new Error("Veuillez remplir tous les champs obligatoires")
      }

      // Simulate successful registration
      console.log("Registration successful", formData)

      // Redirect to login page
      router.push("/login")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Créer un compte</CardTitle>
            <CardDescription className="text-center">
              Inscrivez-vous pour accéder à la plateforme e-commerce de votre établissement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    Prénom <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Nom <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="exemple@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+237 6XX XX XX XX"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Mot de passe <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirmer le mot de passe <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType">
                  Type d'utilisateur <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.userType} onValueChange={(value) => handleSelectChange("userType", value)}>
                  <SelectTrigger id="userType">
                    <SelectValue placeholder="Sélectionnez votre profil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Étudiant</SelectItem>
                    <SelectItem value="teacher">Enseignant</SelectItem>
                    <SelectItem value="staff">Personnel administratif</SelectItem>
                    <SelectItem value="vendor">Vendeur</SelectItem>
                    <SelectItem value="delivery">Livreur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleCheckboxChange("acceptTerms", checked as boolean)}
                />
                <label
                  htmlFor="acceptTerms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  J'accepte les{" "}
                  <Link href="/terms" className="text-teal-600 hover:text-teal-700 hover:underline">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="/privacy" className="text-teal-600 hover:text-teal-700 hover:underline">
                    politique de confidentialité
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Inscription en cours..." : "S'inscrire"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Ou s'inscrire avec</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Google"
                  width={24}
                  height={24}
                  className="mr-2 h-4 w-4"
                />
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="mr-2 h-4 w-4"
                />
                Facebook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm text-muted-foreground mt-2">
              Vous avez déjà un compte?{" "}
              <Link href="/login" className="text-teal-600 hover:text-teal-700 hover:underline">
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
