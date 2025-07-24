import React, { useEffect, useState, useRef } from "react";
import CityMap from "./CityMap";
import "./weather.css";

const API_KEY = "3343e4f7307e4e6fbc8172858251507";
const DEFAULT_CITIES = ["Delhi", "London", "Sydney", "Tokyo"];

function WeatherDashboard() {
  // City names (modifiable)
  const [cities, setCities] = useState(DEFAULT_CITIES);

  // Weather data for all
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  // Which card is selected for the map
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITIES[0]);

  // --- For top search bar ---
  const [searchInput, setSearchInput] = useState("");
  const [searchTarget, setSearchTarget] = useState(0);

  // For in-card editing
  const [editingIdx, setEditingIdx] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  // Suggestions for top search bar
  const [citySuggestions, setCitySuggestions] = useState([]);
  const citySuggestTimeout = useRef();

  // Suggestions effect for Set City input
  useEffect(() => {
    if (searchInput.length < 2) {
      setCitySuggestions([]);
      return;
    }
    if (citySuggestTimeout.current) clearTimeout(citySuggestTimeout.current);
    citySuggestTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}&addressdetails=1&limit=5`
        );
        const data = await res.json();
        setCitySuggestions(data);
      } catch {
        setCitySuggestions([]);
      }
    }, 350);
    return () => clearTimeout(citySuggestTimeout.current);
  }, [searchInput]);

  // Fetch weather for all cities
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const allData = {};
      for (const city of cities) {
        try {
          const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
          );
          const data = await res.json();
          allData[city] = data;
        } catch (e) {
          allData[city] = { error: "Error fetching weather" };
        }
      }
      setWeatherData(allData);
      setLoading(false);
    }
    fetchAll();
  }, [cities]);

  // Handle top search bar change for a specific card
  const handleSearch = () => {
    if (searchInput.trim()) {
      const updated = [...cities];
      updated[searchTarget] = searchInput.trim();
      setCities(updated);
      // If this card was selected, update selection too
      if (cities[searchTarget] === selectedCity) setSelectedCity(searchInput.trim());
      setSearchInput("");
      setCitySuggestions([]); // clear suggestions after setting
    }
  };

  // Per-card change city
  const startEditing = idx => {
    setEditingIdx(idx);
    setEditingValue(cities[idx]);
  };
  const finishEditing = idx => {
    if (editingValue.trim()) {
      const updated = [...cities];
      updated[idx] = editingValue.trim();
      setCities(updated);
      // update selection if changed
      if (cities[idx] === selectedCity) setSelectedCity(editingValue.trim());
    }
    setEditingIdx(null);
    setEditingValue("");
  };

  return (
    <div className="container">
      <div className="big-box">
        <div style={{ fontSize: "1.2em", marginBottom: 10, fontWeight: 500 }}>
          Weather Dashboard (Live Data)
        </div>

        {/* Top search bar for any card */}
        <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 6 }}>
       <select
  value={searchTarget}
  onChange={e => setSearchTarget(Number(e.target.value))}
  style={{ fontSize: 15, padding: "3px 8px", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
>
  {cities.map((city, idx) => {
    // Get the first word or up to the first comma
    let shortCity = city.split(",")[0].trim();
    // If the string is still very long, cut at first space
    if (shortCity.length > 18) {
      shortCity = shortCity.split(" ")[0];
    }
    return (
      <option value={idx} key={idx}>
        Card {idx + 1} ({shortCity})
      </option>
    );
  })}
</select>
          <div style={{ position: "relative", width: 220 }}>
            <input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Set city (e.g. Paris)"
              style={{ padding: 8, fontSize: 15, minWidth: 120, width: "100%" }}
              autoComplete="off"
            />
            {citySuggestions.length > 0 && (
<ul style={{
  position: "absolute",
  left: 0,
  top: 36,
  width: 320,               // 👈 wider than default
  maxWidth: 400,
  maxHeight: 200,
  background: "#fff",
  border: "1px solid #ccc",
  borderRadius: 8,
  margin: 0,
  padding: 0,
  zIndex: 9999,
  boxShadow: "0 8px 16px rgba(0,0,0,0.10)",
  listStyle: "none",
  overflowY: "auto"
}}>
                {citySuggestions.map((item, idx) => (
                  <li key={idx}
                      onClick={() => {
                        setSearchInput(item.display_name);
                        setCitySuggestions([]);
                      }}
                      style={{
                        padding: "8px 12px",
                        borderBottom: "1px solid #eee",
                        cursor: "pointer",
                        height: '40px',
                      }}>
                    {item.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={handleSearch}
            style={{ padding: "7px 14px", fontSize: 15 }}
          >
            Set City
          </button>
        </div>

        {/* Weather cards */}
        {loading ? (
          <div>Loading weather...</div>
        ) : (
          <div className="weather-cards">
            {cities.map((city, idx) => {
              const w = weatherData[city];
              if (editingIdx === idx) {
                // Editing mode for card
                return (
                  <div className="weather-card" key={city} style={{ minHeight: 200 }}>
                    <input
                      value={editingValue}
                      onChange={e => setEditingValue(e.target.value)}
                      style={{ width: "90%" }}
                      placeholder="Enter city"
                      autoFocus
                    />
                    <button
                      onClick={() => finishEditing(idx)}
                      style={{ marginTop: 6, padding: "4px 10px", fontSize: 13 }}
                    >
                      Set
                    </button>
                    <button
                      onClick={() => { setEditingIdx(null); setEditingValue(""); }}
                      style={{
                        marginLeft: 4,
                        padding: "4px 10px",
                        fontSize: 13,
                        background: "#eee",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                );
              }

              if (!w || w.error || w.error?.message) {
                return (
                  <div
                    className="weather-card"
                    key={city}
                    style={{
                      border: selectedCity === city ? "2px solid #3463e6" : "",
                      cursor: "pointer"
                    }}
                    onClick={() => setSelectedCity(city)}
                  >
                    <span className="city">{city}</span>
                    <span style={{ color: "red", fontSize: "0.9em" }}>No data</span>
                    <button
                      onClick={e => { e.stopPropagation(); startEditing(idx); }}
                      style={{
                        position: "absolute", right: 8, bottom: 8, fontSize: 12, padding: "4px 7px"
                      }}
                    >
                      Change City
                    </button>
                  </div>
                );
              }
              return (
                <div
                  className="weather-card"
  key={city}
  style={{
    border: selectedCity === city ? "2px solid #3463e6" : "",
    cursor: "pointer"
  }}
  onClick={() => {
    setSelectedCity(city);   // Selects the card
    setSearchTarget(idx);    // Selects the same card number in the dropdown!
  }}
>
                  <span className="city">{w.location.name}</span>
                  <span className="temp">{w.current.temp_c}°C</span>
                  
                  <div className="weather-row">
                    <img
                      className="weather-icon"
                      src={w.current.condition.icon}
                      alt={w.current.condition.text}
                    />
                    <span>{w.current.condition.text}</span>
                  </div>
                  <div className="weather-row">Humidity: {w.current.humidity}%</div>
                  <div className="weather-row">Wind: {w.current.wind_kph} km/h</div>
                  <button
                    onClick={e => { e.stopPropagation(); startEditing(idx); }}
                    style={{
                      position: "absolute", right: 8, bottom: 8, fontSize: 12, padding: "4px 7px"
                    }}
                  >
                    Change City
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Map Section for selected city */}
        <div className="map-section" style={{ marginTop: 32 }}>
          <CityMap city={selectedCity} />
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard;
