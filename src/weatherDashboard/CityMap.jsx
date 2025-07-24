import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const DEFAULT_COORDS = [19.9834, 73.89269];

function ChangeMapView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

function CityMap({ city }) {
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;
    setError("");
    async function fetchCoords(cityName) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`
        );
        const data = await res.json();
        if (data && data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          setError("City not found on map.");
        }
      } catch {
        setError("Error fetching city location.");
      }
    }
    fetchCoords(city);
  }, [city]);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", fontFamily: "sans-serif" }}>
      <div style={{ marginTop: '1rem', fontSize: 16 }}>
        <b>Latitude:</b> {coords[0].toFixed(5)}{" "}
        <b>Longitude:</b> {coords[1].toFixed(5)}
      </div>
      {error && <div style={{ color: "red", margin: 8 }}>{error}</div>}
      <div style={{ height: 300, marginTop: 24 }}>
        <MapContainer
          center={coords}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
          key={coords.join(',')} // <---- This is the fix!
        >
          <ChangeMapView center={coords} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <Marker position={coords}>
            <Popup>
              <b>{city}</b>
              <br />
              Lat: {coords[0].toFixed(5)}, Lon: {coords[1].toFixed(5)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default CityMap;
