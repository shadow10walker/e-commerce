"use client"

import { useEffect, useRef } from "react"

// Mock delivery locations
const deliveryLocations = [
  {
    id: 1,
    name: "Bâtiment A",
    lat: 3.866667,
    lng: 11.516667,
    time: "10:00 - 12:00",
    customer: "Jean Dupont",
    order: "#10001",
  },
  {
    id: 2,
    name: "Bâtiment B",
    lat: 3.868667,
    lng: 11.518667,
    time: "14:00 - 16:00",
    customer: "Marie Leclerc",
    order: "#10002",
  },
  {
    id: 3,
    name: "Bâtiment C",
    lat: 3.864667,
    lng: 11.514667,
    time: "16:00 - 18:00",
    customer: "Pierre Martin",
    order: "#10003",
  },
]

export default function DeliveryMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real application, you would use a library like Leaflet or Google Maps
    if (mapRef.current) {
      const mapContainer = mapRef.current
      mapContainer.innerHTML = ""

      // Create a simple visual representation of the map
      const mapElement = document.createElement("div")
      mapElement.className = "relative w-full h-full bg-gray-100 rounded-lg overflow-hidden"
      mapElement.style.backgroundImage = "url('/placeholder.svg?height=400&width=800')"
      mapElement.style.backgroundSize = "cover"
      mapElement.style.backgroundPosition = "center"

      // Add markers for each delivery location
      deliveryLocations.forEach((location, index) => {
        const marker = document.createElement("div")
        marker.className = "absolute flex flex-col items-center"
        marker.style.left = `${20 + index * 30}%`
        marker.style.top = `${30 + index * 15}%`

        const pin = document.createElement("div")
        pin.className =
          "w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold shadow-lg"
        pin.textContent = `${index + 1}`

        const tooltip = document.createElement("div")
        tooltip.className =
          "absolute bottom-full mb-2 bg-white p-2 rounded shadow-lg text-xs w-48 hidden group-hover:block"
        tooltip.innerHTML = `
          <p class="font-bold">${location.name}</p>
          <p>${location.customer}</p>
          <p>Commande: ${location.order}</p>
          <p>Heure: ${location.time}</p>
        `

        const markerGroup = document.createElement("div")
        markerGroup.className = "group cursor-pointer"
        markerGroup.appendChild(pin)
        markerGroup.appendChild(tooltip)

        marker.appendChild(markerGroup)
        mapElement.appendChild(marker)

        // Show tooltip on hover
        markerGroup.addEventListener("mouseenter", () => {
          tooltip.classList.remove("hidden")
        })
        markerGroup.addEventListener("mouseleave", () => {
          tooltip.classList.add("hidden")
        })
      })

      mapContainer.appendChild(mapElement)

      // Add a legend
      const legend = document.createElement("div")
      legend.className = "absolute bottom-4 left-4 bg-white p-3 rounded shadow-lg text-sm"
      legend.innerHTML = `
        <p class="font-bold mb-2">Légende</p>
        <div class="flex items-center mb-1">
          <div class="w-4 h-4 rounded-full bg-teal-500 mr-2"></div>
          <span>Point de livraison</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
          <span>Votre position</span>
        </div>
      `
      mapElement.appendChild(legend)

      // Add current location marker
      const currentLocation = document.createElement("div")
      currentLocation.className = "absolute"
      currentLocation.style.left = "50%"
      currentLocation.style.top = "50%"
      currentLocation.style.transform = "translate(-50%, -50%)"

      const currentPin = document.createElement("div")
      currentPin.className =
        "w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-lg"
      currentPin.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`

      currentLocation.appendChild(currentPin)
      mapElement.appendChild(currentLocation)
    }
  }, [])

  return <div ref={mapRef} className="w-full h-[400px] rounded-lg overflow-hidden"></div>
}
