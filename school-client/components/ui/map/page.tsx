"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"


// Your location
const position: [number, number] = [26.982956809710352, 86.69429960097426]

export default function MapComponent() {
  const mapProps = {
    center: position,
    zoom: 15,
    scrollWheelZoom: false,
    style: { height: "300px", width: "100%" },
  } as any;

  const TileLayerAny = TileLayer as any;
  const MarkerAny = Marker as any;
  const PopupAny = Popup as any;

  return (
    <MapContainer {...mapProps}>
      <TileLayerAny
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerAny position={position}>
        <PopupAny>
          Panchavati Campus <br /> Rautamai, Udayapur
        </PopupAny>
      </MarkerAny>
    </MapContainer>
  )
}