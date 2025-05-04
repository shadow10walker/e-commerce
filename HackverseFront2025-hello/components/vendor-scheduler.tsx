"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

const timeSlots = ["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00"]

export default function VendorScheduler() {
  const [schedule, setSchedule] = useState<Record<string, string[]>>({
    Lundi: ["10:00 - 12:00", "14:00 - 16:00"],
    Mardi: ["08:00 - 10:00"],
    Mercredi: [],
    Jeudi: ["14:00 - 16:00", "16:00 - 18:00"],
    Vendredi: ["10:00 - 12:00"],
    Samedi: [],
    Dimanche: [],
  })

  const toggleTimeSlot = (day: string, timeSlot: string) => {
    setSchedule((prev) => {
      const newSchedule = { ...prev }
      if (newSchedule[day].includes(timeSlot)) {
        newSchedule[day] = newSchedule[day].filter((slot) => slot !== timeSlot)
      } else {
        newSchedule[day] = [...newSchedule[day], timeSlot]
      }
      return newSchedule
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Label htmlFor="semester">Semestre actuel</Label>
          <Select defaultValue="s2">
            <SelectTrigger id="semester" className="w-[180px] mt-1">
              <SelectValue placeholder="Sélectionner un semestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="s1">Semestre 1 (2023-2024)</SelectItem>
              <SelectItem value="s2">Semestre 2 (2023-2024)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Enregistrer les modifications</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {daysOfWeek.map((day) => (
          <Card key={day}>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">{day}</h3>
              <Separator className="mb-3" />
              <div className="space-y-2">
                {timeSlots.map((timeSlot) => (
                  <div key={`${day}-${timeSlot}`} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${day}-${timeSlot}`}
                      checked={schedule[day].includes(timeSlot)}
                      onCheckedChange={() => toggleTimeSlot(day, timeSlot)}
                    />
                    <Label
                      htmlFor={`${day}-${timeSlot}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {timeSlot}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-yellow-50 p-4 rounded-md text-yellow-800 text-sm">
        <p className="font-medium">Note:</p>
        <p>
          Les créneaux sélectionnés indiquent vos disponibilités pour effectuer des livraisons. Les étudiants relais
          pourront également voir ces créneaux pour planifier les livraisons.
        </p>
      </div>
    </div>
  )
}
