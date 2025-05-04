"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/date-range-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Download, FileText, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for financial reports
const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 1890 },
  { month: "Jun", sales: 2390 },
  { month: "Jul", sales: 3490 },
  { month: "Aug", sales: 4000 },
  { month: "Sep", sales: 2500 },
  { month: "Oct", sales: 1500 },
  { month: "Nov", sales: 2000 },
  { month: "Dec", sales: 2780 },
]

const categoryData = [
  { name: "Textbooks", value: 45 },
  { name: "Electronics", value: 25 },
  { name: "Lab Equipment", value: 15 },
  { name: "Accessories", value: 15 },
]

const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"]

const transactions = [
  {
    id: "INV-001",
    date: "2023-05-01",
    customer: "University of Science",
    amount: 1299.99,
    status: "Paid",
    type: "Sale",
  },
  {
    id: "INV-002",
    date: "2023-05-03",
    customer: "Tech College",
    amount: 899.5,
    status: "Paid",
    type: "Sale",
  },
  {
    id: "INV-003",
    date: "2023-05-07",
    customer: "Medical School",
    amount: 2499.99,
    status: "Pending",
    type: "Sale",
  },
  {
    id: "EXP-001",
    date: "2023-05-02",
    customer: "Supplier Inc.",
    amount: -450.0,
    status: "Paid",
    type: "Expense",
  },
  {
    id: "EXP-002",
    date: "2023-05-10",
    customer: "Shipping Co.",
    amount: -120.0,
    status: "Paid",
    type: "Expense",
  },
  {
    id: "INV-004",
    date: "2023-05-15",
    customer: "Engineering Institute",
    amount: 1750.0,
    status: "Paid",
    type: "Sale",
  },
  {
    id: "EXP-003",
    date: "2023-05-18",
    customer: "Marketing Agency",
    amount: -350.0,
    status: "Pending",
    type: "Expense",
  },
]

export default function AccountingPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2023, 4, 1), // May 1, 2023
    to: new Date(2023, 4, 31), // May 31, 2023
  })

  // Calculate summary metrics
  const totalRevenue = transactions.filter((t) => t.type === "Sale").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0)

  const netProfit = totalRevenue + totalExpenses // Expenses are negative

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Financial Management</h1>
        <div className="flex items-center gap-2">
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              For period {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.abs(totalExpenses).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              For period {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${netProfit.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              For period {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
                <CardDescription>Sales performance over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#FF8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution of sales across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Recent financial transactions</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer/Vendor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell className={transaction.amount < 0 ? "text-red-500" : "text-green-600"}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === "Paid"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Generate and download financial reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Income Statement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Revenue and expenses summary for the selected period
                    </p>
                    <Button variant="outline" size="sm" className="mt-4 w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Balance Sheet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Assets, liabilities, and equity snapshot</p>
                    <Button variant="outline" size="sm" className="mt-4 w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Tax Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Tax obligations and payments for the fiscal year</p>
                    <Button variant="outline" size="sm" className="mt-4 w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
