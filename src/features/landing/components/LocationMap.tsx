"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet generic marker icon missing
const icon = L.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
// Simple fallback or we can use a CDN for icons if local assets are missing
// For now, let's try to rely on default or just valid setup.
// Actually, Leaflet default icons often break in bundlers.
// Using a custom DivIcon or CDN links is safer for quick setup.
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


interface LocationMapProps {
  position: [number, number];
  zoom?: number;
}

export default function LocationMap({ position, zoom = 13 }: LocationMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-full w-full bg-muted animate-pulse rounded-lg" />;
  }

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} className="h-full w-full rounded-lg z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={defaultIcon}>
        <Popup>
          المركز الهندسي <br /> المحلة الكبرى، الغربية
        </Popup>
      </Marker>
    </MapContainer>
  );
}
