import { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';

function GameDetailPage(){

    const [gameState, setGameState] = useState({})

    const params = useParams();
    let {id} = params

    useEffect(()=>{

        fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
        .then(r=>r.json())
        .then(data=>{
           data.results.map(eachGame=>{
               if (eachGame.slug === id){
                   setGameState( eachGame)
               }
           })
        })
        
    },[])

    console.log("individual game:", gameState)



    return(
        <div>
            <br></br>
            <br></br>
            <br></br>  
            <br></br>
            <br></br>
            <br></br>  
           
            <h2>{gameState.name}</h2>
            <img className="detailPage-image" src={gameState.background_image}></img>
        </div>
    )
}

export default GameDetailPage;