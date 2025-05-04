"use client"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Mock data for sales chart
const data = [
  { date: "01/05", sales: 5000 },
  { date: "02/05", sales: 7000 },
  { date: "03/05", sales: 6500 },
  { date: "04/05", sales: 8000 },
  { date: "05/05", sales: 12000 },
  { date: "06/05", sales: 10000 },
  { date: "07/05", sales: 9000 },
  { date: "08/05", sales: 11000 },
  { date: "09/05", sales: 14000 },
  { date: "10/05", sales: 13000 },
  { date: "11/05", sales: 12500 },
  { date: "12/05", sales: 15000 },
  { date: "13/05", sales: 16000 },
  { date: "14/05", sales: 14500 },
  { date: "15/05", sales: 13500 },
  { date: "16/05", sales: 12000 },
  { date: "17/05", sales: 11500 },
  { date: "18/05", sales: 13000 },
  { date: "19/05", sales: 14000 },
  { date: "20/05", sales: 15500 },
  { date: "21/05", sales: 16500 },
  { date: "22/05", sales: 17000 },
  { date: "23/05", sales: 18000 },
  { date: "24/05", sales: 19000 },
  { date: "25/05", sales: 20000 },
  { date: "26/05", sales: 21000 },
  { date: "27/05", sales: 22000 },
  { date: "28/05", sales: 23000 },
  { date: "29/05", sales: 24000 },
  { date: "30/05", sales: 25000 },
]

export default function VendorSalesChart() {
  return (
    <div className="w-full h-[300px]">
      <ChartContainer title="Ventes journalières" description="Vos ventes des 30 derniers jours">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `${value / 1000}k`} />
            <ChartTooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#0d9488"
              fill="#0d9488"
              fillOpacity={0.2}
              activeDot={{ r: 8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltipContent>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-sm font-bold">{payload[0].value.toLocaleString()} FCFA</div>
      </ChartTooltipContent>
    )
  }

  return null
}