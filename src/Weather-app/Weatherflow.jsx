import React, { useState } from "react";

const API_KEY = "3343e4f7307e4e6fbc8172858251507";

function WeatherByCity() {
  const [city, setCity] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setError("");
    setLoading(true);
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      if (!res.ok) throw new Error("No weather found for this city.");
      const data = await res.json();
      console.log(data);
      setWeather(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 400, margin: "40px auto" }}>
      <h2>Current Weather</h2>
      <input
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Enter city (e.g. Mumbai)"
        style={{ marginRight: 8 }}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {weather && (
        <div style={{ marginTop: 20 }}>
          <div>
            {weather.location.name}, {weather.location.region}, {weather.location.country}
          </div>
          <p>
            <img src={weather.current.condition.icon} alt="weather" />
            <strong>{weather.current.temp_c}°C</strong> - {weather.current.condition.text}
          </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><strong>Epoch Time:</strong> {weather.current.last_updated_epoch}</li>
            <li><strong>Last Updated:</strong> {weather.current.last_updated}</li>
            <li><strong>Temp (°C):</strong> {weather.current.temp_c}</li>
            <li><strong>Temp (°F):</strong> {weather.current.temp_f}</li>
            <li><strong>Feels Like (°C):</strong> {weather.current.feelslike_c}</li>
            <li><strong>Feels Like (°F):</strong> {weather.current.feelslike_f}</li>
            <li><strong>Is Day:</strong> {weather.current.is_day === 1 ? "Yes" : "No"}</li>
            <li><strong>Weather Description:</strong> {weather.current.condition.text}</li>
            <li><strong>Weather Icon:</strong> <img src={weather.current.condition.icon} alt="icon" /></li>
            <li><strong>Weather Code:</strong> {weather.current.condition.code}</li>
            <li><strong>Precipitation (mm):</strong> {weather.current.precip_mm}</li>
            <li><strong>Precipitation (in):</strong> {weather.current.precip_in}</li>
            <li><strong>Humidity:</strong> {weather.current.humidity}%</li>
            <li><strong>Cloud Cover:</strong> {weather.current.cloud}%</li>
            <li><strong>Wind (mph):</strong> {weather.current.wind_mph}</li>
            <li><strong>Wind (kph):</strong> {weather.current.wind_kph}</li>
            <li><strong>Wind Degree:</strong> {weather.current.wind_degree}°</li>
            <li><strong>Wind Direction:</strong> {weather.current.wind_dir}</li>
            <li><strong>Visibility (km):</strong> {weather.current.vis_km}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default WeatherByCity;
