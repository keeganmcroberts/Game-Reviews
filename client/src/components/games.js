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
                <ul className="page-navbar">
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Genre</a>
                        <div class="dropdown-content">
                            <a href="#">Action</a> 
                            <a href="#">Adventure</a> 
                            <a href="#">Indie</a> 
                            <a href="#">MMO</a> 
                            <a href="#">RPG</a> 
                            <a href="#">Shooter</a> 
                            <a href="#">Puzzle</a> 
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Platform</a>
                        <div class="dropdown-content">
                            <a href="#">Playstation</a> 
                            <a href="#">Xbox</a> 
                            <a href="#">PC</a> 
                            <a href="#">Nintendo</a> 
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Rating</a>
                        <div class="dropdown-content">
                            <a href="#">High to Low</a> 
                            <a href="#">Low to High</a> 
                            <a href="#">Hot</a> 
                        </div>
                    
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