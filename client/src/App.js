import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import { Route, Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home logo={logo} />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
