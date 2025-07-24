import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import CityMap from "./CityMap";
import CitySearchBar from "./CitySearchBar";
import WeatherCardsGrid from "./WeatherCardsGrid";
import "./weather.css";

const API_KEY = "3343e4f7307e4e6fbc8172858251507";
const DEFAULT_CITIES = ["Delhi", "London", "Sydney"];

function WeatherDashboard() {
  const [cities, setCities] = useState(DEFAULT_CITIES);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITIES[0]);
  const [searchInput, setSearchInput] = useState("");
  const [searchTarget, setSearchTarget] = useState(0);

  const [editingIdx, setEditingIdx] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const citySuggestTimeout = useRef();

  // --- useCallback for event handlers ---

  // Set city for card
  const handleSearch = useCallback(() => {
    if (searchInput.trim()) {
      const updated = [...cities];
      updated[searchTarget] = searchInput.trim();
      setCities(updated);
      if (cities[searchTarget] === selectedCity) setSelectedCity(searchInput.trim());
      setSearchInput("");
      setCitySuggestions([]);
    }
  }, [searchInput, searchTarget, cities, selectedCity]);

  // Edit handlers
  const startEditing = useCallback(idx => {
    setEditingIdx(idx);
    setEditingValue(cities[idx]);
  }, [cities]);

  const finishEditing = useCallback(idx => {
    if (editingValue.trim()) {
      const updated = [...cities];
      updated[idx] = editingValue.trim();
      setCities(updated);
      if (cities[idx] === selectedCity) setSelectedCity(editingValue.trim());
    }
    setEditingIdx(null);
    setEditingValue("");
  }, [editingValue, cities, selectedCity]);

  // --- useMemo for select options ---
  const dropdownOptions = useMemo(() => (
    cities.map((city, idx) => {
      let shortCity = city.split(",")[0].trim();
      if (shortCity.length > 18) shortCity = shortCity.split(" ")[0];
      return { idx, label: `Card ${idx + 1} (${shortCity})` };
    })
  ), [cities]);

  // --- City suggestions effect ---
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

  // --- Weather fetch effect ---
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

  return (
    <div className="container">
      <div className="big-box">
        <div style={{ fontSize: "1.2em", marginBottom: 10, fontWeight: 500 }}>
          Weather Dashboard (Live Data)
        </div>

        <CitySearchBar
          cities={cities}
          searchTarget={searchTarget}
          setSearchTarget={setSearchTarget}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
          citySuggestions={citySuggestions}
          setCitySuggestions={setCitySuggestions}
          dropdownOptions={dropdownOptions} 
        />

        {loading ? (
          <div>Loading weather...</div>
        ) : (
          <WeatherCardsGrid
            cities={cities}
            weatherData={weatherData}
            selectedCity={selectedCity}
            editingIdx={editingIdx}
            editingValue={editingValue}
            startEditing={startEditing}
            finishEditing={finishEditing}
            setEditingIdx={setEditingIdx}
            setEditingValue={setEditingValue}
            setSelectedCity={setSelectedCity}
            setSearchTarget={setSearchTarget}
          />
        )}

        <div className="map-section" style={{ marginTop: 32 }}>
          <CityMap city={selectedCity} />
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard;
