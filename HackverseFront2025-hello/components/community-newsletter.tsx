"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"

export default function CommunityNewsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [preferences, setPreferences] = useState({
    news: true,
    events: true,
    products: true,
    vendors: false,
  })

  const handleSubscribe = () => {
    // Logic to subscribe would go here
    setSubscribed(true)
  }

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-teal-600" /> Newsletter
        </CardTitle>
        <CardDescription>Restez informé des dernières actualités et événements</CardDescription>
      </CardHeader>
      <CardContent>
        {subscribed ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
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
                className="h-6 w-6 text-green-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Merci pour votre inscription !</h3>
            <p className="text-muted-foreground">
              Vous recevrez désormais nos actualités directement dans votre boîte mail.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Centres d'intérêt</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="news" checked={preferences.news} onCheckedChange={() => togglePreference("news")} />
                  <label
                    htmlFor="news"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Actualités de la plateforme
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="events"
                    checked={preferences.events}
                    onCheckedChange={() => togglePreference("events")}
                  />
                  <label
                    htmlFor="events"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Événements à venir
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="products"
                    checked={preferences.products}
                    onCheckedChange={() => togglePreference("products")}
                  />
                  <label
                    htmlFor="products"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nouveaux produits
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vendors"
                    checked={preferences.vendors}
                    onCheckedChange={() => togglePreference("vendors")}
                  />
                  <label
                    htmlFor="vendors"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nouveaux vendeurs
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {!subscribed && (
        <CardFooter>
          <Button className="w-full" onClick={handleSubscribe} disabled={!email}>
            S'abonner
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
