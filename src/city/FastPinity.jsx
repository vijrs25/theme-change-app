import React, { useState, useEffect, useRef } from "react";
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
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("Nashik");
  const debounceTimeout = useRef();

  // Debounced suggestions fetch
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch {
        setSuggestions([]);
      }
    }, 350);
    return () => clearTimeout(debounceTimeout.current);
  }, [query]);

  const handleInputChange = (value) => {
    setCity(value);
    setQuery(value);
    setError("");
  };

  const handleSuggestionClick = (item) => {
    setCity(item.display_name);
    setCoords([parseFloat(item.lat), parseFloat(item.lon)]);
    setSuggestions([]);
    setError("");
  };

  // Manual search fallback (for button)
  const fetchCoords = async () => {
    setError("");
    setSuggestions([]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        console.log(data,data[0],data[1])
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
      <div style={{ position: "relative" }}>
        <input
          value={city}
          onChange={e => handleInputChange(e.target.value)}
          placeholder="Enter city (e.g. Mumbai)"
          style={{ marginRight: 8, padding: 8, width: 200 }}
          autoComplete="on"  
        />
        <button onClick={fetchCoords} style={{ padding: 8 }}>Show on Map</button>
        {suggestions.length > 0 && (
          <ul style={{
            position: "absolute", left: 0, top: 38, width: 200, maxHeight: 160,
            background: "#fff", border: "1px solid #ccc", margin: 0, padding: 0,
            zIndex: 99, listStyle: "none", overflowY: "auto"
          }}>
            {suggestions.map((item, idx) => (
              <li key={idx}
                onClick={() => handleSuggestionClick(item)}
                style={{
                  padding: "8px 12px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  height:'40px',
                }}
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <div style={{ color: "red", margin: 8 }}>{error}</div>}

      <div style={{ marginTop: '3rem', fontSize: 16 }}>
        <b>Latitude:</b> {coords[0].toFixed(5)}{" "}
        <b>Longitude:</b> {coords[1].toFixed(5)}
      </div>

      <div style={{ height: 400, marginTop: 24 }}>
        <MapContainer center={coords} zoom={9} style={{ height: "100%", width: "100%" }}>
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
