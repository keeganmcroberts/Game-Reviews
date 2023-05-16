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
                    <li className="dropdown">
                      
                       
                    </li>
                    <li className="dropdown">
                       
                       
                    </li>
                    <li className="dropdown">
                       
                    </li>
                    <li className="dropdown">
                        
                     
                    </li>
                   
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