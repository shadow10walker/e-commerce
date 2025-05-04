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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate API call
    try {
      // In a real app, this would be an API call to your authentication endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, let's check if email and password are not empty
      if (!email || !password) {
        throw new Error("Veuillez remplir tous les champs")
      }

      // Simulate successful login
      console.log("Login successful", { email, password, rememberMe })

      // Redirect to home page
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
            <CardDescription className="text-center">
              Entrez vos identifiants pour accéder à votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Téléphone</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-teal-600 hover:text-teal-700 hover:underline"
                      >
                        Mot de passe oublié?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Se souvenir de moi
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Connexion en cours..." : "Se connecter"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="phone">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input id="phone" type="tel" placeholder="+237 6XX XX XX XX" />
                  </div>
                  <Button type="submit" className="w-full">
                    Recevoir un code
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
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
              Vous n'avez pas de compte?{" "}
              <Link href="/signup" className="text-teal-600 hover:text-teal-700 hover:underline">
                Créer un compte
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
