import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from './ThemeContext';

function Themetoggle() {
  const { dark, setDark } = useContext(ThemeContext);
  const  [textvalue, setTextvalue] = useState("Click Experiment");
  const  [effectTextValue, seteffectTextValue] = useState("Click Experiment with Use Effect");

  const themeStyles = {
    backgroundColor: dark ? '#23272f' : '#f5f5f5',
    color: dark ? '#fff' : '#222',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s'
  };

  useEffect(() =>{
    if(dark){seteffectTextValue("effect applied : dark")}
    else{seteffectTextValue("effect applied : Light")}
  },[dark])

  return (
    <div style={themeStyles}>
      <h1>{dark ? 'Dark' : 'Light'} Theme</h1>

      <button
        onClick={() => setDark(d => !d)}
        style={{
          padding: '10px 30px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          background: dark ? '#633' : '#eee',
          color: dark ? '#eee' : '#333',
          transition: 'all 0.3s'
        }}
      >
        Switch to {dark ? 'Light' : 'Dark'} Mode
      </button>
      <button 
        style={{
          padding: '10px 30px',
          margin:'10px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          background: dark ? '#633' : '#eee',
          color: dark ? '#eee' : '#333',
          transition: 'all 0.3s'
        }}
        onClick={() => dark ? setTextvalue("Before Click"):setTextvalue("after click")}
      >
        This is to channe the dark color font  {textvalue}
      </button>
      <h1> Use State - {textvalue}</h1>
      <h1> Use Effct - {effectTextValue}</h1>
    </div>
  );
}

export default Themetoggle;
