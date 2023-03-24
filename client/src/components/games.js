import { useEffect, useState } from "react";


function Games(){

    const [gamesDB, setGamesDB] = useState([])

    useEffect(()=>{

        fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
        .then(r=>r.json())
        .then(data=>setGamesDB(data.results))
        
    },[])

    console.log("GAMES LIST:", gamesDB)




if (gamesDB)
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <h1>Games:</h1>
                
            <div className="platform-grid">
                {gamesDB.map(eachGame=>{
                    return(
                        <div >
                            <h3>{eachGame.name}</h3>
                            <img className="platform-image" src={eachGame.background_image}></img>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Games;