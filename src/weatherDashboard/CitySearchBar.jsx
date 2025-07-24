import React from "react";

function CitySearchBar({
  cities,
  searchTarget,
  setSearchTarget,
  searchInput,
  setSearchInput,
  handleSearch,
  citySuggestions,
  setCitySuggestions,
}) {
  return (
    <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 6 }}>
      <select
        value={searchTarget}
        onChange={e => setSearchTarget(Number(e.target.value))}
        style={{
          fontSize: 15, padding: "3px 8px", maxWidth: 260,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
        }}
      >
        {cities.map((city, idx) => {
          let shortCity = city.split(",")[0].trim();
          if (shortCity.length > 18) shortCity = shortCity.split(" ")[0];
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
            position: "absolute", left: 0, top: 36, width: 320,
            maxWidth: 400, maxHeight: 200, background: "#fff", border: "1px solid #ccc",
            borderRadius: 8, margin: 0, padding: 0, zIndex: 9999,
            boxShadow: "0 8px 16px rgba(0,0,0,0.10)", listStyle: "none", overflowY: "auto"
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
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 370
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
  );
}

export default CitySearchBar;
