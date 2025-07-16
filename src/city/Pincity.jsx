import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fixes default marker icons for many React setups:
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Default: Nashik coordinates
const DEFAULT_COORDS = [19.9834, 73.89269];

function ChangeMapView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function CityMap() {
  const [city, setCity] = useState("Nashik");
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [error, setError] = useState("");

  const fetchCoords = async () => {
    setError("");
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
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
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>City Map Viewer (React-Leaflet)</h2>
      <div>
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city (e.g. Mumbai)"
          style={{ marginRight: 8, padding: 8, width: 200 }}
        />
        <button onClick={fetchCoords} style={{ padding: 8 }}>Show on Map</button>
      </div>
      {error && <div style={{ color: "red", margin: 8 }}>{error}</div>}

      {/* Show lat/lon always */}
      <div style={{ marginTop: 16, fontSize: 16 }}>
        <b>Latitude:</b> {coords[0].toFixed(5)}{" "}
        <b>Longitude:</b> {coords[1].toFixed(5)}
      </div>

      <div style={{ height: 400, marginTop: 24 }}>
        <MapContainer center={coords} zoom={8} style={{ height: "100%", width: "100%" }}>
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
