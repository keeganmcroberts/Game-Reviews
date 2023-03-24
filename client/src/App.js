import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Route, Routes} from "react-router-dom"
import Home from './components/home';
import Login from './components/login';
import Games from './components/games';
import Banner from './components/banner';
import UserProfile from './components/userProfile';
import Platforms from './components/platforms';
import PlatformGames from "./components/platformGames";

function App() {

  const [gamesDB, setGamesDB] = useState({})

  return (
    <div className="App">
      <Banner></Banner>
      <Routes>
        <Route path="/" element={<Home logo={logo} />} > </Route>
        <Route path='/login' element={<Login/>} > </Route>
        <Route path='/profile' element={<UserProfile/>} > </Route>
        <Route path='/games' element={<Games gamesDB={gamesDB} setGamesDB={setGamesDB}/>}></Route>
        <Route path ='/platforms' element={<Platforms gamesDB={gamesDB} setGamesDB={setGamesDB}/>} > </Route>
        <Route path='/platform/:id' element={<PlatformGames gamesDB={gamesDB} setGamesDB={setGamesDB}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
