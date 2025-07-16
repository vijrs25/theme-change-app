import './App.css';
import Themetoggle from './ThemeChanger/Themetoggle';
import ThemeProvider from './ThemeChanger/ThemeProvider';
import TestThemeChnager_A from './ThemeChanger/TestCompenent/TestThemeChnager_A';
import Login from './Registration-form/Loginpage';
import WeatherBy from './Weather-app/Weatherflow'
import PinCity from './city/Pincity'

function App() {
  return (
      <ThemeProvider>
      {/* <Themetoggle /> */}
      {/* <TestThemeChnager_A/> */}
      {/* <Login/> */}
      {/* <WeatherBy/> */}
      <PinCity/>
    </ThemeProvider>
  );
}

export default App;
