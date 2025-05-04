"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

// Mock data for product categories
const data = [
  { name: "Goodies", value: 65, color: "#0ea5e9" },
  { name: "Fournitures", value: 15, color: "#10b981" },
  { name: "Papeterie", value: 10, color: "#f59e0b" },
  { name: "Événements", value: 10, color: "#8b5cf6" },
]

// Configuration pour le graphique
const chartConfig = {
  products: {
    label: "Produits",
    theme: {
      light: "#6366f1",
      dark: "#818cf8"
    }
  }
}

export default function VendorProductsChart() {
  return (
    <div className="w-full h-[300px]">
      <ChartContainer 
        title="Répartition des ventes" 
        description="Par catégorie de produits"
        config={chartConfig}
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<CustomTooltip />} />
        </PieChart>
      </ChartContainer>
    </div>
  )
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltipContent>
        <div className="text-sm font-medium">{payload[0].name}</div>
        <div className="text-sm font-bold">{payload[0].value}%</div>
      </ChartTooltipContent>
    )
  }

  return null
}