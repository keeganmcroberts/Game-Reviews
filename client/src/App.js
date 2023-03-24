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
  const [user, setUser] = useState({})

  console.log("logged in user:",user)

  return (
    <div className="App">
      <Banner user={user}></Banner>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} logo={logo} />} > </Route>
        <Route path='/login' element={<Login user={user} setUser={setUser}/>} > </Route>
        <Route path='/profile' element={<UserProfile user={user}/>} > </Route>
        <Route path='/games' element={<Games gamesDB={gamesDB} setGamesDB={setGamesDB}/>}></Route>
        <Route path ='/platforms' element={<Platforms gamesDB={gamesDB} setGamesDB={setGamesDB}/>} > </Route>
        <Route path='/platform/:id' element={<PlatformGames gamesDB={gamesDB} setGamesDB={setGamesDB}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
