import { useState, useEffect } from "react";

function GameDetailPage(){

    const [gameState, setGameState] = useState({})



    useEffect(()=>{

        fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
        .then(r=>r.json())
        .then(data=>console.log(data.results))
        
    },[])


    return(
        <div>
            <br></br>
            <br></br>
            <br></br>  
            <br></br>
            <br></br>
            <br></br>  
            Game Detail Page
        </div>
    )
}

export default GameDetailPage;