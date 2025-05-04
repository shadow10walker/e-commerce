import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search } from "lucide-react"
import { InventoryItem } from "@/components/inventory-item"

// Mock data for inventory items
const inventoryItems = [
  {
    id: "1",
    name: "Advanced Mathematics Textbook",
    image: "/placeholder.svg?height=400&width=600",
    price: 59.99,
    stock: 25,
    sku: "MATH-101",
    category: "Textbooks",
  },
  {
    id: "2",
    name: "Chemistry Lab Kit",
    image: "/placeholder.svg?height=400&width=600",
    price: 129.99,
    stock: 8,
    sku: "CHEM-202",
    category: "Lab Equipment",
  },
  {
    id: "3",
    name: "Laptop Stand",
    image: "/placeholder.svg?height=400&width=600",
    price: 24.99,
    stock: 0,
    sku: "ACCS-303",
    category: "Accessories",
  },
  {
    id: "4",
    name: "Scientific Calculator",
    image: "/placeholder.svg?height=400&width=600",
    price: 19.99,
    stock: 42,
    sku: "CALC-404",
    category: "Electronics",
  },
  {
    id: "5",
    name: "History of Art Textbook",
    image: "/placeholder.svg?height=400&width=600",
    price: 45.99,
    stock: 3,
    sku: "ART-505",
    category: "Textbooks",
  },
  {
    id: "6",
    name: "Wireless Headphones",
    image: "/placeholder.svg?height=400&width=600",
    price: 89.99,
    stock: 15,
    sku: "ELEC-606",
    category: "Electronics",
  },
]

// Fonction pour obtenir la couleur du badge en fonction du statut
const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "En stock":
      return "default"
    case "Stock faible":
      return "outline"
    case "Rupture de stock":
      return "destructive"
    default:
      return "secondary"
  }
}

export default function VendorInventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search inventory..." className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="textbooks">Textbooks</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="lab">Lab Equipment</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventoryItems.map((item) => (
          <InventoryItem
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
            stock={item.stock}
            sku={item.sku}
            category={item.category}
          />
        ))}
      </div>
    </div>
  )
}
