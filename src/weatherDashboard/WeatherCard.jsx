import React from "react";

function WeatherCard({
  city, w, selectedCity, idx, editingIdx, editingValue,
  startEditing, finishEditing, setEditingIdx, setEditingValue,
  onClick
}) {
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
        onClick={onClick}
      >
        <span className="city">{city}</span>
        <span style={{ color: "red", fontSize: "0.9em" }}>No data</span>
 
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
      onClick={onClick}
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
    </div>
  );
}

export default WeatherCard;
