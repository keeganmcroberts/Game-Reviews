import logo from './logo.svg';
import './App.css';
import { Route, Routes} from "react-router-dom"
import Home from './components/home';
import Login from './components/login';
import Games from './components/games';
import Banner from './components/banner';
import UserProfile from './components/userProfile';

function App() {
  return (
    <div className="App">
      <Banner></Banner>
      <Routes>
        <Route path="/" element={<Home logo={logo} />} > </Route>
        <Route path='/login' element={<Login/>} > </Route>
        <Route path='/profile' element={<UserProfile/>} > </Route>
        <Route path ='/games' element={<Games/>} > </Route>
      </Routes>
    </div>
  );
}

export default App;
