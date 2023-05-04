import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

function Games({gamesDB, setGamesDB}){



    const [platformDB, setPlatformDB] = useState([])
    const [ps5Games, setPs5Games] = useState([])
    const [searchBarDB, setSearchBarDB] = useState([])


useEffect(()=>{

    fetch('https://api.rawg.io/api/platforms?key=9937c17ee7f344e0a27e3d66c7b454e3')
    .then(r=>r.json())
    .then(data=> { setPlatformDB(data.results)
     setSearchBarDB(data.results)   
    
    })
    
},[])

useEffect(()=>{

    fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
    .then(r=>r.json())
    .then(data=>setGamesDB(data))
    
},[])

// console.log("games DB", gamesDB)
// console.log("PLATFORMS", platformDB)
// console.log("search bar platforms", searchBarDB)


    function handleingtheSearch(thethingsItypeintotheSearchBar){
        let resultofSearch= searchBarDB.filter((game)=> {
          if(game.name.toLowerCase().includes(thethingsItypeintotheSearchBar.toLowerCase())){
            return game
          }
        })
        setPlatformDB(resultofSearch)
      }


 let navigate = useNavigate()
 function viewGames(id){
    navigate(`/platform/${id}`)
 }


    return(
        <div>
        <h1 className="page-title">
            <br></br>
            <br></br>
            <br></br>
            Platforms
        </h1>
            <br></br>
            <br></br>
            <div className="games-banner">
                <ul className="page-navbar">
                    {/* <li className="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Platform &#9660;</a>
                        <div className="dropdown-content">
                            <a onClick={()=>setPlatformState("")} href="#">All</a> 
                            <a onClick={()=>setPlatformState("PlayStation")} href="#">PlayStation</a> 
                            <a onClick={()=>setPlatformState("Xbox")} href="#">Xbox</a> 
                            <a onClick={()=>setPlatformState("PC")} href="#">PC</a> 
                            <a onClick={()=>setPlatformState("Nintendo")} href="#">Nintendo</a> 
                        </div>
                    </li>
                    <li className="dropdown">
                        <a href="javascript:void(0)" className="dropbtn">Genre &#9660;</a>
                        <div className="dropdown-content">
                            <a onClick={()=>setGenreState("")} href="#">All</a> 
                            <a onClick={()=>setGenreState("Action")} href="#">Action</a> 
                            <a onClick={()=>setGenreState("Adventure")} href="#">Adventure</a> 
                            <a onClick={()=>setGenreState("Indie")} href="#">Indie</a> 
                            <a onClick={()=>setGenreState("Massively Multiplayer")} href="#">MMO</a> 
                            <a onClick={()=>setGenreState("RPG")} href="#">RPG</a> 
                            <a onClick={()=>setGenreState("Shooter")} href="#">Shooter</a> 
                            <a onClick={()=>setGenreState("Puzzle")} href="#">Puzzle</a> 
                        </div>
                    </li>
                    <li className="dropdown">
                        <a href="javascript:void(0)" className="dropbtn">Rating &#9660;</a>
                        <div className="dropdown-content">
                            <a href="#">High to Low</a> 
                            <a href="#">Low to High</a> 
                            <a href="#">Popular</a> 
                        </div>
                    </li>
                    <li className="dropdown">
                        <a href="javascript:void(0)" className="dropbtn">Year &#9660;</a>
                        <div className="dropdown-content">
                            <a onClick={()=>setYearState("2023")} href="#">2023</a> 
                            <a onClick={()=>setYearState("2022")} href="#">2022</a> 
                            <a onClick={()=>setYearState("2021")} href="#">2021</a> 
                            <a onClick={()=>setYearState("2020")} href="#">2020</a> 
                            <a onClick={()=>setYearState("2019")} href="#">2019</a> 
                            <a onClick={()=>setYearState("2018")} href="#">2018</a> 
                            <a onClick={()=>setYearState("2017")} href="#">2017</a> 
                            <a onClick={()=>setYearState("2016")} href="#">2016</a> 
                            <a onClick={()=>setYearState("2015")} href="#">2015</a> 
                            <a onClick={()=>setYearState("2014")} href="#">2014</a> 
                            <a onClick={()=>setYearState("2013")} href="#">2013</a> 
                            <a onClick={()=>setYearState("2012")} href="#">2012</a> 
                            <a onClick={()=>setYearState("2011")} href="#">2011</a> 
                            <a onClick={()=>setYearState("2010")} href="#">2010</a> 
                        </div>
                    </li> */}
                   
            </ul>
                    <div className="search-right"><input type="text" className="search" placeholder="Search Platforms..."
                    onChange={(synthEvent)=> handleingtheSearch(synthEvent.target.value)}/></div>
    
            </div>
            {platformDB ? 
            <div className="platform-grid">
                {platformDB.map(eachPlatform=>{
                    return(
                        <div>
                        <h3>{eachPlatform.name}</h3>
                        <img  className="platform-image" src={eachPlatform.image_background}></img>
                        <button onClick={()=>viewGames(eachPlatform.slug)}>View Games</button>
                        </div>
                        )
                })}
            </div>
            : null}
        </div>
            
    )
}

export default Games;