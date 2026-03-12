"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"


// Your location
const position: [number, number] = [26.982956809710352, 86.69429960097426]

export default function MapComponent() {
  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          Panchavati Campus <br /> Rautamai, Udayapur
        </Popup>
      </Marker>
    </MapContainer>
  )
}