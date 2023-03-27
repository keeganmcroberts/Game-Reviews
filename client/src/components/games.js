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
            <br></br>
            <br></br>
            <br></br>
            <div className="games-banner">
                <h3>Browse By:</h3>
                
                
                <ul class="browse-by">
                <li> <a href="#">Home</a></li>
                <li> <a href="#">Back</a></li>
                <li className="genre-dropdown">
                        <a href="#">Genre</a>
                        <ul class="dropdown">
                            <li> <a href="#">Action</a> </li>
                            <li> <a href="#">Adventure</a> </li>
                            <li> <a href="#">Indie</a> </li>
                            <li> <a href="#">MMO</a> </li>
                            <li> <a href="#">RPG</a> </li>
                            <li> <a href="#">Shooter</a> </li>
                            <li> <a href="#">Puzzle</a> </li>
                        </ul>
                    </li>
                    <li className="genre-dropdown">
                        <a href="#">Genre</a>
                        <ul class="dropdown">
                            <li> <a href="#">Action</a> </li>
                            <li> <a href="#">Adventure</a> </li>
                            <li> <a href="#">Indie</a> </li>
                            <li> <a href="#">MMO</a> </li>
                            <li> <a href="#">RPG</a> </li>
                            <li> <a href="#">Shooter</a> </li>
                            <li> <a href="#">Puzzle</a> </li>
                        </ul>
                    </li>
                    <li className="genre-dropdown">
                        <a href="#">Genre</a>
                        <ul class="dropdown">
                            <li> <a href="#">Action</a> </li>
                            <li> <a href="#">Adventure</a> </li>
                            <li> <a href="#">Indie</a> </li>
                            <li> <a href="#">MMO</a> </li>
                            <li> <a href="#">RPG</a> </li>
                            <li> <a href="#">Shooter</a> </li>
                            <li> <a href="#">Puzzle</a> </li>
                        </ul>
                    </li>
                    
                </ul>
            </div>
            <br></br>
            <br></br>
            <div className="games-grid">
                {gamesDB.map(eachGame=>{
                    return(
                        <div >
                            <h6>{eachGame.name}</h6>
                            <img className="platform-image" src={eachGame.background_image}></img>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Games;