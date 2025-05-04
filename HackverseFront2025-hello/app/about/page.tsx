import type React from "react"
import { VendorSidebar } from "@/components/vendor-sidebar"

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <VendorSidebar />
      <div className="flex-1 p-6 md:p-8">{children}</div>
    </div>
  )
}
