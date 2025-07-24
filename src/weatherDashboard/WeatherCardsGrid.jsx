import React from "react";
import WeatherCard from "./WeatherCard";

function WeatherCardsGrid(props) {
  const {
    cities, weatherData, selectedCity, editingIdx, editingValue,
    startEditing, finishEditing, setEditingIdx, setEditingValue,
    setSelectedCity, setSearchTarget
  } = props;

  return (
    <div className="weather-cards">
      {cities.map((city, idx) => (
        <WeatherCard
          key={city}
          city={city}
          w={weatherData[city]}
          selectedCity={selectedCity}
          idx={idx}
          editingIdx={editingIdx}
          editingValue={editingValue}
          startEditing={startEditing}
          finishEditing={finishEditing}
          setEditingIdx={setEditingIdx}
          setEditingValue={setEditingValue}
          onClick={() => {
            setSelectedCity(city);
            setSearchTarget(idx);
          }}
        />
      ))}
    </div>
  );
}

export default WeatherCardsGrid;
