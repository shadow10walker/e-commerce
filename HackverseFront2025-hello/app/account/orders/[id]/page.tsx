import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, FileText } from "lucide-react"

// Mock data for orders
const orders = [
  {
    id: "ORD-1234",
    date: "2023-05-15",
    status: "Delivered",
    total: 129.99,
    items: 3,
  },
  {
    id: "ORD-1235",
    date: "2023-05-10",
    status: "Processing",
    total: 79.5,
    items: 2,
  },
  {
    id: "ORD-1236",
    date: "2023-05-05",
    status: "Delivered",
    total: 249.99,
    items: 1,
  },
  {
    id: "ORD-1237",
    date: "2023-04-28",
    status: "Cancelled",
    total: 59.99,
    items: 1,
  },
  {
    id: "ORD-1238",
    date: "2023-04-20",
    status: "Delivered",
    total: 149.95,
    items: 4,
  },
]

// Function to get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Processing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and manage your past orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/account/orders/${order.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/checkout/invoice/${order.id}`}>
                          <FileText className="h-4 w-4 mr-1" />
                          Invoice
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
