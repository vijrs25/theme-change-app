import './App.css';
import Themetoggle from './ThemeChanger/Themetoggle';
import ThemeProvider from './ThemeChanger/ThemeProvider';
import TestThemeChnager_A from './ThemeChanger/TestCompenent/TestThemeChnager_A';

function App() {
  return (
      <ThemeProvider>
      <Themetoggle />
      {/* <TestThemeChnager_A/> */}
    </ThemeProvider>
  );
}

export default App;
