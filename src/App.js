import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './weatherDashboard/NavBar'; // Import the navbar!
import Themetoggle from './ThemeChanger/Themetoggle';
import ThemeProvider from './ThemeChanger/ThemeProvider';
import TestThemeChnager_A from './ThemeChanger/TestCompenent/TestThemeChnager_A';
import Login from './Registration-form/Loginpage';
import WeatherBy from './Weather-app/Weatherflow'
import PinCity from './city/Pincity'
import Fastpincity from './city/FastPinity'
import WeatherDashboard from './weatherDashboard/WeatherDashboard2';
import Portfolio from './portfolio/portfolio';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar /> {/* Always visible */}
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/theme" element={<Themetoggle />} />
          <Route path="/test-theme" element={<TestThemeChnager_A />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="/pincity" element={<PinCity />} />
          <Route path="/fastpincity" element={<Fastpincity />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
