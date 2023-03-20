import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

function Games({gamesDB, setGamesDB}){



    const [platformDB, setPlatformDB] = useState({})
    const [ps5Games, setPs5Games] = useState([])


useEffect(()=>{

    fetch('https://api.rawg.io/api/platforms?key=9937c17ee7f344e0a27e3d66c7b454e3')
    .then(r=>r.json())
    .then(data=>setPlatformDB(data))
    
},[])

useEffect(()=>{

    fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
    .then(r=>r.json())
    .then(data=>setGamesDB(data))
    
},[])

console.log("games DB", gamesDB)
console.log("PLATFORMS", platformDB.results)



    //  if (platformDB.results){
    //      platformDB.results.map(platform=>{
    //          if (platform.name === 'PlayStation 5'){
    //              platform.games.map(eachGame=>{
    //                  ps5Games.push(eachGame)
    //                 })
    //             }
    //         })
    //     }

        
 console.log("ps5 games:",ps5Games)

 let navigate = useNavigate()
 function viewGames(id){
    navigate(`/platform/${id}`)
 }


    return(
        <div>
        <h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            Platforms:</h1>
            <br></br>
            <br></br>
            <br></br>
            {platformDB.results ? 
            <div className="platform-grid">
                {platformDB.results.map(eachPlatform=>{
                    return(
                        <div>
                        <h3>{eachPlatform.name}</h3>
                        <img onClick={()=>viewGames(eachPlatform.slug)} className="platform-image" src={eachPlatform.image_background}></img>
                        </div>
                        )
                })}
            </div>
            : null}
        </div>
            
    )
}

export default Games;