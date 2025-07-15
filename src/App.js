import './App.css';
import Themetoggle from './ThemeChanger/Themetoggle';
import ThemeProvider from './ThemeChanger/ThemeProvider';
import TestThemeChnager_A from './ThemeChanger/TestCompenent/TestThemeChnager_A';
import Login from './Registration-form/Loginpage';

function App() {
  return (
      <ThemeProvider>
      {/* <Themetoggle /> */}
      {/* <TestThemeChnager_A/> */}
      <Login/>
    </ThemeProvider>
  );
}

export default App;
