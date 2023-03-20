import { useEffect, useState } from "react";

function Games(){


    const [gameDB, setGameDB] = useState({})
    const [ps5Games, setPs5Games] = useState([])


useEffect(()=>{

    fetch('https://api.rawg.io/api/platforms?key=9937c17ee7f344e0a27e3d66c7b454e3')
    .then(r=>r.json())
    .then(data=>setGameDB(data))
    
},[])

 console.log("DB",gameDB)

 console.log("RESULTS", gameDB.results)



     if (gameDB.results){
         gameDB.results.map(platform=>{
             if (platform.name === 'PlayStation 5'){
                 platform.games.map(eachGame=>{
                     ps5Games.push(eachGame)
                    })
                }
            })
        }

        
 console.log("ps5 games:",ps5Games)


    return(
        <h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            Games</h1>
    )
}

export default Games;