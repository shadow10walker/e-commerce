"use client"

import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Mock data for customer demographics
const data = [
  { name: "1ère année", students: 35, staff: 5 },
  { name: "2ème année", students: 25, staff: 8 },
  { name: "3ème année", students: 20, staff: 10 },
  { name: "4ème année", students: 15, staff: 7 },
  { name: "5ème année", students: 10, staff: 5 },
  { name: "Personnel", students: 0, staff: 15 },
]

export default function VendorCustomersChart() {
  return (
    <div className="w-full h-[300px]">
      <ChartContainer title="Démographie des clients" description="Répartition par niveau d'études">
        <Chart>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip content={<CustomTooltip />} />
              <Bar dataKey="students" fill="#0ea5e9" name="Étudiants" />
              <Bar dataKey="staff" fill="#f59e0b" name="Personnel" />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      </ChartContainer>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltipContent>
        <div className="text-sm font-medium">{label}</div>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.fill }}></div>
            <div className="text-sm">
              {entry.name}: {entry.value}%
            </div>
          </div>
        ))}
      </ChartTooltipContent>
    )
  }

  return null
}
